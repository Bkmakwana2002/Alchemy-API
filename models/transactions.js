const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    hash: String,
    from: String,
    to: String,
    value: String,
    address : String,
    timestamp: String,
}, { timestamps: true });

const Transactions = mongoose.model("Transactions", transactionSchema);

module.exports = Transactions;