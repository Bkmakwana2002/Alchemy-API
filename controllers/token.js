const { Alchemy, Network } = require('alchemy-sdk');
const Tokens = require('../models/token');
const TokensMetaData = require('../models/tokenMetaData');

// Alchemy configuration
const config = {
    apiKey: process.env.API_KEY,
    network: Network.ETH_GOERLI,
}

// Create an instance of Alchemy with the provided configuration
const alchemy = new Alchemy(config);

/**
 * Fetch token balances for a given address from Alchemy and update MongoDB.
 * @function
 * @async
 * @param {string} address - Ethereum address to fetch token balances for.
 * @returns {Promise<Object>} - Alchemy response containing token balances.
 */
const fetchTokenDetails = async (address) => {
    try {
        // Fetch token balances from Alchemy
        const response = await alchemy.core.getTokenBalances(address);

        // Update or insert token details into MongoDB
        await Tokens.findOneAndUpdate(
            { address: address },
            { $set: { tokenBalances: response.tokenBalances } },
            { upsert: true, new: true }
        );

        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Get token details for a given Ethereum address.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.getTokenDetails = async (req, res) => {
    const address = req.params.address;
    await fetchTokenDetails(address);

    try {
        // Retrieve token details from MongoDB for the specified address
        const tokenDetail = await Tokens.find({ address: address });

        res.status(200).json(tokenDetail);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

/**
 * Fetch token metadata for a given address from Alchemy and update MongoDB.
 * @function
 * @async
 * @param {string} address - Ethereum address to fetch token metadata for.
 * @returns {Promise<Object>} - Alchemy response containing token metadata.
 */
const fetchTokenMetaData = async (address) => {
    try {
        // Fetch token metadata from Alchemy
        const response = await alchemy.core.getTokenMetadata(address);

        // Update or insert token metadata into MongoDB
        await TokensMetaData.findOneAndUpdate(
            { address: address },
            { $set: { decimals: response.decimals, logo: response.logo, name: response.name, symbol: response.symbol } },
            { upsert: true, new: true }
        );

        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Get token metadata for a given Ethereum address.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.getTokenMetaData = async (req, res) => {
    const address = req.params.address;
    await fetchTokenMetaData(address);

    try {
        // Retrieve token metadata from MongoDB for the specified address
        const tokenDetail = await TokensMetaData.find({ address: address });

        res.status(200).json(tokenDetail);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
