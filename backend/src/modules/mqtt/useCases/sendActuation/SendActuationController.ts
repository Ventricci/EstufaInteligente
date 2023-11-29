import { AppError } from "../../../../errors/AppError";
import { Request, Response } from "express";
import { SendActuationUseCase } from "./SendActuationUsecase";

export class SendActuationController {
  async handle(request: Request, response: Response) {
    const { deviceId } = request.params;

    if (!deviceId || isNaN(Number(deviceId)))
      throw new AppError("Você deve informar um id de dispositivo válido");

    const sendActuationUseCase = new SendActuationUseCase();

    const result = await sendActuationUseCase.execute({
      deviceId: Number(deviceId),
    });

    return response.status(200).json(result);
  }
}
