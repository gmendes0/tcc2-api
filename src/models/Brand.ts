import mongoose from "mongoose";

export interface IBrand {
  name: string;
  email: string;
  status?: boolean;
}

export interface IBrandDocument extends IBrand, mongoose.Document {}

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
});

export const Brand = mongoose.model<IBrandDocument>("Brand", schema);
