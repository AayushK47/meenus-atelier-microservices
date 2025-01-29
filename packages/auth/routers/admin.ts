import { Router } from "express";
import { adminLogin } from "../controllers/admin";

export const adminRouter = Router();

adminRouter.post('/login', adminLogin)