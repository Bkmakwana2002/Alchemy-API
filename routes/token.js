// Import the express library, token controllers, and authentication middleware
const express = require('express');
const { getTokenDetails, getTokenMetaData } = require('../controllers/token');
const { protect } = require('../middleware/auth');

// Create an instance of the express Router
const router = express.Router();

/**
 * Defines the route to fetch token details for a specific address.
 * This route is protected, meaning the user must be authenticated to access it.
 * It uses the getTokenDetails controller function to handle the request.
 */
router.route('/fetch-token/:address').get(protect, getTokenDetails);

/**
 * Defines the route to fetch token metadata for a specific address.
 * This route is protected, meaning the user must be authenticated to access it.
 * It uses the getTokenMetaData controller function to handle the request.
 */
router.route('/fetch-tokenMetaData/:address').get(protect, getTokenMetaData);

// Export the router to make it accessible in other modules
module.exports = router;
