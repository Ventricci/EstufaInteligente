import { Router } from "express";
import { CreateUserController } from "../modules/user/useCases/createUser/CreateUserController";
import { AuthenticateUserController } from "../modules/user/useCases/authenticateUser/AuthenticateUserController";
import { GetUserProfileController } from "../modules/user/useCases/getUserProfile/GetUserProfileController";
import { UpdateUserProfileController } from "../modules/user/useCases/updateUserProfile/UpdateUserProfileController";
import { DeleteUserController } from "../modules/user/useCases/deleteUser/DeleteUserController";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const getUserProfileController = new GetUserProfileController();
const updateUserProfileController = new UpdateUserProfileController();
const deleteUserController = new DeleteUserController();

const userRoutes = Router();

userRoutes.post("/signup", createUserController.handle);
userRoutes.post("/signin", authenticateUserController.handle);
userRoutes.get("/profile/:userId", getUserProfileController.handle);
userRoutes.put("/profile/:userId", updateUserProfileController.handle);
userRoutes.delete("/profile/:userId", deleteUserController.handle);

export { userRoutes };
