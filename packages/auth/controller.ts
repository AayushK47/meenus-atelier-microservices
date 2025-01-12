import { Request, Response } from "express";
import { getRequestProperties } from '../shared/utils'
import { registerParamsDTO } from "./validators";
import { registerService } from "./services";
import { RegisterationParams } from "./types";

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