// src/controllers/donationController.js

const donationService = require("../services/donationService");

class DonationController {
  /**
   * GET /api/donations/departments
   * Returns all departments with their aggregated donation counts
   * e.g. { "COMPS": 12, "IT": 10, "ICB": 0 }
   */
  async getDepartments(req, res, next) {
    try {
      const departments = await donationService.getDepartmentCounts();
      const totalDonations = Object.values(departments).reduce(
        (sum, count) => sum + count,
        0,
      );

      res.json(
        // success: true,
        // message: "Department donation counts fetched successfully",
        // totalDonations,
        // totalDepartments: Object.keys(departments).length,
        departments,
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/donations/top3
   * Returns top 3 departments with highest donation counts
   * e.g. { "COMPS": 12, "IT": 10, "ICB": 0 }
   */
  async getTop3Departments(req, res, next) {
    try {
      const { top3, totalDonations } =
        await donationService.getTop3Departments();

      res.json(
        // success: true,
        // message: "Top 3 departments fetched successfully",
        // totalDonations,
        top3,
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DonationController();
