import { Request, Response } from "express";
import { ListDevicesByGreenhouseUseCase } from "./GetDevicesByGreenhouseUseCase";

export class GetDevicesByGreenhouseController {
  async handle(request: Request, response: Response) {
    const { greenhouse_id } = request.params;

    const user_cpf = request.body.cpf;

    const listDevicesByGreenhouseUseCase = new ListDevicesByGreenhouseUseCase();

    const devices = await listDevicesByGreenhouseUseCase.execute({
      greenhouse_id: Number(greenhouse_id),
      user_cpf,
    });

    return response.status(200).json(devices);
  }
}
