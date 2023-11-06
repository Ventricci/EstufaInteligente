import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { AuthenticateUserDTO } from "../../dtos/UserDTO";

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, pass } = request.body as AuthenticateUserDTO;

    // validando se os campos estão corretos
    // email:
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email || email.length > 160) {
      return response
        .status(400)
        .json({
          error:
            "O banco de dados não aceita emails com mais de 160 caracteres",
        });
    } else if (!emailRegex.test(email)) {
      return response.status(400).json({ error: "O email é inválido" });
    }

    // pass:
    if (!pass || pass.length > 30) {
      return response
        .status(400)
        .json({
          error: "O banco de dados não aceita senhas com mais de 30 caracteres",
        });
    }

    const authenticateUserUseCase = new AuthenticateUserUseCase();

    const result = await authenticateUserUseCase.execute({
      email,
      pass,
    });

    if (result.auth) {
      return response.status(200).json(result);
    } else {
      return response.status(401).json(result);
    }
  }
}
