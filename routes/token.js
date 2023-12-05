const express = require('express')
const { getTokenDetails } = require('../controllers/token');
// const { protect } = require('../middleware/auth');

const router = express.Router()

router.route('/fetch-token/:address').get(getTokenDetails);

module.exports = router