import { Request, Response } from "express";
import { UpdateGreenhouseUseCase } from "./UpdateGreenhouseUseCase";
import { AppError } from "../../../../errors/AppError";

export class UpdateGreenhouseController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { name, idealTemperature, idealHumidity, user_cpf, address_id } =
      request.body;

    if (!id) throw new AppError("O id da estufa é obrigatório!");

    if (
      !name &&
      !idealTemperature &&
      !idealHumidity &&
      !user_cpf &&
      !address_id
    )
      throw new AppError(
        "É necessário informar ao menos um campo para atualizar!"
      );

    const updateGreenhouseUseCase = new UpdateGreenhouseUseCase();

    const greenhouse = await updateGreenhouseUseCase.execute({
      id: Number(id),
      name,
      idealTemperature,
      idealHumidity,
      user_cpf,
      address_id,
    });

    return response.json(greenhouse);
  }
}
