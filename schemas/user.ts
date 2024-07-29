import Joi, { ObjectSchema, StringSchema, NumberSchema } from 'joi';
import { userDetailsSchema } from './user_details';
const value = {
  id: Joi.number().id() as NumberSchema,
  username: Joi.string().min(3).max(30) as StringSchema,
  password: Joi.string().min(6).max(50) as StringSchema,
  // TODO: fix error whit use user_derails
  user_details: userDetailsSchema.update as ObjectSchema
};

export const userSchema = {
  create: Joi.object({
    username: value.username.required(),
    password: value.password.required(),
    userDetail: value.user_details,
  }) as ObjectSchema,
  update: Joi.object({
    username: value.username,
    password: value.password,
    userDetail: value.user_details.required(),
  }) as ObjectSchema,
  get: Joi.object({
    id: value.id.required(),
  }) as ObjectSchema,
  delete: Joi.object({
    id: value.id.required(),
  }) as ObjectSchema
};
export default userSchema;