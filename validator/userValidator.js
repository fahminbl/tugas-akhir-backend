import Joi from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string(),
});
