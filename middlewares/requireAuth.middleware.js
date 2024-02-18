const Cryptr = require('cryptr')
const User = require('../api/user/user.model')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')
const SimpleJWT = require("../services/jwt.service")
const mongoose = require("mongoose")

function validateToken(req, res, next) {
    const token = req.cookies.loginToken
    if (!token) return res.status(401).json({ status: 'error', message: "You are not authenticated!" })

    const json = cryptr.decrypt(req.cookies.loginToken)
    const loggedInUser = JSON.parse(json)

    req.user = loggedInUser;

    if (loggedInUser) return next()
    return res.status(401).json({ status: 'error', message: "You are not authenticated!" });
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({ status: 'error', message: "You are not allowed to do that!" });
        }
    });
};

const verifyToken = async (req, res, next) => {
    try {
        const jwtInstance = new SimpleJWT()
        let token = req.headers['authorization'] || req.headers['Authorization']
        if (!token) return res.status(403).json({ status: 'error', message: "You are not authenticated" });

        const tokenIndex = token.indexOf("Bearer ");
        if (tokenIndex === -1) return res.status(403).json({ status: 'error', message: "You are not authenticated" });

        token = token.slice(tokenIndex + 7);
        const decoded = jwtInstance.decode(token)

        if (!decoded.userId) return res.status(401).json({ status: 'error', message: "Authentication failed: no token found" });

        const authenticatedUser = await User.findOne({ '_id': mongoose.Types.ObjectId(decoded.userId) })

        req.user = { _id: authenticatedUser._id, isAdmin: authenticatedUser.isAdmin };
        next();
    } catch (err) {
        return res.status(401).json({ status: 'error', message: 'Authentication failed: invalid token' });
    }
};

module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
    validateToken,
};

