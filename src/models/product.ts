import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  status: string[];
  images: string[];
  description: string;
  stock: number;
  discount: number;
  features: [];
  tags: [];
  tenant: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    status: {
      type: Array,
    },
    images: {
      type: Array,
    },
    description: {
      type: String,
    },
    stock: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    features: {
      type: Array,
    },
    tags: {
      type: Array,
    },
    tenant: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  {
    collection: "products",
    timestamps: true,
  }
);
export default model<IProduct>("products", ProductSchema);