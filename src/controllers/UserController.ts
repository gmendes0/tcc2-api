import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUserDocument, User } from "../models/User";

const getJWT = (user: IUserDocument): string | null => {
  try {
    return jwt.sign({ user: user._id }, process.env.JWT_SECRET || "", {
      expiresIn: 60 * 60 * 12,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  async register(request: Request, response: Response) {
    const { name, email, password } = request.body;

    try {
      const user = await User.create({ name, email, password });

      const token = getJWT(user);

      return response.status(201).json({ token });
    } catch (error) {
      return response.status(400).json(error);
    }
  },

  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    try {
      const user = await User.findOne({ email }).select("+password");

      if (user === null)
        return response.status(401).json({ message: "user not found" });

      if (!(await bcrypt.compare(password, user?.password || "")))
        return response
          .status(401)
          .json({ message: "the credentials doesn't match with our register" });

      user.password = undefined;

      const token = getJWT(user);

      return response.status(200).json({ token });
    } catch (error) {
      return response.status(400).json(error);
    }
  },
};
