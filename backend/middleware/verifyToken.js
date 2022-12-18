const jwt = require('jsonwebtoken')
const config = require('../env/config')
const {jwtTokenGenrate}=require('../utils/tokensGenrate')
const verifyRefreshToken= (req, res, next,refreshToken) => {

    // let { refreshToken } = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ error: true, message: 'Token has expired or token is missing' })
    }
    try {
       const decoded=jwt.verify(refreshToken, config.refreshTokenSecret);
        // req.body.accessToken=jwtTokenGenrate({
        //     _id:decoded._id,
        //     email:decoded.email,
        //     role:decoded.role
        // })
    }
    catch (err) {
        {
            return res.status(401).json({ error: true, message: 'Token has expired or token is missing' })
        }
    }
}
const verifyAccessToken = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.query && req.query.token) {
        token = req.query.token;
    }
    if (!token) {
        return res.status(400).json({ message: 'access Token required' })
    }
    try {
        const decoded = jwt.verify(token, config.accessTokenSecretKey);
        req.user = decoded
    } catch (err) {
        //token is expired or missing , lets check if user has refresh token,
        // then issue user new refresh token
        verifyRefreshToken(token,res,next,req.body.refreshToken)
        return next()
        // return res.status(401).json({ error: true, message: 'Token has expired or token is missing' })
    }
    return next()
}
const verifAdmin=(req,res,next)=>{
    const {accessToken}=req.body;
    try{
       const decoded = jwt.verify(accessToken, config.accessTokenSecretKey);
       if(decoded?.role=='Admin'){
        return next()
       }
       else{
        return res.status(400).send('not admin role')
       }
    }
    catch(err){
        return res.send('token invalid or expired')
    }
    
}

module.exports = [verifyAccessToken,verifAdmin];