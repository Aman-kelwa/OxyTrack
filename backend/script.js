const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

app.get("/", (req, res) => {
  res.send("Hello from backend");
});
const port = process.env.port || 5000;

app.listen(port, () => {
  console.log("Server is running");
});
