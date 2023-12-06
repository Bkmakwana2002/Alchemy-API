const express = require('express')
const { getnft,getnftMetadata } = require('../controllers/nft');
// const { protect } = require('../middleware/auth');

const router = express.Router()

router.route('/fetch-nft/:address').get(getnft);
router.route('/fetch-nftMetaData/:address/:tokenId').get(getnftMetadata);

module.exports = router