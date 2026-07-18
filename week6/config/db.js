/* ==========================================================================
   INTERNSHIP SUBMISSION - WEEK 6 - MONGODB CONNECTION ADAPTER
   ========================================================================== */

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connURI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio_db';
        
        console.log(`Connecting to MongoDB at: ${connURI}...`);
        
        const conn = await mongoose.connect(connURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
