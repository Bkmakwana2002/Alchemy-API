const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const connectDB = require('./db');
const transaction_routes = require('./routes/transactions');
const token_routes = require('./routes/token');
const nft_routes = require('./routes/nft');
const user_routes = require('./routes/user');
const { rateLimit } = require('express-rate-limit');

// Enable parsing of JSON data in requests
app.use(express.json());

// Enable parsing of URL-encoded data in requests
app.use(express.urlencoded({ extended: true }));

// Enable parsing of JSON data in requests using the bodyParser middleware
app.use(bodyParser.json());

// Load environment variables from .env file
require('dotenv').config({ path: './.env' });

// Connect to the database
connectDB();

// Create a rate limiter middleware to protect against DDoS attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});

// Serve the index.html file for the root endpoint '/'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// Apply the rate limiter middleware to all routes under '/api'
app.use('/api', limiter);

// Attach the routes to the '/api' path
app.use('/api', transaction_routes);
app.use('/api', token_routes);
app.use('/api', nft_routes);
app.use('/api', user_routes);

// Start the server and listen on the specified port
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
