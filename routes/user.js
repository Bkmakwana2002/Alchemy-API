const express = require('express')
const { authUser,registerUser,loginMetamask,getNonce } = require('../controllers/user')

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(authUser)
router.route('/login-metamask').post(loginMetamask)
router.route('/nonce').get(getNonce)

module.exports = router