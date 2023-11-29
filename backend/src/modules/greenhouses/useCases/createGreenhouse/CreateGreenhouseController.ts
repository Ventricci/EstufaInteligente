import { AppError } from "../../../../errors/AppError";
import { Request, Response } from "express";
import { CreateGreenhouseUseCase } from "./CreateGreenhouseUseCase";
import { CreateGreenhouseDTO } from "../../dtos/GreenhousesDTO";
export class CreateGreenhouseController {
  async handle(request: Request, response: Response) {
    const { name, idealTemperature, idealHumidity, address_id } =
      request.body as CreateGreenhouseDTO;

    const user_cpf = request.body.cpf;

    if (!user_cpf || user_cpf.length !== 11) throw new AppError("CPF inválido");

    if (!name || !idealTemperature || !idealHumidity || !address_id)
      throw new AppError("Dados incompletos");

    if (name.length > 120)
      throw new AppError("O banco de dados não suporta um nome tão grande");

    if (idealTemperature < 0 || idealTemperature > 100)
      throw new AppError("Temperatura ideal inválida");

    if (idealHumidity < 0 || idealHumidity > 100)
      throw new AppError("Umidade ideal inválida");

    if (Number.isNaN(address_id))
      throw new AppError("O ID do endereço deve ser um número");

    const createGreenhouseUseCase = new CreateGreenhouseUseCase();

    const greenhouse = await createGreenhouseUseCase.execute({
      name,
      idealTemperature,
      idealHumidity,
      user_cpf,
      address_id,
    });

    return response.status(201).json(greenhouse);
  }
}
