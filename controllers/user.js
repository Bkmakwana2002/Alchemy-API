const generateToken = require('../generateToken')
const User = require('../models/user')
const crypto = require('crypto');
const ethers = require('ethers');

exports.registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body

        let user = await User.findOne({ email })
        if (user) {
            return res.status(404).send({ success: false, message: 'User already exists' })
        }

        user = await User.create({
            name,
            email,
            password
        })
        const token = await generateToken(user._id)

        if (res.status(201)) {
            res.json({
                success: true,
                _id: user._id,
                name: user.name,
                email: user.email,
                token: token
            })
        }

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

exports.authUser = async (req, res) => {
    try {

        const { email, password } = req.body
        const user = await User.findOne({ email }).select('+password')

        if (user && ((await user.matchPassword(password)))) {
            res.status(201).send({
                success: true,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            })
        }
        else {
            res.status(401);
            throw new Error("Wrong Email or Password");
        }


    } catch (error) {

        res.status(500).send({
            success: false,
            message: error.message,

        })

    }
}

exports.getNonce = (req, res) => {
    const nonce = crypto.randomBytes(32).toString('hex')
    res.status(200).json({ nonce })
}

exports.loginMetamask = async(req, res) => {
    const { signedMessage, message, address } = req.body;
    try {
        const recoveredAddress = await ethers.utils.verifyMessage(message, signedMessage);
        if (recoveredAddress !== address) {
            return res.status(401).json({ error: 'Invalid signature' });
        }
        const token = await generateToken(address)
        res.status(200).json({token});
    } catch (error) {
        res.send(error).status(500)
    }
}

exports.verifyMetamask = (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token,  process.env.AUTHORIZATION_SECRET_KEY);
        console.log(decoded)
        const currentTime = Math.floor(Date.now() / 1000);
        // console.log(currentTime)
        // if (decoded.exp < currentTime) {
        //     res.json("tokenExpired");
        // } else {
        //     res.json("ok");
        // }
        res.json("ok")
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
}