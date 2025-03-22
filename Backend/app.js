require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const path = require("path");
const axios = require("axios");
const nodemailer = require("nodemailer");
const { OpenAI } = require("openai");
const session = require("express-session");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require('cors');

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
console.log("OpenAI API Key:", process.env.OPENAI_API_KEY);

const router = express.Router();

// Connection with our database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL");
});

// Session setup
router.use(
    session({
        secret: process.env.SESSION_SECRET, // secret for session encryption
        resave: false, // don't resave session if unmodified
        saveUninitialized: false, // don't create session until it's set
        cookie: { secure: false, httpOnly: true, maxAge: 3600000 }, // 1 hour session duration
    })
);

// Add body-parser middleware
router.use(bodyParser.json());

function authenticateSession(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({ error: "Unauthorized: No session found" });
    }
    next();
}

// Frontend routes
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "Frontend", "index.html"), (err) => {
        if (err) {
            console.error("Error loading index.html:", err);
            res.status(500).json({ error: "Internal Server Error: Unable to load index.html" });
        }
    });
});

router.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "Frontend", "public", "signup.html"));
});

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "Frontend", "public", "login.html"));
});

// Add route for Credit Calculator page
router.get("/credit-calculator", authenticateSession, (req, res) => {
    res.sendFile(path.join(__dirname, "..", "Frontend", "public", "credit-calculator.html"));
});

// Transporter setup for nodemailer

// Function to fetch all stock symbols from Finnhub API - only 27752 work for now
async function fetchAllStockSymbols() {
    const exchanges = [
        "US",    // United States (NASDAQ, NYSE, etc.)
        "LSE",   // London Stock Exchange
        "HKEX",  // Hong Kong Stock Exchange
        "BSE",   // Bombay Stock Exchange
        "SSE",   // Shanghai Stock Exchange
        "TSE",   // Tokyo Stock Exchange
        "KOSDAQ" // KOSDAQ (South Korea)
    ];

    let allSymbols = [];

    for (const exchange of exchanges) {
        try {
            const response = await axios.get(`https://finnhub.io/api/v1/stock/symbol?exchange=${exchange}&token=${FINNHUB_API_KEY}`);
            const symbols = response.data;
            allSymbols = [...allSymbols, ...symbols];
            console.log(`Fetched ${symbols.length} symbols from exchange: ${exchange}`);
        } catch (error) {
            console.error(`Error fetching stock symbols for exchange ${exchange}:`, error.message);
        }
    }

    console.log('Total symbols fetched:', allSymbols.length);
    return allSymbols;
}

async function getStockData(symbol) {
    try {
        const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`);
        const data = response.data;

        if (!data) throw new Error("No data found for symbol");

        return {
            symbol: symbol,
            currentPrice: data.c,
            high: data.h,
            low: data.l,
            open: data.o,
            close: data.pc,
        };
    } catch (err) {
        console.error("Error fetching stock data:", err.message);
        return null;
    }
}

async function getInvestmentAdvice(userProfile) {
    const stockSymbols = await fetchAllStockSymbols(); // Fetch all stock symbols

    const stockDataPromises = stockSymbols.slice(0, 5).map(symbol => getStockData(symbol.symbol)); // Only first 5 symbols

    try {
        const stockData = await Promise.all(stockDataPromises);
        const filteredStockData = stockData.filter(data => data !== null);

        const prompt = `
        Based on the following stock data for the given stocks:

        ${filteredStockData.map(data => `
        Stock: ${data.symbol}
        Current Price: ${data.currentPrice}
        High: ${data.high}
        Low: ${data.low}
        Open: ${data.open}
        Close: ${data.close}`).join("\n")}

        and the user's financial profile:
        Income: ${userProfile.income}
        Expenses: ${userProfile.expenses}
        Goals: ${userProfile.goals.join(", ")}

        Provide a detailed recommendation on which stock(s) would be the best investment for the user.
        Consider factors such as stock performance, risk, and user preferences.
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
        });

        return response.choices[0].message.content;
    } catch (err) {
        console.error("Error getting investment advice:", err.message);
        return "An error occurred while processing the investment advice.";
    }
}

// Frontend routes
router.get("/advice", authenticateSession, (req, res) => {
    res.sendFile(path.join(__dirname, "..", "Frontend", "public", "advice.html"));
});

router.post("/advice", authenticateSession, async (req, res) => {
    const { userProfile } = req.body;

    if (!userProfile) {
        return res.status(400).json({ error: "User profile is required." });
    }

    try {
        const advice = await getInvestmentAdvice(userProfile);
        res.status(200).json({ advice });
    } catch (err) {
        console.error("Error processing request:", err.message);
        res.status(500).json({ error: "Internal server error." });
    }
});

// Signup and Login Routes
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.APP_USER,
        pass: process.env.APP_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    }
});
router.post("/signup", async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ error: "All fields are required." });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO users (user_name, password, email, is_verified) VALUES (?, ?, ?, 0)";
        db.query(sql, [username, hashedPassword, email], async (err, result) => {
            if (err) {
                console.error("Database error:", err); // Log the error for debugging
                return res.status(500).json({ error: "Database error occurred." });
            }
            // Generate verification token
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
            const verificationLink = `http://localhost:3000/verify-email?token=${token}`;
            
            const mailOptions = {
                from: `Legends <${process.env.APP_USER}>`,
                to: email,
                subject: "Verification",
                text: "Your email has been verified.",
                html: `<b>You can visit us here: <a href="${verificationLink}">Verify Email</a></b>`,
            };
            try {
                await transporter.sendMail(mailOptions);
                res.status(200).json({ message: "Signup successful! Verification email sent." });
            } catch (error) {
                console.error("Error sending email:", error); // Log the error for debugging
                res.status(500).json({ error: "Signup successful, but email could not be sent." });
            }
        });
    } catch (err) {
        console.error("Error during signup:", err); // Log the error for debugging
        res.status(500).json({ error: "An error occurred. Please try again." });
    }
});

router.get("/verify-email", async (req, res) => {
    const { token } = req.query;
    if (!token) {
        return res.status(400).json({ error: "Verification token is required." });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const sql = "UPDATE users SET is_verified = 1 WHERE email = ?";
        db.query(sql, [decoded.email], (err, result) => {
            if (err) {
                console.error("Database error:", err); // Log the error for debugging
                return res.status(500).json({ error: "Database error occurred." });
            }
            res.status(200).send("Email verified successfully!");
        });
    } catch (err) {
        console.error("Error verifying email:", err); // Log the error for debugging
        res.status(500).json({ error: "Invalid or expired token." });
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const sql = "SELECT * FROM users WHERE user_name = ?";
        db.query(sql, [username], async (err, results) => {
            if (err || results.length === 0) {
                return res.status(400).json({ error: "Invalid credentials." });
            }

            const user = results[0];
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(400).json({ error: "Invalid credentials." });
            }

            // Create session
            req.session.user = { id: user.id, username: user.user_name };

            res.status(200).json({ message: "Login successful!" });
        });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ error: "An error occurred. Please try again." });
    }
});

// Logout route to destroy session
router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to log out" });
        }
        res.status(200).json({ message: "Logged out successfully" });
    });
});

router.get("/analyze-investment", authenticateSession, async(req,res) =>{
    res.sendFile("..", "Frontend", "public", "investments.html");
})

router.post("/analyze-investment", authenticateSession, async (req, res) => {
    const { symbols } = req.body;

    if (!symbols || !Array.isArray(symbols) || symbols.length === 0) {
        return res.status(400).json({ error: "Please provide valid stock symbols." });
    }

    try {
        const stockDataPromises = symbols.map(symbol => getStockData(symbol.trim().toUpperCase()));
        const stockData = await Promise.all(stockDataPromises);
        const filteredStockData = stockData.filter(data => data !== null);

        const prompt = `
        Based on the following stock data:

        ${filteredStockData.map(data => `
        Stock: ${data.symbol}
        Current Price: ${data.currentPrice}
        High: ${data.high}
        Low: ${data.low}
        Open: ${data.open}
        Close: ${data.close}`).join("\n")}

        Provide a detailed analysis of whether these stocks are good investments for the future, considering trends and financial stability.
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
        });

        res.status(200).json({ advice: response.choices[0].message.content });
    } catch (err) {
        console.error("Error analyzing investments:", err.message);
        res.status(500).json({ error: "Internal server error." });
    }
});

router.get("/api/forex-rates", authenticateSession, async (req, res) => {
  try {
    const response = await axios.get("https://api.exchangerate-api.com/v4/latest/USD");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching forex rates:", error.message);
    res.status(500).json({ error: "Error fetching forex rates." });
  }
});

// Ensure only logged-in users can access the courses page
router.get("/courses", authenticateSession, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Frontend", "public", "courses.html"));
});

module.exports = router;