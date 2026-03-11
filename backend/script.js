const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

const hospitalRoutes = require("./routes/hospitalRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

dotenv.config();
connectDB();
app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/hospital", hospitalRoutes);

app.use("/api/booking", bookingRoutes);

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log("Server is running");
});
