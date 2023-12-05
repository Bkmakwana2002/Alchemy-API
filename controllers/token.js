const { Alchemy, Network } = require('alchemy-sdk');
const Tokens = require('../models/token');

const config = {
    apiKey: "CVLadiewE3TS80rHjQydiSyJsxVSIjV6",
    network: Network.ETH_GOERLI,
}

const alchemy = new Alchemy(config);

const fetchTokenDetails = async (address) => {
    try {
        const tokenContractAddresses = ["0xdAC17F958D2ee523a2206206994597C13D831ec7"];
        const response = await alchemy.core.getTokenBalances(address,tokenContractAddresses)
        console.log(response)
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.getTokenDetails = async (req, res) => {
    const address = req.params.address;
    await fetchTokenDetails(address)
    try {
        const tokenDetail = await Tokens.find({ address : address })
        console.log(tokenDetail)
        res.status(200).json(address);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};