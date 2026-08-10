// src/config/googleSheets.js

const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

class GoogleSheetsConfig {
  constructor() {
    this.sheets = null;
    this.sheetId = process.env.GOOGLE_SHEET_ID; // Still use .env for the Sheet ID
    this.sheetName = process.env.SHEET_NAME || "Sheet1";
  }

  async initialize() {
    try {
      // Go up two levels from src/config/ to reach the root directory
      const credentialsPath = path.join(__dirname, "../../credentials.json");

      // Read and parse the credentials.json file
      const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));

      const auth = new google.auth.JWT(
        credentials.client_email,
        null,
        credentials.private_key,
        ["https://www.googleapis.com/auth/spreadsheets.readonly"],
      );

      this.sheets = google.sheets({ version: "v4", auth });
      console.log("✅ Google Sheets API connected via credentials.json");
      return this.sheets;
    } catch (error) {
      console.error("❌ Google Sheets auth failed:", error.message);
      throw error;
    }
  }

  async getSheetData() {
    if (!this.sheets) {
      await this.initialize();
    }

    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.sheetId,
      range: `${this.sheetName}!A:Z`,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      throw new Error("No data found in the sheet");
    }

    // Get headers from first row
    const headers = rows[0].map((h) => h.toString().toLowerCase().trim());

    // Find department column index (only column we need now)
    const deptIndex = headers.findIndex((h) =>
      ["department", "dept", "branch"].includes(h),
    );

    if (deptIndex === -1) {
      throw new Error(
        `'Department' column not found. Found: ${headers.join(", ")}`,
      );
    }

    console.log(`📋 Found 'Department' column at index ${deptIndex}`);

    // Extract raw department values (skip header row).
    // Rows with a missing/blank department cell are kept as "" here
    // (not dropped) so the service layer can count and report them
    // instead of silently losing rows.
    const rawData = rows.slice(1).map((row) => {
      const cell = row[deptIndex];
      return cell ? cell.toString().trim() : "";
    });

    return rawData;
  }
}

module.exports = new GoogleSheetsConfig();
