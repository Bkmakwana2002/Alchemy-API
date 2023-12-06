const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
    address: String,
    ownedNfts: [
        {
            contract: {
                address: String,
                name: String,
                symbol: String,
                tokenType: String,
                contractDeployer: String,
                deployedBlockNumber: Number,
                openSeaMetadata: {
                    collectionName: String,
                    collectionSlug: String,
                    safelistRequestStatus: String,
                    imageUrl: String,
                    description: String,
                    externalUrl: String,
                    bannerImageUrl: String,
                    lastIngestedAt: Date,
                },
                isSpam: Boolean,
                spamClassifications: [String],
            },
            tokenId: String,
            tokenType: String,
            tokenUri: String,
            image: {},
            raw: {
                tokenUri: String,
                metadata: {},
                error: String,
            },
            collection: {
                name: String,
                slug: String,
                externalUrl: String,
                bannerImageUrl: String,
            },
            mint: {},
            timeLastUpdated: Date,
            balance: String,
            acquiredAt: {},
        }
    ],
    pageKey: String,
    totalCount: Number,
    validAt: {
        blockNumber: Number,
        blockHash: String,
        blockTimestamp: Date,
    },
}, { timestamps: true });

const NFT = mongoose.model("NFT", nftSchema);

module.exports = NFT;
