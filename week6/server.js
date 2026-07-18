/* ==========================================================================
   INTERNSHIP SUBMISSION - WEEK 6 - INTEGRATED FULL-STACK EXPRESS SERVER
   ========================================================================== */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const Contact = require('./models/Contact');

// 1. BOOTSTRAP DATABASE CONNECTION
connectDB();

// 2. INITIALIZE SERVER
const app = express();
const PORT = process.env.PORT || 5000;

// 3. MIDDLWARE PIPELINES
app.use(cors());
app.use(express.json());

// Serve static assets from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// 4. API ENDPOINTS
// API status checker
app.get('/api/status', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Full-Stack Server is active and database link is established."
    });
});

// POST Route for Contact submissions
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validation checks
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Missing parameter. Please check Name, Email, and Message."
            });
        }

        // Save into MongoDB collection
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        console.log(`[Submission Success] Stored contact document ID: ${newContact._id}`);

        return res.status(201).json({
            success: true,
            message: `Hi ${name}, your message has been received! Our backend has persisted it to MongoDB.`
        });

    } catch (error) {
        console.error(`Submission saving error: ${error.message}`);
        
        return res.status(500).json({
            success: false,
            message: "Server experienced an issue saving your message. Please try again later.",
            error: error.message
        });
    }
});

// Serve frontend portfolio layout on root URL requests (Fall-back routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 5. BOOT SERVER LISTENER
app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`Full-Stack Portfolio Server is running at http://localhost:${PORT}`);
    console.log(`API check at http://localhost:${PORT}/api/status`);
    console.log(`=======================================================`);
});
