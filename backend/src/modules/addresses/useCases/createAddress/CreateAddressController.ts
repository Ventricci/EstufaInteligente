import { Request, Response } from "express";
import { AppError } from "../../../../errors/AppError";
import { CreateAddressUseCase } from "./createAddressUseCase";

export class CreateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cep, street, housenumber, district, city, state, adjunct } =
      request.body;

    const user_cpf: string = request.body.cpf;

    if (!user_cpf || user_cpf.length !== 11) throw new AppError("CPF inválido");
    if (!cep || cep.length !== 8) throw new AppError("CEP inválido");
    if (!street) throw new AppError("Rua inválida");
    else if (street.length > 160)
      throw new AppError(
        "O banco de dados não suporta nome de rua com mais de 160 caracteres"
      );
    if (!housenumber) throw new AppError("Número da casa inválido");
    else if (housenumber < 0 || isNaN(Number(housenumber)))
      throw new AppError(
        "O número da casa deve ser um número inteiro positivo"
      );
    if (!district) throw new AppError("Bairro inválido");
    else if (district.length > 120)
      throw new AppError(
        "O banco de dados não suporta bairros com mais de 120 caracteres"
      );
    if (!city) throw new AppError("Cidade inválida");
    else if (city.length > 160)
      throw new AppError(
        "O banco de dados não suporta cidades com mais de 160 caracteres"
      );
    if (!state) throw new AppError("Estado inválido");
    else if (state.length > 50)
      throw new AppError(
        "O banco de dados não suporta estados com mais de 2 caracteres"
      );
    if (adjunct && adjunct.length > 160)
      throw new AppError(
        "O banco de dados não suporta complementos com mais de 160 caracteres"
      );

    const createAddressUseCase = new CreateAddressUseCase();

    const address = await createAddressUseCase.execute({
      user_cpf,
      cep,
      street,
      housenumber,
      district,
      city,
      state,
      adjunct,
    });

    return response.status(201).json(address);
  }
}
