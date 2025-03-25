import { Router } from "express";
import { getProduct} from "../../controllers/product";

const productRoutes = Router();

productRoutes.get("/product/:data", getProduct);

export default productRoutes