import { Request, Response } from "express";
import { CreateGreenhouseUseCase } from "./CreateGreenhouseUseCase";
import { CreateGreenhouseDTO } from "../../dtos/GreenhousesDTO";
export class CreateGreenhouseController {
  async handle(request: Request, response: Response) {
    const { name, idealTemperature, idealHumidity, address_id } =
      request.body as CreateGreenhouseDTO;

    const user_cpf = request.body.cpf;

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
