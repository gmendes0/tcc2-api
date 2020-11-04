import { NextFunction, Request, Response } from "express";
import { Brand } from "../models/Brand";

export default {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const brands = await Brand.find();

      return response.status(200).json(brands);
    } catch (error) {
      return response.status(500).json(error);
    }
  },

  async store(request: Request, response: Response) {
    const { name, email } = request.body;

    try {
      const brand = await Brand.create({ name, email });

      return response.status(201).json(brand);
    } catch (error) {
      return response.status(400).json(error);
    }
  },
};
