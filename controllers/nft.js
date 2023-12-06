const { Alchemy, Network } = require('alchemy-sdk');
const NFT = require('../models/nft')

const config = {
    apiKey: "CVLadiewE3TS80rHjQydiSyJsxVSIjV6",
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