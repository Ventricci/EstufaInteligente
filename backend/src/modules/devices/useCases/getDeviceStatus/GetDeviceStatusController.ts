import { Request, Response } from "express";
import { GetDeviceStatusUseCase } from "./GetDeviceStatusUseCase";

export class GetDeviceStatusController {
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

    const getDeviceStatusUseCase = new GetDeviceStatusUseCase();

    const result = await getDeviceStatusUseCase.execute({
      deviceId: Number(deviceId),
    });

    if (result.errorMessage) {
      return response.status(400).send(result);
    } else {
      return response.status(200).send(result);
    }
  }
}
