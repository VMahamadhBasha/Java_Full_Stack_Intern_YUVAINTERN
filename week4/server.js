/* ==========================================================================
   INTERNSHIP SUBMISSION - WEEK 4 - BACKEND EXPRESS.JS SERVER INITIALIZATION
   ========================================================================== */

// 1. IMPORT NODE MODULES
const express = require('express');
const cors = require('cors');

// 2. INITIALIZE EXPRESS APPLICATION
const app = express();
const PORT = process.env.PORT || 5000;

// 3. APPLY INTERMEDIATE MIDDLEWARES
app.use(cors()); // Allow cross-origin requests from frontend client development servers
app.use(express.json()); // Enable JSON body parser for incoming payloads

// 4. DEFINE API ROUTE ENDPOINTS
// GET Route to check API server status
app.get('/api/status', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Express server is running successfully.",
        timestamp: new Date()
    });
});

// POST Route for Contact Form - Week 4 mock implementation
app.post('/api/contact', (req, res) => {
    // Extract form variables from request body
    const { name, email, message } = req.body;

    // Simple backend validation validation check
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Missing parameters. Please provide Name, Email, and Message fields."
        });
    }

    console.log(`[Mock Form Submit] Name: ${name}, Email: ${email}, Message: ${message}`);

    // Return mock success response
    return res.status(200).json({
        success: true,
        message: `Thank you, ${name}! Your mock message has been successfully received by the Express server.`
    });
});

// 5. SERVER RUNNING PORT HANDLER
app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`Server started running on port: ${PORT}`);
    console.log(`Check status at: http://localhost:${PORT}/api/status`);
    console.log(`==================================================`);
});
