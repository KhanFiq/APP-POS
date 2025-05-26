import Joi from 'joi';

export const userLogin = payload => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });

    return schema.validate(payload);
};
