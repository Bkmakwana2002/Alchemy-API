const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {

        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.AUTHORIZATION_SECRET_KEY);
            const currentTime = Math.floor(Date.now() / 1000);
            if(decoded.exp < currentTime){
                res.json("Token Expired")
            }
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            res.status(401).send(new Error("Not authorized, token failed"));
            throw new Error("Not authorized, token failed");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
};

module.exports = { protect };