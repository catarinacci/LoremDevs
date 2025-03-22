import { Request, Response, NextFunction } from 'express';
import sale from '../../models/sale';

export const totalSalesDay = async (req:Request, res:Response, next:NextFunction)=>{

  const dateBody = req.body.date
  
  const dateInic = new Date (dateBody + 'T00:00:00Z')

  if( isNaN(dateInic.getTime())){

    res.status(404).json({
      success: false,
      message: "Formato de fecha inválido",
    })
  }
    else{
     
      const dateEnd = new Date(dateBody + 'T23:59:59Z')
      const sales = await sale.aggregate
      ([
        {
          $match: {
            createdAt: {
              $gte: dateInic,
              $lte: dateEnd
            }
          }
        },
        {
          $unwind: "$products"
        },
        {
          $group: {
            _id: null,
            totalVentas: {
              $sum: {
                $multiply: [
                  "$products.quantity",
                  "$products.data.price"
                ]
              }
            }
          }
        }
      ]
      )
      

      if(sales.length == 0){
        res.status(200).json({
          success: true,
          message: "No hay ventas el día "+dateBody,
        });
        return
      }res.status(200).json({
        success: true,
        sales:sales
      });

    }
}