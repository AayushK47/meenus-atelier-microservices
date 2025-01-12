import Joi from 'joi';
import { LoginParams, RegisterationParams } from './types'


export const loginParamsDTO = Joi.object<LoginParams>({
  email: Joi.string().email().optional(),
  mobile_number: Joi.string()
    .pattern(/^\d{10}$/)
    .optional(),
  otp: Joi.string().optional(),
}).custom((value, helpers) => {
  const { email, mobile_number, otp } = value

  if (email && mobile_number) {
    return helpers.error('any.invalid', {
      message: 'Only one of email or mobile_number should be present.',
    })
  }

  if (email || mobile_number) {
    if (otp) {
      return helpers.error('any.invalid', {
        message: 'OTP should not be present if email or mobile_number is provided.',
      })
    }
  } else {
    if (!otp) {
      return helpers.error('any.invalid', {
        message: 'Either email, mobile_number, or OTP must be provided.',
      })
    }
  }

  return value
});

export const registerParamsDTO = Joi.object<RegisterationParams>({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().required().valid(Joi.ref('password'))
})