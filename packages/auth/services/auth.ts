import { LoginParams, RegisterationParams } from "../types";
import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { prisma } from "../../shared/db/connection";
import { ulid } from "ulid";
import { ConflictError } from "../../shared/errors/conflict";
import { UnauthorizedError } from "../../shared/errors";

export async function registerService(params: RegisterationParams) {
  const doesUserExist = await prisma.user.findFirst({
    where: {
      email: params.email
    }
  })
  
  if(doesUserExist) {
    // Return error saying user already exists
    throw new ConflictError("User already exists")
  }

  params.password = await hash(params.password, 10)
  delete params.confirmPassword

  const user = await prisma.user.create({data: {
    ...params,
    ulid: ulid()
  }})

  const token = sign(
    user, 
    process.env.JWT_SECRET || 'secret', 
    { expiresIn: process.env.JWT_EXPIRY || '6h' })

  user.password = ""

  return { token, user }
}

export async function loginService(params: LoginParams) {
  const user = await prisma.user.findFirst({
    where: {
      email: params.email
    }
  })

  const doesPasswordMatch = await compare(params.password, user?.password || "")

  if(!user || !doesPasswordMatch) {
    throw new UnauthorizedError('Invalid credentials')
  }

  const token = sign(
    user, 
    process.env.JWT_SECRET || 'secret', 
    { expiresIn: process.env.JWT_EXPIRY || '6h' }
  )

  return { token }
}