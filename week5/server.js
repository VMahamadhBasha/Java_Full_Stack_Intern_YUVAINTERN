/* ==========================================================================
   INTERNSHIP SUBMISSION - WEEK 5 - EXPRESS SERVER WITH DATABASE PERSISTENCE
   ========================================================================== */

// 1. ENVIRONMENT SETTINGS
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Contact = require('./models/Contact');

// 2. CONNECT TO DATABASE
connectDB();

// 3. SERVER INITIALIZATION
const app = express();
const PORT = process.env.PORT || 5000;

// 4. CONFIG MIDDLEWARES
app.use(cors());
app.use(express.json());

// 5. DEFINE ENDPOINTS
app.get('/api/status', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Express server + Database connected state active.",
        dbState: "Connected"
    });
});

// POST Endpoint: Save contact message to MongoDB database
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Perform validation check
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Missing parameter. Please check name, email, and message properties."
            });
        }

        // Save incoming inquiries to MongoDB using model schema
        const newInquiry = new Contact({
            name,
            email,
            message
        });

        await newInquiry.save();

        console.log(`[Database Saved] Success! Message saved under ID: ${newInquiry._id}`);

        return res.status(201).json({
            success: true,
            message: `Thank you, ${name}! Your inquiry has been stored successfully in our database.`,
            data: newInquiry
        });
    } catch (error) {
        console.error(`Database storage error: ${error.message}`);
        
        return res.status(500).json({
            success: false,
            message: "Internal Server Error. Could not save information to the database.",
            error: error.message
        });
    }
});

// 6. START LISTEN PROCESS
app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`Database-connected server running on port: ${PORT}`);
    console.log(`==================================================`);
});
