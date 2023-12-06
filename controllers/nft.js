const { Alchemy, Network } = require('alchemy-sdk');
const NFT = require('../models/nft');
const NFTMetaData = require('../models/nftMetaData');

// Alchemy configuration
const config = {
    apiKey: process.env.API_KEY,
    network: Network.ETH_GOERLI,
};

// Create an instance of Alchemy with the provided configuration
const alchemy = new Alchemy(config);

/**
 * Fetch owned NFTs for a given address from Alchemy and update MongoDB.
 * @function
 * @async
 * @param {string} address - Ethereum address to fetch owned NFTs for.
 * @returns {Promise<Object>} - Alchemy response containing owned NFTs.
 */
const fetchNFT = async (address) => {
    try {
        // Fetch owned NFTs from Alchemy
        const response = await alchemy.nft.getNftsForOwner(address);

        // Update or insert NFT details into MongoDB
        await NFT.findOneAndUpdate(
            { address: address },
            { $set: { ownedNfts: response.ownedNfts, pageKey: response.pageKey, totalCount: response.totalCount, validAt: response.validAt } },
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
 * Get owned NFTs for a given Ethereum address.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.getnft = async (req, res) => {
    const address = req.params.address;
    await fetchNFT(address);

    try {
        // Retrieve NFT details from MongoDB for the specified address
        const nftDetail = await NFT.find({ address: address });

        res.status(200).json(nftDetail);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

/**
 * Fetch NFT metadata for a given address and tokenId from Alchemy and update MongoDB.
 * @function
 * @async
 * @param {string} address - Ethereum address of the NFT owner.
 * @param {string} tokenId - ID of the NFT for which metadata is fetched.
 * @returns {Promise<Object>} - Alchemy response containing NFT metadata.
 */
const fetchNFTMetaData = async (address, tokenId) => {
    try {
        // Fetch NFT metadata from Alchemy
        const response = await alchemy.nft.getNftMetadata(address, tokenId, {});

        // Update or insert NFT metadata into MongoDB
        await NFTMetaData.findOneAndUpdate(
            { address: address },
            {
                $set: {
                    tokenBalances: response.tokenBalances,
                    contract: response.contract,
                    tokenId: response.tokenId,
                    tokenType: response.tokenType,
                    name: response.name,
                    tokenUri: response.tokenUri,
                    image: response.image,
                    raw: response.raw,
                    collection: response.collection,
                    mint: response.mint,
                    timeLastUpdated: response.timeLastUpdated,
                },
            },
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
 * Get NFT metadata for a given Ethereum address and tokenId.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.getnftMetadata = async (req, res) => {
    const address = req.params.address;
    const tokenId = req.params.tokenId;
    await fetchNFTMetaData(address, tokenId);

    try {
        // Retrieve NFT metadata from MongoDB for the specified address and tokenId
        const nftDetail = await NFT.find({ address: address });

        res.status(200).json(nftDetail);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
