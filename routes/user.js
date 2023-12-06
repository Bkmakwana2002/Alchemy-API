const express = require('express')
const { authUser,registerUser } = require('../controllers/user')

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(authUser)

module.exports = router