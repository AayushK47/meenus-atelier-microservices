import { RegisterationParams } from "./types";
import { hash } from 'bcrypt'

export async function registerService(params: RegisterationParams) {
  params.password = await hash(params.password, 10)

  return params
}