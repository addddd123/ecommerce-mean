
const userModel = require('../../models/Auth/userSchema')
const tokenModel = require('../../models/Auth/tokenSchema')
const loginDetails = require('../../models/logs/loginHistory')
const { statusCodes, genrateError } = require('../../utils/errorHandler')
const jwt = require('jsonwebtoken')
const config = require('../../env/config')
const bcrypt = require('bcrypt');
const token = require('../../utils/tokensGenrate');
const { registerUserValidation } = require('../../utils/validations')

const { default: mongoose } = require('mongoose');

const { tokensGenrate } = require('../../utils/tokensGenrate')
exports.login = async (req, res, next) => {
    try {
        console.log(req.body)
        if (!req.body.email || !req.body.password)
            throw genrateError('Email or Password is missing', statusCodes.Bad_Request)
        const { email, password } = req.body
        let matchQuery = { email: email, password: password };
        let prjection = { password: 0, emailverificationToken: 0 }
        const isUser = await userModel.findOne(matchQuery, prjection)
        if (!isUser) {
            throw genrateError('User Name or Password is Invalid', statusCodes.Unauthorized)
        }
        else {
            if (!isUser.isEmailVerified) {
                throw genrateError('Account Not Verified', statusCodes.Unauthorized)
            }

            const signData = {
                _id: isUser?._id,
                email: isUser?.email,
                name: isUser?.firstName + ' ' + isUser?.lastName,
                role: isUser?.role
            }

            // cookiesArray.forEach((cookie) => {
            //     const [key, value] = cookie.trim().split('=');
            //     cookies[key] = value;
            // });

            const { accessToken, encryptedRefreshToken, refreshToken } = await tokensGenrate(signData)

            const userRefreshToken = await tokenModel.findOneAndUpdate({ userId: mongoose.Types.ObjectId(isUser?._id) },
                {
                    $set: {
                        refreshToken: encryptedRefreshToken
                    }
                },
                { upsert: true }
            )
            //save ip and date time of logged in user
            await loginDetails.findOneAndUpdate({ userId: mongoose.Types.ObjectId(isUser?._id) },
                {

                    userId: mongoose.Types.ObjectId(isUser?._id),

                    $push: { "loginHistory": { ipAddress: req.ip } }
                },

                { safe: true, upsert: true, new: true })


            res.cookie("accessToken", accessToken, config.accessTokenCookieExpiry)
            res.cookie("refreshToken", refreshToken, config.refreshTokenCookieExpiry)
            return res.json({ message: 'logged in successfully', user: isUser, refreshToken, accessToken })



        }
    }
    catch (err) {
        next(err)
    }
}

exports.register = async (req, res, next) => {
    try {
        const { error } = registerUserValidation(req.body);
        if (error) {
            throw genrateError(error.message, statusCodes.Bad_Request);;
        }
        const { role } = req.body;
        let userCount = await userModel.find().count()
        if (role == 'admin' && userCount) {
            throw genrateError('You cant register as Admin', statusCodes.Bad_Request)
        }
        let user = new userModel(req.body)
        user = await user.save()
        let jwtSigningData = {
            _id: user._id,
            email: user.email,
            role: user.role,
        }

        const emailverificationToken = jwt.sign(jwtSigningData, config.emailVerificationSecret, config.emailVerificationExpiry);
        res.status(statusCodes.OK).json({ message: 'user saved successfully', verificationLink: `http://localhost:3000/auth/verify-email/${emailverificationToken}` });
    }
    catch (err) {
        console.log(err)
        next(err)
    }
}

exports.verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.params
        //decode token
        let decodedToken;
        jwt.verify(token, config.emailVerificationSecret, (err, payload) => {
            if (err) {
                throw genrateError(err.message, statusCodes.Bad_Request)
            }
            if (payload) {
                decodedToken = payload
            }
        })
        const isUser = await userModel.findOne({ email: decodedToken.email });
        if (!isUser) throw genrateError("Link is invalid", statusCodes.Bad_Request);
        if (isUser.isEmailVerified) {
            return res.render('accountVerified.ejs', {
                data: {
                    name: isUser.firstName + ' ' + isUser.lastName,
                    message: 'Account is Already Verified'
                }
            })

        }
        await userModel.findOneAndUpdate({ email: decodedToken.email }, {
            $set: {
                isEmailVerified: true
            }
        })
        //genrate tokens
        const { accessToken, encryptedRefreshToken } = await tokensGenrate({
            _id: isUser._id,
            email: isUser.email,
        })
        //save encrypted refresht token in db
        let refToken = new tokenModel({ userId: isUser._id, refreshToken: encryptedRefreshToken })
        const { refresthToken } = await refToken.save()

        return res.render('accountVerified.ejs', {
            data: {
                name: isUser.firstName + ' ' + isUser.lastName,
                message: 'Account is  Verified'
            }
        });

    }
    catch (err) {
        next(err)
    }
}

exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body
        if (!email) {
            throw genrateError("Email required ", statusCodes.Bad_Request)
        }
        const isUser = await userModel.findOne({ email: email })
        if (!isUser) {
            throw genrateError("Email Not Found", statusCodes.Bad_Request)
        }
        let signData = {
            id: isUser._id,
            email: isUser.email
        }
        const resetPasswordToken = token.jwtTokenGenrate(signData, config.resetPasswordTokenSecretKey)
        const resetPasswordUrl = `http://localhost:3000/auth/reset-password?resetPasswordToken=${resetPasswordToken}`
        return res.status(statusCodes.OK).json({ url: resetPasswordUrl })


    }
    catch (err) {
        next(err)
    }

}

exports.resetPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const { resetPasswordToken } = req.query;
        if (!password) {
            throw genrateError("password not entered", statusCodes.Bad_Request)
        }
        if (!resetPasswordToken) {
            throw genrateError("Token missing", statusCodes.Bad_Request)
        }
        const val = jwt.verify(resetPasswordToken, config.resetPasswordTokenSecretKey)
        const _id = val.id
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            throw genrateError("object id not valid", statusCodes.Bad_Request)
        }
        const user = await userModel.findByIdAndUpdate(mongoose.Types.ObjectId(_id), {
            $set: {
                password: password
            }
        },)
        return res.status(statusCodes.OK).json({ message: 'password changed' })

    }
    catch (err) {
        next(err)
    }
}

exports.refreshToken = async (req, res) => {

}
