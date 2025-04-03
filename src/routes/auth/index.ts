import { Router } from "express";
import { register,login,profile, showUsers, forgotPassword } from "../../controllers/auth";
import { validateJWT } from "../../middleware/validateJWT";

const authRoutes = Router();

authRoutes.post("/register",register.check, register.do);
authRoutes.post("/login", login.check, login.do);
authRoutes.get("/profile", validateJWT, profile.do);
authRoutes.get("/show-users",showUsers);
authRoutes.put("/forgot-password", forgotPassword.check, forgotPassword.do);
export default authRoutes;