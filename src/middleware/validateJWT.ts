import { Request,NextFunction,Response } from "express";
import jwt from "jsonwebtoken";

interface IPayload{
  _id:string;
  iat:number;
  exp:number
}

export const validateJWT = (req:Request, res:Response, next:NextFunction):void => {

    const bearerToken: string | undefined = req.headers.authorization;
    //console.log("barer",bearerToken)
    
  if (bearerToken) {
    const token: string| undefined= req.headers.authorization?.split(" ")[1];
    //console.log("token",token)
    try {
      const uid = jwt.verify(token as string, process.env.SECRETORPRIVATEKEY as string)as IPayload; 
      req.userId = uid._id
      //console.log("uid",uid)   
      next();
    } catch (error) {
      console.log("error", error);
      res.status(401).json({
        success: false,
        message: "Token no válido",
      });
      return 
    }
  } else {
     res.status(401).json({
      success: false,
      message: "No hay token en la petición",
    });
    return
  }
};