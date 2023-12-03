const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    hash: String,
    from: String,
    to: String,
    value: String,
    timestamp: Date,
}, { timestamps: true });

const Transactions = mongoose.model("Transactions", transactionSchema);

module.exports = Transactions;