import { compare } from "bcryptjs";
import { AdminLoginParams } from "../types";
import { UnauthorizedError } from "../../shared/errors";
import { sign } from "jsonwebtoken";
import { prisma } from "../../shared/db/connection";

export async function adminLoginService(params: AdminLoginParams) {
  const user = await prisma.user.findFirst({
      where: {
        email: params.email,
        
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