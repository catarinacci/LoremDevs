import { Request, Response, NextFunction } from "express";
import sale from "../../models/sale";
import { validateDateDay } from "../../middleware/validateDateDay";
import { validateDateMonth } from "../../middleware/validateDateMonth";

export const totalSalesDay = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dateQuery = req.query.date;

  const dateInic = validateDateDay(res, dateQuery as string);

  const dateEnd = new Date(dateQuery + "T23:59:59Z");

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

  if (sales.length === 0) {
    
    if (!res.headersSent) {
       
      res.status(200).json({
        success: true,
        sales: sales,
      });
      return;
    }
  }
  if (!res.headersSent) {
    
    res.status(200).json({
      success: true,
      sales: sales,
    });
  }
};

export const totalSalesMonth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const monthQuery = req.query.date as string
  const page = Number(req.query.p) | 0;
  const pageSize = 10;

  
  const dateMonth = validateDateMonth(res,monthQuery)

  const sales = await sale.aggregate([
    {
      $match: {
        createdAt: {
          $gte: dateMonth.inic,
          $lt: dateMonth.end,
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
    
    if (!res.headersSent) {
    res.status(200).json({
      success: true,
      sales: sales,
    });
    return;
  }
  } else {
    
    res.status(200).json({
      success: true,
      sales: sales,
    });
    return;
  }
};

export const ordersStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = req.query.status;
  const page = Number(req.query.p) | 0;
  const pageSize = 10;

  const sales = await sale.aggregate([
    {
      $match: {
        status: status,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $facet: {
        metadata: [{ $count: "count" }],
        data: [{ $skip: page * pageSize }, { $limit: pageSize }],
      },
    },
  ]);
  res.status(200).json({
    status: status,
    sales: sales,
  });
};
