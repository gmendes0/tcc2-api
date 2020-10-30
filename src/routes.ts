import { Request, Response, Router } from "express";
import UserController from "./controllers/UserController";

const routes = Router();

routes.post("/register", UserController.register);

export { routes };
