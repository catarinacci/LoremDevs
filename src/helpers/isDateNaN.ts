import { Request, Response, NextFunction } from 'express';

export function isDateNaN(res:Response,next:NextFunction, date:Date){
   let dateInic = date
  
   if (isNaN(dateInic.getTime())) {
    res.status(404).json({
      success: false,
      message: "Formato de fecha inválido",
    });
    process.exit(1)
  } 
}