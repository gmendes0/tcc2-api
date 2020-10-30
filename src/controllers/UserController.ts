import { Request, Response } from "express";
import { User } from "../models/User";

export default {
  async register(request: Request, response: Response) {
    const { name, email, password } = request.body;

    try {
      const user = await User.create({ name, email, password });

      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json(error);
    }
  },
};
