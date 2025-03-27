import { Router, Request, Response, NextFunction} from "express";
import { totalSalesDay, totalSalesMonth, ordersStatus } from "../../controllers/sale";
import { validateStatus } from "../../middleware/validateStatus";



const saleRoutes = Router();

// authRoutes.post("/register",register.check, register.do);
// authRoutes.post("/login", login.check, login.do);
// authRoutes.get("/profile", validateJWT, profile.do);
saleRoutes.get("/total-sales-day",totalSalesDay);
saleRoutes.get("/total-sales-month/:date", totalSalesMonth);
saleRoutes.get("/orders-status",validateStatus, ordersStatus);

export default saleRoutes;