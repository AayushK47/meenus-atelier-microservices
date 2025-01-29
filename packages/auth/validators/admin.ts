import Joi from "joi";
import { AdminLoginParams, LoginParams } from "../types";

export const adminLoginParamsDTO = Joi.object<AdminLoginParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
})