import { Schema, model, Document } from "mongoose";

export interface ISale extends Document{
    tenant: string;
    status: string;
    products: string[];
    user: string;
    lastname: string;
    dni:string;
    phone:string;
    postalCode: string;
    address: string;
    paymentId:string;
    createdAt:Date;
    updatedAt:Date;
}


const SaleSchema = new Schema(
  {
    tenant: {
      type: String,
    },
    status: {
      type: String,
    },
    products: {
      type: Array,
    },
    user: {
      type: String,
    },
    lastname: {
      type: String,
    },
    dni: {
    type: String,
    },
    phone: {
    type: String,
    },
    postalCode: {
    type: String,
    },
    address: {
    type: String,
    },
    paymentId: {
    type: String,
    }
},
  {
    collection: "sales",
    timestamps: true,
  }
);

export default model<ISale>("Sale", SaleSchema);