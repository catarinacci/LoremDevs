import { Router } from "express";
import { totalSalesDay, totalSalesMonth } from "../../controllers/sale";


const saleRoutes = Router();

// authRoutes.post("/register",register.check, register.do);
// authRoutes.post("/login", login.check, login.do);
// authRoutes.get("/profile", validateJWT, profile.do);
saleRoutes.get("/total-sales-day/:date",totalSalesDay);
saleRoutes.get("/total-sales-month/:date", totalSalesMonth);
export default saleRoutes;