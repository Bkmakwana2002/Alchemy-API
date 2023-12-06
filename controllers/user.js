const jwt = require("jsonwebtoken");
const User = require("../models/user");
const generateToken = require("../generateToken");
const crypto = require("crypto");
const ethers = require("ethers");

/**
 * Register a new user.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(404)
        .send({ success: false, message: "User already exists" });
    }

    // Create a new user
    user = await User.create({ name, email, password });

    // Generate authentication token
    const token = await generateToken(user._id);

    // Respond with user details and token
    res.json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } catch (error) {
    // Handle registration error
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Authenticate a user.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email and check the password
    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.matchPassword(password))) {
      // Respond with user details and authentication token
      res.status(201).send({
        success: true,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      // Respond with authentication failure
      res.status(401);
      throw new Error("Wrong Email or Password");
    }
  } catch (error) {
    // Handle authentication error
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get a nonce for Metamask authentication.
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.getNonce = (req, res) => {
  const nonce = crypto.randomBytes(32).toString("hex");
  res.status(200).json({ nonce });
};

/**
 * Login with Metamask authentication.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.loginMetamask = async (req, res) => {
  const { signedMessage, message, address } = req.body;
  try {
    // Verify the Metamask signature
    const recoveredAddress = await ethers.utils.verifyMessage(
      message,
      signedMessage
    );

    if (recoveredAddress !== address) {
      // Respond with invalid signature error
      return res.status(401).json({ error: "Invalid signature" });
    }

    // Generate authentication token
    const token = await generateToken(address);

    // Respond with the authentication token
    res.status(200).json({ token });
  } catch (error) {
    // Handle Metamask login error
    res.send(error).status(500);
  }
};
