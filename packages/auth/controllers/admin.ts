import { NextFunction, Request, Response } from "express";
import { getRequestProperties } from '../../shared/utils';
import { adminLoginParamsDTO } from "../validators";
import { AdminLoginParams } from "../types";
import { ValidationError } from "../../shared/errors";
import { loginService } from "../services";


export async function adminLogin(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = getRequestProperties(req)
  
    let { error, value } = adminLoginParamsDTO.validate(body, { 
      abortEarly: false 
    });
  
    if(error) {
      throw new ValidationError(JSON.stringify({
        'errors': error.details
      }))
    }
  
    value = value as AdminLoginParams
  
    const result = await loginService(value, 'admin')
  
    res.status(200).json(result)
  } catch(error) {
    next(error)
  }
}