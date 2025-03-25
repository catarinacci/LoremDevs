import { Request, Response, NextFunction } from "express";
import product from "../../models/product";
import { validateProduct } from "../../helpers/validateProduct";

export const getProduct = async(req: Request, res: Response, next: NextFunction)=>{
    const data = req.params.data

    //compruebo si es un id o name para poder realizar la bsqueda
    const product = await validateProduct(res,data)

    res.json({
        products: product
    })
}