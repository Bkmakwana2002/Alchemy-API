const { Alchemy, Network } = require('alchemy-sdk');
const Tokens = require('../models/token');
const TokensMetaData = require('../models/tokenMetaData');

const config = {
    apiKey: "CVLadiewE3TS80rHjQydiSyJsxVSIjV6",
    network: Network.ETH_GOERLI,
}

const alchemy = new Alchemy(config);

const fetchTokenDetails = async (address) => {
    try {
        const response = await alchemy.core.getTokenBalances(address)
        let tokenDetail = await Tokens.findOneAndUpdate(
            { address: address },
            { $set: { tokenBalances: response.tokenBalances } },
            { upsert: true, new: true } 
        );

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
        const tokenDetail = await Tokens.find({ address: address })
        //console.log(tokenDetail)
        res.status(200).json(tokenDetail);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const fetchTokenMetaData = async (address) => {
    try {
        const response = await alchemy.core.getTokenMetadata(address)
        let tokenMetaData = await TokensMetaData.findOneAndUpdate(
            { address: address },
            { $set: { decimals: response.decimals , logo : response.logo, name : response.name, symbol : response.symbol } },
            { upsert: true, new: true } 
        );

        console.log(response)
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.getTokenMetaData = async(req,res)=>{
    const address = req.params.address;
    await fetchTokenMetaData(address)
    try {
        const tokenDetail = await TokensMetaData.find({ address: address })
        //console.log(tokenDetail)
        res.status(200).json(tokenDetail);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}