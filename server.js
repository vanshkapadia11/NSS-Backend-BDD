// server.js

require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
  🩸 ═══════════════════════════════════════════
  🩸   Blood Donation Drive API
  🩸   Port: ${PORT}
  🩸   URL: http://localhost:${PORT}
  🩸 ═══════════════════════════════════════════

  📋 Endpoints:
  
  GET  /api/donations/departments  → All departments + counts
  GET  /api/donations/top3         → Top 3 departments
  GET  /api/donations/health       → Health check
  
  `);
});
