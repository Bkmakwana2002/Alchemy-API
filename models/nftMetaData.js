const mongoose = require("mongoose");

const nftMetaDataSchema = new mongoose.Schema({
    address: String,
    tokenBalances: [
        {
            contractAddress: String,
            tokenBalance: String,
        }
    ],
    contract: {
        address: String,
        name: String,
        symbol: String,
        totalSupply: String,
        tokenType: String,
        contractDeployer: String,
        deployedBlockNumber: Number,
        openSeaMetadata: {
            floorPrice: Number,
            collectionName: String,
            collectionSlug: String,
            safelistRequestStatus: String,
            imageUrl: String,
            description: String,
            externalUrl: String,
            twitterUsername: String,
            discordUrl: String,
            bannerImageUrl: String,
            lastIngestedAt: Date,
        },
        spamClassifications: [String],
    },
    tokenId: String,
    tokenType: String,
    name: String,
    tokenUri: String,
    image: {
        cachedUrl: String,
        thumbnailUrl: String,
        pngUrl: String,
        contentType: String,
        size: Number,
        originalUrl: String,
    },
    raw: {
        tokenUri: String,
        metadata: {
            name: String,
            image: String,
            attributes: [
                {
                    value: String,
                    trait_type: String,
                }
            ],
        },
    },
    collection: {
        name: String,
        slug: String,
        externalUrl: String,
        bannerImageUrl: String,
    },
    mint: {},
    timeLastUpdated: Date,
}, { timestamps: true });

const NFTMetaData = mongoose.model("NFTMetaData", nftMetaDataSchema);

module.exports = NFTMetaData;
