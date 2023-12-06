// Import the express library, transactions controller, and authentication middleware
const express = require('express');
const { getTransactions } = require('../controllers/transactions');
const { protect } = require('../middleware/auth');

// Create an instance of the express Router
const router = express.Router();

/**
 * Defines the route to fetch transactions for a specific address.
 * This route is protected, meaning the user must be authenticated to access it.
 * It uses the getTransactions controller function to handle the request.
 */
router.route('/fetch-transaction/:address').get(protect, getTransactions);

// Export the router to make it accessible in other modules
module.exports = router;
