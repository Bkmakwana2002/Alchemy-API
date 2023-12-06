// Import the `jsonwebtoken` library
const jwt = require("jsonwebtoken");

/**
 * Generates a JSON Web Token (JWT) with the provided user ID.
 *
 * @param {string} id - The user ID to include in the token payload.
 * @returns {string} - The generated JWT.
 */
const generateToken = (id) => {
    // Sign the token with the user ID, secret key, and an expiration time of 1 day
    return jwt.sign({ id }, process.env.AUTHORIZATION_SECRET_KEY, {
        expiresIn: "1d",
    });
};

// Export the generateToken function to make it accessible in other modules
module.exports = generateToken;
