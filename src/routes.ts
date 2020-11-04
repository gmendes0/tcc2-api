import { Request, Response, NextFunction, Router } from "express";
import BrandController from "./controllers/BrandController";
import UserController from "./controllers/UserController";
import Authentication from "./helpers/Authentication";

const routes = Router();

routes.post("/register", UserController.register);
routes.post("/login", UserController.login);

routes.use("/brands", Authentication.authenticate);
routes.get("/brands", BrandController.index);
routes.post("/brands", BrandController.store);

export { routes };
