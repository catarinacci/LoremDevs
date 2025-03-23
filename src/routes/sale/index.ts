import { Router } from "express";
import { totalSalesDay, totalSalesMonth } from "../../controllers/sale";


const saleRoutes = Router();

// authRoutes.post("/register",register.check, register.do);
// authRoutes.post("/login", login.check, login.do);
// authRoutes.get("/profile", validateJWT, profile.do);
saleRoutes.post("/total-sales-day",totalSalesDay);
saleRoutes.post("/total-sales-month", totalSalesMonth.check, totalSalesMonth.do);
export default saleRoutes;