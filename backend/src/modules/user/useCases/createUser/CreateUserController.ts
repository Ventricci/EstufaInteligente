import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserDTO } from "../../dtos/UserDTO";
import { Users_Role } from "@prisma/client";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, cpf, email, pass, role } = request.body as CreateUserDTO;

    // validando se os campos estão corretos
    // name:
    if (!name || name.length > 80) {
      return response.status(400).json({
        error: "O banco de dados não aceita nomes com mais de 80 caracteres",
      });
    }
    // cpf:
    if (!cpf || cpf.length !== 11) {
      return response
        .status(400)
        .json({ errorMessage: "O tamanho do cpf deve ser de 11 caracteres" });
    }
    // email:
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email || email.length > 160) {
      return response.status(400).json({
        error: "O banco de dados não aceita emails com mais de 160 caracteres",
      });
    } else if (!emailRegex.test(email)) {
      return response.status(400).json({ errorMessage: "O email é inválido" });
    }
    // pass:
    if (!pass || pass.length > 30) {
      return response.status(400).json({
        error: "O banco de dados não aceita senhas com mais de 30 caracteres",
      });
    }
    // role:
    if (
      !role ||
      (role !== Users_Role.Administrator && role !== Users_Role.Client)
    ) {
      return response
        .status(400)
        .json({
          errorMessage: "A função só pode ser 'Administrator' ou 'Client'",
        });
    }

    const createUserUseCase = new CreateUserUseCase();

    const result = await createUserUseCase.execute({
      name,
      cpf,
      email,
      pass,
      role,
    });

    if (result) {
      return response.status(201).json(result);
    } else {
      return response
        .status(409)
        .json({ errorMessage: "Um usuário com esse cpf já está cadastrado" });
    }
  }
}
