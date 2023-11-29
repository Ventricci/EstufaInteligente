import { AppError } from "../../../../errors/AppError";
import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserDTO } from "../../dtos/UserDTO";
import { Users_Role } from "@prisma/client";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const {
      name,
      cpf,
      email,
      pass,
      role = Users_Role.Client,
      cep,
      street,
      houseNumber,
      district,
      city,
      state,
      adjunct,
    } = request.body as CreateUserDTO;

    if (!name || name.length > 80)
      throw new AppError(
        "O banco de dados não aceita nomes com mais de 80 caracteres"
      );

    if (!cpf || cpf.length !== 11)
      throw new AppError("O CPF deve ter 11 caracteres");

    const emailRegex = /\S+@\S+\.\S+/;
    if (!email || !emailRegex.test(email))
      throw new AppError("O email informado não é válido");
    else if (email.length > 160)
      throw new AppError(
        "O Banco de dados não aceita emails com mais de 160 caracteres"
      );

    if (!pass || pass.length > 30) throw new AppError("Senha inválida");

    if (role !== Users_Role.Administrator && role !== Users_Role.Client)
      throw new AppError(
        "O papel do usuário deve ser 'Administrator' ou 'Client'"
      );

    if (!cep || cep.length !== 8)
      throw new AppError("O CEP deve ter 8 caracteres");

    if (!street || street.length > 160)
      throw new AppError(
        "O banco de dados não aceita nomes de ruas com mais de 160 caracteres"
      );

    if (!houseNumber || houseNumber < 0 || isNaN(Number(houseNumber)))
      throw new AppError(
        "O número da casa deve ser um número inteiro positivo"
      );

    if (!district || district.length > 120)
      throw new AppError(
        "O banco de dados não aceita bairros com mais de 120 caracteres"
      );

    if (!city || city.length > 160)
      throw new AppError(
        "O banco de dados não aceita cidades com mais de 160 caracteres"
      );

    if (!state || state.length > 50)
      throw new AppError(
        "O banco de dados não aceita estados com mais de 50 caracteres"
      );

    if (adjunct && adjunct.length > 160)
      throw new AppError(
        "O banco de dados não aceita complementos com mais de 160 caracteres"
      );

    const createUserUseCase = new CreateUserUseCase();

    const result = await createUserUseCase.execute({
      name,
      cpf,
      email,
      pass,
      role,
      cep,
      street,
      houseNumber: Number(houseNumber),
      district,
      city,
      state,
      adjunct,
    });

    return response.status(201).json(result);
  }
}
