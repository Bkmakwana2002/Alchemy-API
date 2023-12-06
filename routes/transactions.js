const express = require('express')
const { getTransactions } = require('../controllers/transactions');
const { protect } = require('../middleware/auth');

const router = express.Router()

router.route('/fetch-transaction/:address').get(protect,getTransactions);

module.exports = router