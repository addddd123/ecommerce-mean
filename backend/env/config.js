module.exports={
    connectionString:"mongodb://127.0.0.1:27017/E-COM",
    accessTokenSecretKey:"!jwt#hard*values||",
    emailVerificationSecret:'343@@@00000***',
    accessTokenCookieExpiry:{
        httpOnly:true,
        maxAge:24*60*60*1000,
        sameSite: 'None'
      
    },
    refreshTokenCookieExpiry:{
        httpOnly:true,
        maxAge:365*24*60*60*1000,
        sameSite: 'None'
      
    },
    refreshTokenExpiry:{
        expiresIn:'365d'
    },
    accessTokenExpiry:{
        expiresIn:'15m'
    },
    emailVerificationExpiry:{
        expiresIn:'60m'
    },
    refreshTokenSecret:'@#****re-freshtoken',
    resetPasswordTokenExpiry:{
        expiresIn:'60m'
    },
    resetPasswordTokenSecretKey:'uweoirueworuiewosdlfjsdl23@@@@'
}