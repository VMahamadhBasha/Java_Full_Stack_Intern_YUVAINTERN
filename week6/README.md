# Integrated Full-Stack Developer Portfolio Project (Week 6 Final Release)

## Project Overview
This project represents a fully integrated Full-Stack Developer Portfolio website showcasing a professional profile. The application serves static files directly from an Express server and communicates asynchronously with a REST API to save contact submissions into a MongoDB NoSQL database.

---

## 📁 Technical Architecture
*   **Frontend**: HTML5, CSS3 (Obsidian Dark Theme with responsive grids), Vanilla JavaScript (ES6 asynchronous fetch).
*   **Backend**: Node.js & Express.js server (Static file server + API route controller).
*   **Database**: MongoDB database instance connection managed via the Mongoose ODM library.
*   **Configuration**: Environment values abstraction handled by `dotenv`.

---

## 🚀 Step-by-Step Installation & Running Guide

### 1. Prerequisites
Make sure your system contains the following runtimes:
*   [Node.js](https://nodejs.org/) (Version v16+ recommended)
*   [MongoDB Community Server](https://www.mongodb.com/try/download/community) running locally (Default port `27017`)

### 2. Dependency Installation
Navigate to this folder in your terminal and install dependencies:
```bash
npm install
```

### 3. Environment Variables
Verify or create a `.env` file in the root of the folder:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/portfolio_db
```

### 4. Running the Application
To run the server in production mode:
```bash
npm start
```
To run in development mode (auto-reload on edits):
```bash
npm run dev
```

---

## 🔍 Demonstration & Testing APIs

### 1. Check Server Connection Status
Open your browser and visit: `http://localhost:5000/api/status`
*   Expected JSON output: `{"success": true, "message": "Full-Stack Server is active and database link is established."}`

### 2. Review User Interface
Visit: `http://localhost:5000/`
*   Test the specialization toggle filter buttons.
*   Check responsiveness by squeezing the browser width.

### 3. Contact Form Data Persistence
1. Fill out the Contact form on the homepage and click **Send Message**.
2. Notice the button text changes to **Sending Message...** during the fetch payload transit.
3. Observe the green dynamic **Success Notification** containing the success confirmation.
4. Verify the database: Open MongoDB Compass or MongoDB Shell (`mongosh`) and query:
```javascript
use portfolio_db;
db.contacts.find().pretty();
```
The contact submission will be stored as a document in the collection.
