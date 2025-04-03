import { Schema, model, Document } from "mongoose";

export interface IUser extends Document{
  name: string;
  lastname: string;
  password: string;
  email: string;
  image: string;
  tokenResetPass: string | null;
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    image: {
      type: String,
    },
    tokenResetPass:{
      type: String,
      defaul: null
    }
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export default model<IUser>("User", UserSchema);