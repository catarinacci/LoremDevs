import { Request, Response, NextFunction } from "express";
import product from "../models/product";
import mongoose from "mongoose";

export async function validateProduct(res: Response, data: string) {
  const dataParams = data;
  let responseProduct: any;
  let type: string = "";

  console.log(dataParams);

  if (mongoose.Types.ObjectId.isValid(dataParams)) {
    const responseId = await product.find({ _id: dataParams });
    if (responseId.length == 0) {
      responseProduct = [];
    } else {
      responseProduct = responseId[0]._id;
      type = "_id";
      console.log("_id", responseId);
    }
  } else {
    const responseName = await product.find({ name: dataParams });
    
    if (responseName.length == 0) {
      responseProduct = [];
    } else {
      responseProduct = responseName[0].name;
      type = "name";
      console.log("name", responseName)
    }
    
  }
  console.log(responseProduct.length);

  if (responseProduct.length == 0) {
    res.json({
      messaje: "No hay productos con ese id o name",
    });
    process.exit(1);
  } else {
    return {
      type: type,
      data: responseProduct,
    };
  }

  //return responseProduct
}
