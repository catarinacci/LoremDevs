import { Router } from "express";
import { totalSalesDay } from "../../controllers/sale";


const saleRoutes = Router();

// authRoutes.post("/register",register.check, register.do);
// authRoutes.post("/login", login.check, login.do);
// authRoutes.get("/profile", validateJWT, profile.do);
saleRoutes.post("/total-sales-day",totalSalesDay);
export default saleRoutes;