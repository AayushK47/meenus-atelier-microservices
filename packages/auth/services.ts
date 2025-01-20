import { LoginParams, RegisterationParams } from "./types";
import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { prisma } from "../shared/db/connection";
import { ulid } from "ulid";

export async function registerService(params: RegisterationParams) {
  const doesUserExist = await prisma.user.findFirst({
    where: {
      email: params.email
    }
  })
  
  if(doesUserExist) {
    // Return error saying user already exists
    throw {status: 409, message: "User already exists"}
  }

  params.password = await hash(params.password, 10)
  delete params.confirmPassword

  const user = await prisma.user.create({data: {
    ...params,
    ulid: ulid()
  }})

  const token = sign(user, "rdfghjkcfgvhfghgfhg", { expiresIn: '6h' })

  user.password = ""

  return { token, user }
}

export async function loginService(params: LoginParams) {
  const user = await prisma.user.findFirst({
    where: {
      email: params.email
    }
  })

  if(!user) {
    throw {status: 401, message: "Invalid credentials"}
  }

  const doesPasswordMatch = await compare(params.password, user?.password || "")

  if(!doesPasswordMatch) {
    throw { status: 401, message: "Invalid credentials" }
  }


  const token = sign(user, "rdfghjkcfgvhfghgfhg", { expiresIn: '6h' })

  return { token }
}