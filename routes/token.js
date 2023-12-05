const express = require('express')
const { getTokenDetails,getTokenMetaData } = require('../controllers/token');
// const { protect } = require('../middleware/auth');

const router = express.Router()

router.route('/fetch-token/:address').get(getTokenDetails);
router.route('/fetch-tokenMetaData/:address').get(getTokenMetaData);

module.exports = router