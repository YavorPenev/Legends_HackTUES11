require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const path = require("path");
const axios = require("axios");
const nodemailer = require("nodemailer");
const { OpenAI } = require("openai");

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_API_KEY;
const BASE_URL = "https://www.alphavantage.co/query";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const router = express.Router();

// MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });


db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL");
});

db.query("SELECT 1", (err, results) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Database connection successful!");
    }
});

// Serve Frontend Pages
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

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.APP_USER,
        pass: process.env.APP_PASS,
    },
    tls: {
        rejectUnauthorized: false, // Ignore self-signed certificate errors
    }
});

router.post("/signup", async (req, res) => {
    console.log("Received request body:", req.body); // Debugging log

    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ error: "All fields are required." });
    }

    console.log("Extracted Email:", email); // Debugging log to check if email is extracted

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO users (user_name, password, email) VALUES (?, ?, ?)";

        db.query(sql, [username, hashedPassword, email], async (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: "Username or email already exists." });
                }
                console.error("Database error:", err);
                return res.status(500).json({ error: "Database error occurred." });
            }

            console.log("User registered with email:", email); // Debugging log

            // Email configuration
            const mailOptions = {
                from: `"Legends" <${process.env.APP_USER}>`,
                to: email,
                subject: "Verification",
                text: `Your email has been verified. Visit our homepage: http://localhost:8000`,
                html: `<b>Your email has been verified.</b><br><a href="http://localhost:8000">Visit our homepage</a>`,
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log("✅ Verification email sent successfully to:", email);
            } catch (error) {
                console.error("❌ Error sending email:", error);
                return res.status(500).json({ error: "Signup successful, but email could not be sent." });
            }

            res.status(200).json({ message: "Signup successful! Verification email sent." });
        });
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json({ error: "An error occurred. Please try again." });
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

            res.status(200).json({ message: "Login successful!" });
        });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ error: "An error occurred. Please try again." });
    }
});

// Fetch Stock Data from Alpha Vantage
async function getStockData(symbol) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                function: "TIME_SERIES_DAILY",
                symbol: symbol,
                apikey: ALPHA_VANTAGE_API_KEY
            }
        });

        const timeSeries = response.data["Time Series (Daily)"];
        if (!timeSeries) throw new Error("Invalid API response");

        const latestDate = Object.keys(timeSeries)[0];
        const stockInfo = timeSeries[latestDate];

        return {
            symbol,
            date: latestDate,
            open: stockInfo["1. open"],
            high: stockInfo["2. high"],
            low: stockInfo["3. low"],
            close: stockInfo["4. close"],
            volume: stockInfo["5. volume"]
        };
    } catch (err) {
        console.error("Error fetching stock data:", err.message);
        return null;
    }
}

// Get Investment Advice from OpenAI based on stock data
async function getInvestmentAdvice(userProfile) {
    const stockSymbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"]; // Example stock symbols to analyze

    const stockDataPromises = stockSymbols.map(symbol => getStockData(symbol));

    try {
        const stockData = await Promise.all(stockDataPromises);
        const filteredStockData = stockData.filter(data => data !== null);

        const prompt = `
        Based on the following stock data from the past 5 days for the given stocks:

        ${filteredStockData.map(data => `
        Stock: ${data.symbol}
        Date: ${data.date}
        Open: ${data.open}
        High: ${data.high}
        Low: ${data.low}
        Close: ${data.close}
        Volume: ${data.volume}`).join("\n")}

        and the user's financial profile:
        Income: ${userProfile.income}
        Expenses: ${userProfile.expenses}
        Goals: ${userProfile.goals.join(", ")}

        Provide a detailed recommendation on which stock(s) would be the best investment for the user.
        Consider factors such as stock performance, risk, and user preferences.
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }]
        });

        return response.choices[0].message.content;
    } catch (err) {
        console.error("Error getting investment advice:", err.message);
        return "An error occurred while processing the investment advice.";
    }
}

// Frontend routes
router.get("/advice", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "Frontend", "src", "advice.html"));
});

router.post("/advice", async (req, res) => {
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

module.exports = router;