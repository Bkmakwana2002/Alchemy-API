// Import the express library and user controllers
const express = require('express');
const { authUser, registerUser, loginMetamask, getNonce } = require('../controllers/user');

// Create an instance of the express Router
const router = express.Router();

/**
 * Defines the routes related to user authentication and registration.
 * Each route corresponds to a specific user controller function.
 */
router.route('/register').post(registerUser);
router.route('/login').post(authUser);
router.route('/login-metamask').post(loginMetamask);
router.route('/nonce').get(getNonce);

// Export the router to make it accessible in other modules
module.exports = router;
