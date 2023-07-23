import Joi from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const inventorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  quantity: Joi.number(),
  price: Joi.number(),
});
