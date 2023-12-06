// Import the jwt library and the User model
const jwt = require("jsonwebtoken");
const User = require("../models/user");

/**
 * Middleware function to protect routes by verifying the user's authentication token.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @throws {Error} - If the user is not authorized or the token is invalid.
 */
const protect = async (req, res, next) => {
    let token;

    // Check if the request contains the Authorization header with a Bearer token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Extract the token from the Authorization header
            token = req.headers.authorization.split(" ")[1];

            // Verify the token using the secret key
            const decoded = jwt.verify(token, process.env.AUTHORIZATION_SECRET_KEY);

            // Check if the token has expired
            const currentTime = Math.floor(Date.now() / 1000);
            if (decoded.exp < currentTime) {
                res.json("Token Expired");
            }

            // Attach the user information to the request object
            req.user = await User.findById(decoded.id).select("-password");

            // Continue to the next middleware
            next();
        } catch (error) {
            // Handle token verification errors
            res.status(401).send(new Error("Not authorized, token failed"));
            throw new Error("Not authorized, token failed");
        }
    }

    // If no token is provided, respond with a 401 status
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
};

// Export the protect middleware to make it accessible in other modules
module.exports = { protect };
