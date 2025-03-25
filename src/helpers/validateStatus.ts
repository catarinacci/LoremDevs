import { Request, Response, NextFunction } from 'express';

export function validateStatus(res:Response, status:string){
   
   if (status == "PAGADO" || status == "CANCELADO") {}
   else{
    res.status(404).json({
      success: false,
      message: "Estado inválido, sus valores son PAGADO o CANCELADO",
    });
    process.exit(1)
  } 
}