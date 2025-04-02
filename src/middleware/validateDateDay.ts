import { Request, Response, NextFunction } from "express";

export const validateDateDay = (res: Response, date: string): void | Date => {
  
  try {

    const dateInic = new Date(date + "T00:00:00Z");

    if (isNaN(dateInic.getTime())) {

      const error = new Error("Formato de fecha inválido");
      throw error;
      //return;
    } else {
      return dateInic;
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error+"",
    });
    return;
  }
};
