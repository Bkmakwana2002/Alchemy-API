const mongoose = require("mongoose");

const tokenMetaDataSchema = new mongoose.Schema({
    decimals : Number,
    logo: String,
    name : String,
    symbol : String,
    address : String
}, { timestamps: true });

const TokensMetaData = mongoose.model("TokensMetaData", tokenMetaDataSchema);

module.exports = TokensMetaData;
