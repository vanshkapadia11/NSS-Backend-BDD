# NSS Blood Donation Drive — Backend API

A lightweight REST API built with **Node.js** and **Express** for managing and serving blood donation drive data for the National Service Scheme (NSS). Instead of a traditional database, it reads live data directly from **Google Sheets**, making it easy for coordinators to update records without touching any code.

---

## 🚀 Features

- Fetches blood donation drive data from Google Sheets in real time
- RESTful API served via Express
- CORS-enabled for frontend integration
- Security headers via Helmet
- HTTP request logging with Morgan
- Environment-based configuration with dotenv

---

## 🛠️ Tech Stack

| Layer        | Technology              |
|--------------|-------------------------|
| Runtime      | Node.js                 |
| Framework    | Express v4              |
| Data Source  | Google Sheets (via Googleapis v140) |
| Security     | Helmet, CORS            |
| Logging      | Morgan                  |
| Config       | dotenv                  |
| Dev Tool     | Nodemon                 |

---

## 📁 Project Structure

```
NSS-Backend/
├── src/              # Route handlers, controllers, services
├── server.js         # Entry point
├── package.json
└── .env              # Environment variables (not committed)
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v16+
- A Google Cloud project with the **Google Sheets API** enabled
- A Service Account with access to the target spreadsheet

### 1. Clone the repo

```bash
git clone https://github.com/vanshkapadia11/NSS-Backend.git
cd NSS-Backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
PORT=3000
GOOGLE_SHEET_ID=your_google_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### 4. Run the server

```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

The server will start at `http://localhost:3000`.

---

## 📡 API Endpoints

| Method | Endpoint      | Description                          |
|--------|---------------|--------------------------------------|
| GET    | `/`           | Health check                         |
| GET    | `/donors`     | Fetch all blood donation records     |

> Endpoints may vary — check `src/` for the full route definitions.

---

## 🔐 Google Sheets Setup

1. Create a Google Sheet and populate it with donor data (name, blood group, contact, date, etc.).
2. In [Google Cloud Console](https://console.cloud.google.com/), enable the **Google Sheets API**.
3. Create a **Service Account**, download the JSON key, and extract `client_email` and `private_key` into your `.env`.
4. Share the Google Sheet with the service account email (Viewer access is sufficient).

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

This project is open source. Feel free to use and adapt it for your own NSS unit or college event.
