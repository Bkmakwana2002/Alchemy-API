const { Alchemy, Network } = require('alchemy-sdk');
const Transactions = require('../models/transactions');

// Alchemy configuration
const config = {
    apiKey: process.env.API_KEY,
    network: Network.ETH_GOERLI,
};

// Create an instance of Alchemy with the provided configuration
const alchemy = new Alchemy(config);

/**
 * Get the timestamp for a given block hash.
 * @function
 * @async
 * @param {string} blockHash - Hash of the block to get the timestamp for.
 * @returns {Promise<?string>} - Timestamp of the block, or null if not found.
 */
const getBlockTimestamp = async (blockHash) => {
    try {
        // Retrieve block information from Alchemy
        const blockInfo = await alchemy.core.getBlock(blockHash);

        if (!blockInfo) {
            console.error(`Block not found for hash ${blockHash}`);
            return null;
        }

        // Extract and return the block timestamp
        return "1000"; // Replace this with the actual timestamp
    } catch (error) {
        console.error(`Error getting timestamp for block ${blockHash}:`, error);
        throw error;
    }
};

/**
 * Fetch transactions for a given address from Alchemy and insert into MongoDB.
 * @function
 * @async
 * @param {string} address - Ethereum address to fetch transactions for.
 */
const fetchTransactionsFromAlchemy = async (address) => {
    try {
        // Fetch asset transfers from Alchemy
        const data = await alchemy.core.getAssetTransfers({
            fromBlock: "0x0",
            fromAddress: address,
            category: ["external", "internal", "erc20", "erc721", "erc1155"],
        });

        // Log data for debugging purposes
        console.log(data, address);

        const transactionsToInsert = [];

        // Process and prepare transactions for insertion into MongoDB
        for (const element of data.transfers) {
            const hash = element.hash;
            const blockTimestamp = await getBlockTimestamp(element.blockHash);

            const transactionData = {
                hash: hash,
                from: element.from,
                to: element.to,
                value: element.value,
                address: address,
                timestamp: blockTimestamp,
            };

            transactionsToInsert.push(transactionData);
        }

        // Insert transactions into MongoDB
        await Transactions.insertMany(transactionsToInsert);

        console.log(`Inserted ${transactionsToInsert.length} transactions into MongoDB.`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Get transactions for a given Ethereum address.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.getTransactions = async (req, res) => {
    const address = req.params.address;
    const page = req.query.page || 1;
    const pageSize = 10;

    // Fetch transactions from Alchemy and insert into MongoDB
    await fetchTransactionsFromAlchemy(address);

    try {
        // Retrieve transactions from MongoDB for the specified address
        const transactions = await Transactions.find({ address: address })
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        // Respond with the retrieved transactions
        res.status(200).json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
