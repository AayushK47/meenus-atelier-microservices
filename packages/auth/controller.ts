import { Request, Response } from "express";
import { getRequestProperties } from '../shared/utils'
import { loginParamsDTO, registerParamsDTO } from "./validators";
import { loginService, registerService } from "./services";
import { LoginParams, RegisterationParams } from "./types";

export async function register(req: Request, res: Response) {
  const { body } = getRequestProperties(req)

  let { error, value } = registerParamsDTO.validate(body);

  if(error) {
    res.status(422).json({
      'errors': error.details
    })
    return
  }

  value = value as RegisterationParams

  const result = await registerService(value)

  res.status(201).json(result)
}

export async function login(req: Request, res: Response) {
  const { body } = getRequestProperties(req)

  let { error, value } = loginParamsDTO.validate(body);

  if(error) {
    res.status(422).json({
      'errors': error.details
    })
    return
  }

  value = value as LoginParams

  const result = await loginService(value)

  res.status(200).json(result)
}