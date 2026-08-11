// src/services/donationService.js

const googleSheets = require("../config/googleSheets");

// The only valid branches/departments. Any sheet value that doesn't
// match one of these (case-insensitively) is treated as invalid.
const KNOWN_DEPARTMENTS = [
  "COMPS",
  "IT",
  "CSEDS",
  "ICB",
  "MECH",
  "EXTC",
  "AIDS",
  "Outsider",
  "AIML"
];

class DonationService {
  /**
   * Get department -> donation count map, e.g.
   * { "COMPS": 12, "IT": 10, "CSEDS": 4, "ICB": 0, "MECH": 0, "EXTC": 0, "AIDS": 0, "Outsider": 0 }
   * Each row in the sheet = one donation, counted against its department.
   * Rows with a blank department cell, or a value that isn't one of the
   * known branches, are skipped (not crashed on, not added as new keys).
   * Always fetches fresh data from Google Sheets — no caching.
   */
  async getDepartmentCounts() {
    console.log("🔄 Fetching fresh data from Google Sheets...");

    // Fetch raw department values (one per row)
    const rawDepartments = await googleSheets.getSheetData();

    // Start counts at 0 for every known department
    const counts = {};
    KNOWN_DEPARTMENTS.forEach((dept) => {
      counts[dept] = 0;
    });

    let skippedCount = 0;

    rawDepartments.forEach((rawDept) => {
      // No branch present in this row at all
      if (!rawDept) {
        skippedCount++;
        return;
      }

      const match = KNOWN_DEPARTMENTS.find(
        (dept) => dept.toLowerCase() === rawDept.toLowerCase(),
      );

      // Value present but doesn't match any known branch
      if (!match) {
        console.warn(`⚠️ Unrecognized department value skipped: "${rawDept}"`);
        skippedCount++;
        return;
      }

      counts[match] += 1;
    });

    if (skippedCount > 0) {
      console.log(
        `⚠️ Skipped ${skippedCount} row(s) with missing/invalid department`,
      );
    }

    console.log(
      `✅ Processed ${rawDepartments.length} rows into ${Object.keys(counts).length} departments`,
    );

    return counts;
  }

  /**
   * Get top 3 departments with highest donation counts,
   * still returned as { "Dept": count } in ranked order.
   */
  async getTop3Departments() {
    const allDepartments = await this.getDepartmentCounts();
    const totalDonations = Object.values(allDepartments).reduce(
      (sum, count) => sum + count,
      0,
    );

    const top3Entries = Object.entries(allDepartments)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const top3 = {};
    top3Entries.forEach(([department, count]) => {
      top3[department] = count;
    });

    return {
      top3,
      totalDonations,
    };
  }
}

module.exports = new DonationService();
