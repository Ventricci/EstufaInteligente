import { Router } from "express";
import { CreateUserController } from "../modules/user/useCases/createUser/CreateUserController";
import { AuthenticateUserController } from "../modules/user/useCases/authenticateUser/AuthenticateUserController";
import { GetUserProfileController } from "../modules/user/useCases/getUserProfile/GetUserProfileController";
import { UpdateUserProfileController } from "../modules/user/useCases/updateUserProfile/UpdateUserProfileController";
import { validateToken } from "./validateToken";
import { DeleteUserController } from "../modules/user/useCases/deleteUser/DeleteUserController";

import fs from "fs";
import { IRoute } from ".";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const getUserProfileController = new GetUserProfileController();
const updateUserProfileController = new UpdateUserProfileController();
const deleteUserController = new DeleteUserController();

const userRoutes = Router();

export function listUserRoutes() {
  const routesList: IRoute[] = [];
  userRoutes.stack.forEach((r) => {
    if (r.route && r.route.path) {
      if (r.route.path === "/signup") {
        routesList.push({
          method: "POST",
          path: `users${r.route.path}`,
          body: {
            name: "Nome do usuário",
            cpf: "12345678910",
            email: "usuario@email.com",
            pass: "senha",
            cep: "11222333",
            street: "Rua do Usuário",
            houseNumber: 123,
            district: "Bairro do Usuário",
            city: "Cidade do Usuário",
            state: "UF",
            adjunct: "Complemento do Usuário",
          },
        });
      } else if (r.route.path === "/signin") {
        routesList.push({
          method: "POST",
          path: `users${r.route.path}`,
          body: {
            email: "usuariocadastrado@email.com",
            pass: "senhaDoUsuarioCadastrado",
          },
        });
        routesList.push({
          method: Object.keys(r.route.methods)[0].toUpperCase(),
          path: r.route.path,
        });
      } else if (r.route.path === "/update-profile/:userId") {
        routesList.push({
          method: "PUT",
          path: `users${r.route.path}`,
          body: {
            name: "Novo nome do usuário",
            cpf: "12345678910",
            email: "novoemaildousuario@email.com",
            password: "NovaSenha",
          },
        });
      } else {
        routesList.push({
          method: Object.keys(r.route.methods)[0].toUpperCase(),
          path: `users${r.route.path}`,
        });
      }
    }
  });

  if (!fs.existsSync("docs")) {
    fs.mkdirSync("docs");
  }
  fs.writeFileSync("docs/userRoutes.json", JSON.stringify(routesList, null, 2));
}

userRoutes.post("/signup", createUserController.handle);
userRoutes.post("/signin", authenticateUserController.handle);
userRoutes.get(
  "/profile/:userId",
  validateToken,
  getUserProfileController.handle
);
userRoutes.put(
  "/update-profile/:userId",
  validateToken,
  updateUserProfileController.handle
);

export { userRoutes };
