// const jwt = require('jsonwebtoken')
import jwt from 'jsonwebtoken';
// const dotenv = require("dotenv");
import dotenv from 'dotenv';

dotenv.config();
const secretOrPublicKey = process.env.SECRET_JWT_KEY;

class SimpleJWT {
    decode(token) {
        console.log('token', token)
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

export default {
    SimpleJWT
}