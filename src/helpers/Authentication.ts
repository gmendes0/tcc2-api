import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default {
  authenticate(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if (!authorization)
      return response.status(401).json({ message: "undefined token" });

    if (!/^Bearer /.test(authorization))
      return response.status(401).json({ message: "bad token" });

    try {
      jwt.verify(
        authorization.split("Bearer ")[1],
        process.env.JWT_SECRET || ""
      );

      next();
    } catch (error) {
      return response.status(401).json(error);
    }
  },
};
