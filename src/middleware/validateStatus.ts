import { Request, Response, NextFunction } from 'express';


export const validateStatus = (req:Request, res:Response, next:NextFunction):void => {

    const status = req.query.status

 
   if (status == "PAGADO" || status == "CANCELADO") {
    next()
   }
   else{
    res.status(404).json({
      success: false,
      message: "Estado inválido, sus valores son PAGADO o CANCELADO",
    });
    return
  } 
}