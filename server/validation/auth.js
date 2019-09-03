import Joi from '@hapi/joi';

class AuthValidation{
    registerValidation(body){
        const schema = {
            name: Joi.String().min(6).required(),
            email: Joi.String().min(6).required().email(),
            password: Joi.String().min(6).required()
        };

        return Joi.validate(body, schema);
    }
    loginValidation(body){
        const schema = {
            email: Joi.String().min(6).required(),
            password: Joi.String().min(6).required()
        };

        return Joi.validate(body, schema);
    }
}

export default AuthValidation;