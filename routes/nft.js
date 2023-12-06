const express = require('express')
const { getnft } = require('../controllers/nft');
// const { protect } = require('../middleware/auth');

const router = express.Router()

router.route('/fetch-nft/:address').get(getnft);
// router.route('/fetch-tokenMetaData/:address').get(getTokenMetaData);

module.exports = router