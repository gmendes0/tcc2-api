import mongoose, { Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  name: string;
  email: string;
  password?: string;
}

export interface IUserDocument extends IUser, mongoose.Document {}

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

schema.pre("save", async function (this: IUserDocument) {
  this.password = await bcrypt.hash(this.password, 10);
});

export const User = mongoose.model<IUserDocument>("User", schema);
