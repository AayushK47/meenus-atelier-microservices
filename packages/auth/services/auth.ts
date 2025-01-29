import { LoginParams, RegisterationParams } from "../types";
import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { prisma } from "../../shared/db/connection";
import { ulid } from "ulid";
import { ConflictError } from "../../shared/errors/conflict";
import { UnauthorizedError } from "../../shared/errors";

export async function registerService(params: RegisterationParams, role: string = 'user', sendToken: boolean = true) {
  const doesUserExist = await prisma.user.findFirst({
    where: {
      email: params.email,
      AND: {
        role
      }
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
  
  user.password = ""

  if(!sendToken) {
    return user
  }

  const token = sign(
    user, 
    process.env.JWT_SECRET || 'secret', 
    { expiresIn: process.env.JWT_EXPIRY || '6h' }
  )

  return { token, user }
}

export async function loginService(params: LoginParams, role: string = 'user') {
  const user = await prisma.user.findFirst({
    where: {
      email: params.email,
      AND: {
        role
      }
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