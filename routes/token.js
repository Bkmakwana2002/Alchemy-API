const express = require('express')
const { getTokenDetails,getTokenMetaData } = require('../controllers/token');
const { protect } = require('../middleware/auth');

const router = express.Router()

router.route('/fetch-token/:address').get(protect,getTokenDetails);
router.route('/fetch-tokenMetaData/:address').get(protect,getTokenMetaData);

module.exports = router