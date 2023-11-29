import { Request, Response } from "express";
import { UpdateUserProfileUseCase } from "./UpdateUserProfileUseCase";
import { AppError } from "../../../../errors/AppError";

export class UpdateUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const { name, email, cpf, password } = request.body;

    if (!userId || Number.isNaN(Number(userId)))
      throw new AppError("Usuário inválido");

    if (!name && !email && !cpf && !password)
      throw new AppError("Nenhum dado foi informado para atualização");

    // o nome deve ter no máximo 80 caracteres
    if (name.length > 80)
      throw new AppError(
        "O banco de dados não aceita nomes com mais de 80 caracteres"
      );

    // o email deve ter no máximo 160 caracteres
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!email || !emailRegex.test(email))
      throw new AppError("O email informado não é válido");
    else if (email.length > 160)
      throw new AppError(
        "O Banco de dados não aceita emails com mais de 160 caracteres"
      );

    // o cpf deve ter 11 caracteres
    if (cpf.length !== 11) throw new AppError("O CPF deve ter 11 caracteres");

    // a senha deve ter no máximo 30 caracteres
    if (password.length > 30) throw new AppError("Senha inválida");

    const updateUserProfileUseCase = new UpdateUserProfileUseCase();

    const result = await updateUserProfileUseCase.execute({
      id: Number(userId),
      name,
      email,
      pass: password,
    });

    return response.status(200).json(result);
  }
}
