const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");

dotenv.config();
const secretOrPublicKey = process.env.SECRET_JWT_KEY;

class SimpleJWT {
    decode(token) {
        return jwt.decode(token);
    }

    encode(data) {
        return jwt.sign(data, secretOrPublicKey);
    }

    validate(token) {
        try {
            jwt.verify(token, secretOrPublicKey);
            return true;
        } catch (e) {
            return false;
        }
    }
}

module.exports = SimpleJWT