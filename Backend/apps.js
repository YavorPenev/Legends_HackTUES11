require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const path = require("path");
const axios = require("axios");
const { OpenAI } = require("openai");

const ALPHA_VANTAGE_API_KEY = ALPHA_API_KEY;
const BASE_URL = "https://www.alphavantage.co/query";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const router = express.Router();

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "efedrin12",
    database: "legendsdb"
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL");
});

// Serve Frontend Pages
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "Frontend", "public", "index.html"), (err) => {
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

// Signup Route
router.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        
        db.query(sql, [username, hashedPassword], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(400).json({ error: "Username already exists." });
            }

            res.status(200).json({ message: "Signup successful!" });
        });
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json({ error: "An error occurred. Please try again." });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const sql = "SELECT * FROM users WHERE username = ?";
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
    res.sendFile(path.join(__dirname, "..", "Frontend", "public", "advice.html"));
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

const nodemailer = require('nodemailer');
require ('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PASS,
    },
  });

  const mailOptions = {
    from:{
        name: 'Legends',
        address: "legendtues11@gmail.com",
    },
    to: process.env.USER,
    subject: "Verification",
    text: "The email is verificated",    
    html: "<b>The email is verificated</b>",
  }

  const sendMail = async(transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        console.log("SAMO LEVSKI");
    }catch(error){
        console.log(error);
    }
  }

  sendMail(transporter, mailOptions)


module.exports = router;