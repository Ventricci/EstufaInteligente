import { AppError } from "../../../../errors/AppError";
import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { AuthenticateUserDTO } from "../../dtos/UserDTO";

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, pass } = request.body as AuthenticateUserDTO;

    const emailRegex = /\S+@\S+\.\S+/;
    if (!email || !emailRegex.test(email))
      throw new AppError("O email informado não é válido");
    else if (email.length > 160)
      throw new AppError(
        "O Banco de dados não aceita emails com mais de 160 caracteres"
      );

    if (!pass || pass.length > 30) throw new AppError("Senha inválida");

    const authenticateUserUseCase = new AuthenticateUserUseCase();

    const result = await authenticateUserUseCase.execute({
      email,
      pass,
    });

    return response.status(200).json(result);
  }
}
