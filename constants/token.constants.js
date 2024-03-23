const dotenv = require("dotenv");
const { getBaseURl } = require('../utils/api.utils');
dotenv.config();

const TOKENS_URL = {
    REGISTERED_USER: `${process.env.PROTOCOL}://${getBaseURl()}:${process.env.PORT}/api/users/`,
}

module.exports = {
    TOKENS_URL
}