const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const hospitalRoutes = require("./routes/hospitalRoutes");

dotenv.config();
connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);

// app.use("/api/hospital", hospitalRoutes);
app.use("/api/hospital", hospitalRoutes);
app.use("/api/hospital", hospitalRoutes);
app.use("/api/hospital/update/:id", hospitalRoutes);

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

const port = process.env.port || 5000;

// console.log(req.headers.authorization);

app.listen(port, () => {
  console.log("Server is running");
});
