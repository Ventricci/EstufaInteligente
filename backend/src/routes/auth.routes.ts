import { Router } from "express";
import { AuthenticateUserController } from "../modules/user/useCases/authenticateUser/AuthenticateUserController";

const authenticateUserController = new AuthenticateUserController();

const authRoutes = Router();

authRoutes.post("/signin", authenticateUserController.handle);

export { authRoutes };
