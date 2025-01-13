import { LoginParams, RegisterationParams } from "./types";
import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

export async function registerService(params: RegisterationParams) {
  params.password = await hash(params.password, 10)

  return params
}

export async function loginService(params: LoginParams) {
  const doesPasswordMatch = await compare(params.password, "")

  const token = sign({}, "rdfghjkcfgvhfghgfhg", { expiresIn: '6h' })

  return { token }
}