import { Router } from "express";
import { CreateUserController } from "../modules/user/useCases/createUser/CreateUserController";
import { AuthenticateUserController } from "../modules/user/useCases/authenticateUser/AuthenticateUserController";
import { GetUserProfileController } from "../modules/user/useCases/getUserProfile/GetUserProfileController";
import { UpdateUserProfileController } from "../modules/user/useCases/updateUserProfile/UpdateUserProfileController";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const getUserProfileController = new GetUserProfileController();
const updateUserProfileController = new UpdateUserProfileController();

const userRoutes = Router();

userRoutes.post("/signup", createUserController.handle);
userRoutes.post("/signin", authenticateUserController.handle);
userRoutes.get("/profile/:userId", getUserProfileController.handle);
userRoutes.put("/profile/:userId", updateUserProfileController.handle);

export { userRoutes };
