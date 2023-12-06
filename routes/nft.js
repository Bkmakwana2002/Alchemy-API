// Import the express library, nft controllers, and authentication middleware
const express = require('express');
const { getnft, getnftMetadata } = require('../controllers/nft');
const { protect } = require('../middleware/auth');

// Create an instance of the express Router
const router = express.Router();

/**
 * Defines the route to fetch NFT details for a specific address.
 * This route is protected, meaning the user must be authenticated to access it.
 * It uses the getnft controller function to handle the request.
 */
router.route('/fetch-nft/:address').get(protect, getnft);

/**
 * Defines the route to fetch NFT metadata for a specific address and tokenId.
 * This route is protected, meaning the user must be authenticated to access it.
 * It uses the getnftMetadata controller function to handle the request.
 */
router.route('/fetch-nftMetaData/:address/:tokenId').get(protect, getnftMetadata);

// Export the router to make it accessible in other modules
module.exports = router;
