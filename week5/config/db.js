/* ==========================================================================
   INTERNSHIP SUBMISSION - WEEK 5 - MONGODB CONNECTION ADAPTER
   ========================================================================== */

const mongoose = require('mongoose');

/**
 * Establishing the asynchronous connection pool handler to MongoDB database
 */
const connectDB = async () => {
    try {
        const connURI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio_db';
        
        console.log(`Connecting to MongoDB at: ${connURI}...`);
        
        const conn = await mongoose.connect(connURI, {
            // Options used to prevent legacy deprecation logs
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection error failed: ${error.message}`);
        // Exit process with failure code if connection can't be established
        process.exit(1);
    }
};

module.exports = connectDB;
