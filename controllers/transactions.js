const { Alchemy, Network } = require('alchemy-sdk');
const Transactions = require('../models/transactions');

const config = {
    apiKey: process.env.API_KEY,
    network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(config);

const getBlockTimestamp = async (blockHash) => {
    try {
        const blockInfo = await alchemy.core.getBlock(blockHash);
        if (!blockInfo) {
            console.error(`Block not found for hash ${blockHash}`);
            return null;
        }
        console.log(blockInfo)
        return "1000"
    } catch (error) {
        console.error(`Error getting timestamp for block ${blockHash}:`, error);
        throw error;
    }
};

const fetchTransactionsFromAlchemy = async (address) => {
    try {
        const data = await alchemy.core.getAssetTransfers({
            fromBlock: "0x0",
            fromAddress: address,
            category: ["external", "internal", "erc20", "erc721", "erc1155"],
        });

        console.log(data,address)

        const transactionsToInsert = [];

        for (const element of data.transfers) {
            const hash = element.hash;
            const blockTimestamp = "000"

            const transactionData = {
                hash: hash,
                from: element.from,
                to: element.to,
                value: element.value,
                address : address,
                timestamp: blockTimestamp,
            };

            transactionsToInsert.push(transactionData);
        }
        console.log(data.transfers)
        await Transactions.insertMany(transactionsToInsert);

        console.log(`Inserted ${transactionsToInsert.length} transactions into MongoDB.`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.getTransactions = async (req, res) => {
    const address = req.params.address;
    console.log(address,"address")
    const page = req.query.page || 1;
    const pageSize = 10;
    await fetchTransactionsFromAlchemy(address)
    try {

        const transactions = await Transactions.find({ address : address }).skip((page - 1) * pageSize).limit(pageSize);       

        res.status(200).json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
