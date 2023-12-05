const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    address: String,
    // tokenBalances: [
    //     {
    //         contractAddress: String,
    //         tokenBalance: String,
    //     }
    // ],
}, { timestamps: true });

const Tokens = mongoose.model("Tokens", tokenSchema);

module.exports = Tokens;
