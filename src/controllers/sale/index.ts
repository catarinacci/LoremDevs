import { Request, Response, NextFunction } from "express";
import sale from "../../models/sale";
import { isDateNaN } from "../../helpers/isDateNaN";
import { addVal0 } from "../../helpers/addVal0";
import { isMonth12 } from "../../helpers/isMonth12";

export const totalSalesDay = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const dateParamns = req.params.date;
  console.log(dateParamns);

  const dateInic = new Date(dateParamns + "T00:00:00Z");

  if (isNaN(dateInic.getTime())) {
    res.status(404).json({
      success: false,
      message: "Formato de fecha inválido",
    });
  } else {
    const dateEnd = new Date(dateParamns + "T23:59:59Z");
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
        message: "No hay ventas el día " + dateParamns,
      });
      return;
    }
    res.status(200).json({
      success: true,
      sales: sales,
    });
  }
};

export const totalSalesMonth = async (req: Request, res: Response, next: NextFunction) => {
    const arr: string[] = req.params.date.split("-");

    let yearParams = Number(arr[0]);
    const monthParams = Number(arr[1]);
    const page = Number(req.query.p) | 0;
    const pageSize = 10;

    //compruebo si el valor es >=1 y <=9 se le agrega u 0 adelante del nurmero para que coincida con el formato Date y poder crear l objeto
    let month = addVal0(monthParams);

    const dateInic = new Date(yearParams + "-" + month + "-01T00:00:00Z");

    //compruebo si el formato de la fecha tipo Date es valido
    isDateNaN(res, next, dateInic);

    //compruebo si el mes 12 para poder calculal la fecha de fin en la consulta
    const nextDate = isMonth12(Number(month), yearParams);

    console.log("nextDate", nextDate);

    let nextYear = nextDate.year;
    let nextMonth = nextDate.month;

    const dateEnd = new Date(nextYear + "-" + nextMonth + "-01T00:00:00Z");

    const sales = await sale.aggregate([
      {
        $match: {
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
        },
      },
    ]);

    if (sales[0].data.length == 0) {
      res.status(200).json({
        success: true,
        message: "No hay ventas el mes " + yearParams + "-" + month,
      });
      return;
    }else{
      res.status(200).json({
        success: true,
        sales: sales,
      });
      return
    }
};
