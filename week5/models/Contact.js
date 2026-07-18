/* ==========================================================================
   INTERNSHIP SUBMISSION - WEEK 5 - SCHEMA FOR CONTACT FORM INQUIRIES
   ========================================================================== */

const mongoose = require('mongoose');

// Define Schema representation
const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required for submission"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required for submission"],
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address representation"
        ]
    },
    message: {
        type: String,
        required: [true, "Message is required for submission"],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Capture submission timestamp automatically
    }
});

// Compile and export the Model representation
module.exports = mongoose.model('Contact', ContactSchema);
