import { Request, Response } from "express";
import { UpdateUserProfileUseCase } from "./UpdateUserProfileUseCase";

export class UpdateUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const { name, email, cpf, password } = request.body;

    if (!userId || Number.isNaN(Number(userId))) {
      return response
        .status(400)
        .json({ errorMessage: "Id do usuário inválido" });
    }

    if (!name && !email && !cpf && !password) {
      return response
        .status(400)
        .json({ errorMessage: "Nenhum dado foi informado para atualização" });
    }

    // o nome deve ter no máximo 80 caracteres
    if (name.length > 80) {
      return response
        .status(400)
        .json({ errorMessage: "Name must be a maximum of 80 characters" });
    }

    // o email deve ter no máximo 160 caracteres
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (email.length > 160 || !emailRegex.test(email)) {
      return response
        .status(400)
        .json({ errorMessage: "Invalid email or email too long" });
    }

    // o cpf deve ter 11 caracteres
    if (cpf.length !== 11) {
      return response
        .status(400)
        .json({ errorMessage: "CPF must be 11 characters" });
    }

    // a senha deve ter no máximo 30 caracteres
    if (password.length > 30) {
      return response
        .status(400)
        .json({ errorMessage: "Password must be a maximum of 30 characters" });
    }

    const updateUserProfileUseCase = new UpdateUserProfileUseCase();

    const result = await updateUserProfileUseCase.execute({
      id: Number(userId),
      name,
      email,
      pass: password,
    });

    console.log(result);

    if ("errorMessage" in result) {
      return response.status(404).json(result);
    } else {
      return response.status(200).json(result);
    }
  }
}
