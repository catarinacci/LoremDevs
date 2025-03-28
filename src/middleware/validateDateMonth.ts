import { Request, Response, NextFunction } from "express";
import dayjs, { Dayjs } from "dayjs";

export interface IDate{
    inic:Date|string;
    end:Date|string
}

export const validateDateMonth = (res: Response, date: string):IDate  => {
  
  try {
    const dateDayjs = dayjs(date,'YYYY-MM-DD')
    const dateInic = new Date(dateDayjs.toDate());
    const dateEnd = new Date (dateDayjs.add(1, 'month').toDate())

    if (isNaN(dateInic.getTime())) {

      const error = new Error("Formato de fecha inválido");
      throw error;

    } else {
      return {
        inic:dateInic,
        end:dateEnd
      };
   }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error+"",
    });
    return {
        inic:"",
        end:""
      };;
  }
};
