// Import the `mongoose` library and load environment variables
const mongoose = require("mongoose");
require("dotenv").config();

/**
 * Establishes a connection to MongoDB using the provided URI.
 * Prints a success message if the connection is successful.
 *
 * @returns {Promise<void>} - A promise indicating the success or failure of the connection.
 */
const connectDB = async () => {
    try {
        // Connect to MongoDB using the provided URI, with options for parsing and topology
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Print a success message if the connection is established
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // Print an error message and exit the process if connection fails
        console.log(`Error: ${error.message}`);
        process.exit();
    }
};

// Export the connectDB function to make it accessible in other modules
module.exports = connectDB;
