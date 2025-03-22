const express = require("express");
const path = require("path");
const app = express();
const router = require("./app.js");

// Middleware to set MIME type for .jsx files
app.use((req, res, next) => {
  if (req.url.endsWith('.jsx')) {
    res.type('application/javascript');
  }
  next();
});

app.use("/src", express.static(path.join(__dirname, "..", "Frontend", "src")));

app.use(express.json());

app.use("/", router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});