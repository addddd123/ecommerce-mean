const jwt = require('jsonwebtoken')
const config = require('../env/config')
const bcrypt=require('bcrypt')
module.exports.jwtTokenGenrate = (tokenSignData) => {
    return jwt.sign(tokenSignData, config.accessTokenSecretKey, config.resetPasswordTokenExpiry)
}

module.exports.tokensGenrate = async (singData) => {
    try {
        const accessToken = jwt.sign(singData, config.accessTokenSecretKey, config.accessTokenExpiry)
        let refreshToken = jwt.sign(singData, config.refreshTokenSecret, config.refreshTokenExpiry)
        let saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const encryptedRefreshToken = await bcrypt.hash(refreshToken, salt)
        return {accessToken,encryptedRefreshToken,refreshToken}
    }
    catch (err) {
        console.log(err, 'err in tokens genrate')
    }
}