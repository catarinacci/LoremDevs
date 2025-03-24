import { Router } from "express";
import { totalSalesDay, totalSalesMonth, ordersStatus } from "../../controllers/sale";


const saleRoutes = Router();

// authRoutes.post("/register",register.check, register.do);
// authRoutes.post("/login", login.check, login.do);
// authRoutes.get("/profile", validateJWT, profile.do);
saleRoutes.get("/total-sales-day/:date",totalSalesDay);
saleRoutes.get("/total-sales-month/:date", totalSalesMonth);
saleRoutes.get("/orders-status/:status", ordersStatus);

export default saleRoutes;