// src/routes/donationRoutes.js

const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationController");

router.get("/departments", donationController.getDepartments);
router.get("/top3", donationController.getTop3Departments);
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "🩸 Blood Donation API is running",
    timestamp: new Date(),
  });
});

module.exports = router;
