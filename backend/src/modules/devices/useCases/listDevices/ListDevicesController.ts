import { Request, Response } from "express";
import { Greenhouses } from "@prisma/client";
import { ListDevicesUseCase } from "./ListDevicesUseCase";

export class ListDevicesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { greenhouseId } = request.params;

    // verificando se greenhouseId é válido e do tipo correto
    if (!greenhouseId || Number.isNaN(Number(greenhouseId))) {
      return response.status(400).json({ errorMessage: "Estufa inválida" });
    }

    const listDevicesUseCase = new ListDevicesUseCase();

    const result = await listDevicesUseCase.execute(Number(greenhouseId));

    if (!result) {
      return response.status(404).json(result);
    } else {
      return response.status(200).json(result);
    }
  }
}
