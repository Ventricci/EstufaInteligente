import { AppError } from "../../../../errors/AppError";
import { Request, Response } from "express";
import { ListDevicesByGreenhouseUseCase } from "./GetDevicesByGreenhouseUseCase";

export class GetDevicesByGreenhouseController {
  async handle(request: Request, response: Response) {
    const { greenhouse_id } = request.params;

    const user_cpf = request.body.cpf;

    if (!greenhouse_id)
      throw new AppError("É necessário informar o id da estufa");
    else if (isNaN(Number(greenhouse_id)))
      throw new AppError("O id da estufa deve ser um número");

    if (!user_cpf) throw new AppError("É necessário informar o cpf do usuário");

    const listDevicesByGreenhouseUseCase = new ListDevicesByGreenhouseUseCase();

    const devices = await listDevicesByGreenhouseUseCase.execute({
      greenhouse_id: Number(greenhouse_id),
      user_cpf,
    });

    return response.status(200).json(devices);
  }
}
