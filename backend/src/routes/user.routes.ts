import { Router } from "express";
import { CreateUserController } from "../modules/user/useCases/createUser/CreateUserController";
import { AuthenticateUserController } from "../modules/user/useCases/authenticateUser/AuthenticateUserController";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

const userRoutes = Router();

userRoutes.post("/signup", createUserController.handle);
userRoutes.post("/signin", authenticateUserController.handle);

export { userRoutes };
