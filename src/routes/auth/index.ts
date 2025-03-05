import { Router } from "express";
import { register } from "../../controllers/auth";

const authRoutes = Router();

//authRoutes.post("/register", register.check, register.do);
authRoutes.post("/register",register.check, register.do);
export default authRoutes;