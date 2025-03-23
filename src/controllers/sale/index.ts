import { Request, Response, NextFunction } from "express";
import sale from "../../models/sale";
import * as Joi from "joi";
import { validateBodySales } from "../../helpers/validateBodySales";

export const totalSalesDay = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dateBody = req.body.date;

  const dateInic = new Date(dateBody + "T00:00:00Z");

  if (isNaN(dateInic.getTime())) {
    res.status(404).json({
      success: false,
      message: "Formato de fecha inválido",
    });
  } else {
    const dateEnd = new Date(dateBody + "T23:59:59Z");
    const sales = await sale.aggregate([
      {
        $match: {
          createdAt: {
            $gte: dateInic,
            $lte: dateEnd,
          },
        },
      },
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: null,
          totalVentas: {
            $sum: {
              $multiply: ["$products.quantity", "$products.data.price"],
            },
          },
        },
      },
    ]);

    if (sales.length == 0) {
      res.status(200).json({
        success: true,
        message: "No hay ventas el día " + dateBody,
      });
      return;
    }
    res.status(200).json({
      success: true,
      sales: sales,
    });
  }
};

export const totalSalesMonth = {
  check: (req: Request, res: Response, next: NextFunction) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const schema = Joi.object({
      year: Joi.number()
        .required()
        .min(2023)
        .max(currentYear as number),
      month: Joi.number().required().min(1).max(12),
    });

    validateBodySales(req, next, res, schema);
  },
  do: async (req: Request, res: Response, next: NextFunction) => {
    let yearBody: number = req.body.year as number;
    const monthBody = req.body.month;

    const dateInic = new Date(yearBody + "-" + monthBody + "-01T00:00:00Z");

    if (isNaN(dateInic.getTime())) {
      res.status(404).json({
        success: false,
        message: "Formato de fecha inválido",
      });
    } else {

      const page = 0; // Número de página que deseas obtener
      const pageSize = 10; // Número de elementos por página

      if (monthBody == 12) {
        let nextYear = Number(yearBody) + 1;
        let nextMonth = 0o1;
        const dateEnd = new Date(
          nextYear + "-" + "0" + nextMonth + "-01T00:00:00Z"
        );
        // console.log(nextYear)
        // console.log(nextMonth)
        // console.log("dateEndIgual12",dateEnd)
        const sales = await sale.aggregate([
          {
            $match:
              {
                createdAt: {
                  $gte: dateInic,
                  $lt: dateEnd,
                },
              },
          },
          {
            $unwind: "$products",
          },
          {
            $group: {
              _id: {
                $dayOfMonth: "$createdAt",
              },
              totalVentas: {
                $sum: {
                  $multiply: ["$products.quantity", "$products.data.price"],
                },
              },
            },
          },
          {
            $sort: {
              _id: 1,
            },
          },
          {
            $facet: {
              metadata: [{ $count: "count" }],
              data: [{ $skip: page * pageSize }, { $limit: pageSize }],
            }
          }
          // {
          //   $skip: (page - 1) * pageSize,
          // },
          // {
          //   $limit: pageSize,
          // },
        ]);
        if (sales.length == 0) {
          res.status(200).json({
            success: true,
            message: "No hay ventas el día ",
          });
          return;
        }
        res.status(200).json({
          success: true,
          sales: sales,
        });
      } else {
        let nextYear:number = Number(yearBody);
        let nextMonth = Number(monthBody) + 1;
         console.log(nextYear)
        console.log(nextMonth)
        const dateEnd = new Date(nextYear + "-"+ "0"+nextMonth + "-01T00:00:00Z");
      
        console.log("datEndDif12", dateEnd);
        const sales = await sale.aggregate([
          {
            $match:
              {
                createdAt: {
                  $gte: dateInic,
                  $lt: dateEnd,
                },
              },
          },
          {
            $unwind: "$products",
          },
          {
            $group: {
              _id: {
                $dayOfMonth: "$createdAt",
              },
              totalVentas: {
                $sum: {
                  $multiply: ["$products.quantity", "$products.data.price"],
                },
              },
            },
          },
          {
            $sort: {
              _id: 1,
            },
          },
          {
            $facet: {
              metadata: [{ $count: "count" }],
              data: [{ $skip: page * pageSize }, { $limit: pageSize }],
            }
          }
           
          // {
          //   $skip: (page - 1) * pageSize,
          // },
          // {
          //   $limit: pageSize,
          // },
        ]);
        if (sales.length == 0) {
          res.status(200).json({
            success: true,
            message: "No hay ventas el día ",
          });
          return;
        }
        res.status(200).json({
          success: true,
          sales: sales,
        });
      }
      console.log("dateInic", dateInic);
      // res.json({
      //   messaje:"ventas mensuales" + dateInic
      // })
    }
  },
};
