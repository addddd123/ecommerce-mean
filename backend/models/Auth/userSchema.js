const { date, string } = require('joi');
let mongoose = require('mongoose');
let userSchema = new mongoose.Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String, unique: true },
        password: { type: String },
        phoneNumber: { type: String },
        role: {
            type: String,
            enum: ['admin', 'seller', 'customer'],
            default: 'customer'
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        emailverificationToken: { type: String, default: undefined },
        address: [
            {
                addressType: {
                    type: String,
                    enum: ['Home', 'Office'],
                    default: 'Home'
                },
                state: String,
                city: String,
                pinCode: String,
            }
        ],
        
    }
);

module.exports = mongoose.model('userModel', userSchema)