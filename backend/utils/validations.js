
const Joi = require('joi');

exports.registerUserValidation = (body) => {
   try{
    const schema = Joi.object({
        firstName: Joi.string()
            .min(3)
            .max(30)
            .required(),
        lastName: Joi.string()
            .min(3)
            .max(30)
            .required(),
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','in'] } }),
        password:Joi.string()
        .alphanum()
        .min(5)
        .max(30)
        .required(),

        phoneNumber:
            Joi.allow(),
        //     joi.string(),
                // .regex(/^[0-9]{10}$/)
                // .messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required()
        address:
        Joi.allow(),
        //     Joi.array()


    })
    return schema.validate(body)
   }
   catch(err){
        console.log(err)
   }
}



