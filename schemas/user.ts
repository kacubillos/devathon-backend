import Joi, { ObjectSchema, StringSchema, NumberSchema } from 'joi';
import { userDetailsSchema } from './user_detalis';
const value = {
  id: Joi.number().id() as NumberSchema,
  username: Joi.string().min(3).max(30) as StringSchema,
  password: Joi.string().min(6).max(50) as StringSchema,
  user_details: userDetailsSchema.update as ObjectSchema
};

const userSchema = {
  create: Joi.object({
    id: value.id.required(),
    username: value.username.required(),
    password: value.user_details
  }) as ObjectSchema,
  update: Joi.object({
    id: value.id.required(),
    username: value.username,
    password: value.user_details
  }) as ObjectSchema,
  get: Joi.object({
    id: value.id.required(),
  }) as ObjectSchema,
  delete: Joi.object({
    id: value.id.required(),
  })
};
export default userSchema;