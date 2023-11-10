import { Request, Response } from "express";
import { SendActuationUseCase } from "./SendActuationUsecase";

export class SendActuationController {
  async handle(request: Request, response: Response) {
    const { deviceId } = request.params;

    if (!deviceId) {
      return response
        .status(400)
        .send({ errorMessage: "DeviceId é obrigatório" });
    } else if (isNaN(Number(deviceId))) {
      return response
        .status(400)
        .send({ errorMessage: "DeviceId deve ser um número" });
    }

    const sendActuationUseCase = new SendActuationUseCase();

    const result = await sendActuationUseCase.execute({
      deviceId: Number(deviceId),
    });

    if (result.errorMessage) {
      return response.status(400).send(result);
    } else if (result.successMessage) {
      return response.status(200).send(result);
    }
  }
}
