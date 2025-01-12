import { Router } from "express";
import { register } from './controller'
const authRouter = Router()

authRouter.post('/register', register)
authRouter.get('/login')

export default authRouter;