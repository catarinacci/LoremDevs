import { Request, Response, NextFunction } from "express";
import product from "../models/product";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export async function validateProduct(data: string) {
  
  let dataParams = data;
  let dataIdParams

  console.log(dataParams);

  if (!mongoose.Types.ObjectId.isValid(dataParams)) {

    dataIdParams = ObjectId.createFromBase64('aaaaaaaaaaaaaaaa')
   
  }else{
    dataIdParams = dataParams
  }

  const products = await product.find( {
    $or: [{
        _id: dataIdParams

      },
      {
        name: dataParams
      }
    ]
  })
  return products
}
