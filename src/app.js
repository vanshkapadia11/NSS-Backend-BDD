// src/app.js

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const donationRoutes = require("./routes/donationRoutes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/donations", donationRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "🩸 Blood Donation Drive API",
    version: "1.0.0",
    endpoints: {
      allDepartments: "GET /api/donations/departments",
      top3Departments: "GET /api/donations/top3",
      healthCheck: "GET /api/donations/health",
    },
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ success: false, error: err.message });
});

module.exports = app;
