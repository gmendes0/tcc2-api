import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { routes } from "./routes";

dotenv.config();

mongoose.connect(process.env.DATABASE_URI || "", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(express.json());
app.use(routes);

app.listen(3333);
