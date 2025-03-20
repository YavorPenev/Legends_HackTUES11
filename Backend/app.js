require('dotenv').config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const path = require("path");

const router = express.Router();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL");
});

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "Frontend", "public", "index.html"), (err) => {
        if (err) {
            console.error("Error loading index.html:", err);
            res.status(500).json({ error: "Internal Server Error: Unable to load index.html" });
        }
    });
});

router.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "Frontend", "public", "signup.html"), (err) => {
        if (err) {
            console.error("Error loading signup.html:", err);
            res.status(500).json({ error: "Internal Server Error: Unable to load signup.html" });
        }
    });
});

router.get("/signup1", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "Frontend", "public", "signup1.html"), (err) => {
        if (err) {
            console.error("Error loading signup1.html:", err);
            res.status(500).json({ error: "Internal Server Error: Unable to load signup1.html" });
        }
    });
});


router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "Frontend", "public", "login.html"), (err) => {
        if (err) {
            console.error("Error loading login.html:", err);
            res.status(500).json({ error: "Internal Server Error: Unable to load login.html" });
        }
    });
});


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

router.post("/signup1", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO users (email) VALUES (?)";
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



module.exports = router;