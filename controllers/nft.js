const { Alchemy, Network } = require('alchemy-sdk');
const NFT = require('../models/nft')
const NFTMetaData = require('../models/nftMetaData')

const config = {
    apiKey: process.env.API_KEY,
    network: Network.ETH_GOERLI,
}

const alchemy = new Alchemy(config);


const fetchNFT = async (address) => {
    try {
        const response = await alchemy.nft.getNftsForOwner(address)
        let nft = await NFT.findOneAndUpdate(
            { address: address },
            { $set: { ownedNfts : response.ownedNfts , pageKey : response.pageKey, totalCount : response.totalCount , validAt : response.validAt } },
            { upsert: true, new: true } 
        );

        console.log(nft)
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.getnft = async(req,res)=>{
    const address = req.params.address;
    await fetchNFT(address)
    try {
        const nftDetail = await NFT.find({ address: address })
        res.status(200).json(nftDetail);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const fetchNFTMetaData = async (address,tokenId) => {
    try {
        const response = await alchemy.nft.getNftMetadata(address,tokenId,{})
        let nftMetaData = await NFTMetaData.findOneAndUpdate(
            { address: address },
            { $set: { tokenBalances : response.tokenBalances , contract : response.contract, tokenId : response.tokenId , tokenType : response.tokenType, name : response.name , tokenUri : response.tokenUri , image : response.image , raw : response.raw , collection : response.collection, mint : response.mint, timeLastUpdated : response.timeLastUpdated } },
            { upsert: true, new: true } 
        );

        console.log(nftMetaData)
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.getnftMetadata = async(req,res)=>{
    const address = req.params.address
    const tokenId = req.params.tokenId
    await fetchNFTMetaData(address,tokenId)
    try {
        const nftDetail = await NFT.find({ address: address })
        res.status(200).json(nftDetail);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}