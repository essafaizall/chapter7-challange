const jwt = require('jsonwebtoken')

const generateJwtToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY)
}

const verifyJwtToken = (token) =>{
    return jwt.verify(token, process.env.SECRET_KEY)
}

module.exports = {
    generateJwtToken,
    verifyJwtToken
}