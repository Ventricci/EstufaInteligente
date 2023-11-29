import { AppError } from "../../../../errors/AppError";
import { Request, Response } from "express";
import { GetDeviceStatusUseCase } from "./GetDeviceStatusUseCase";

export class GetDeviceStatusController {
  async handle(request: Request, response: Response) {
    const { deviceId } = request.params;

    if (!deviceId)
      throw new AppError("É necessário informar o id do dispositivo");
    else if (isNaN(Number(deviceId)))
      throw new AppError("O id do dispositivo deve ser um número");

    const getDeviceStatusUseCase = new GetDeviceStatusUseCase();

    const result = await getDeviceStatusUseCase.execute({
      deviceId: Number(deviceId),
    });

    return response.status(200).json(result);
  }
}
