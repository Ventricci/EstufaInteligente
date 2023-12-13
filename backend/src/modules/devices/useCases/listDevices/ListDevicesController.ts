import { AppError } from "../../../../errors/AppError";
import { Request, Response } from "express";
import { ListDevicesUseCase } from "./ListDevicesUseCase";

export class ListDevicesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { greenhouseId } = request.params;

    if (!greenhouseId || isNaN(Number(greenhouseId)))
      throw new AppError("É necessário informar um id de estufa válido");

    const listDevicesUseCase = new ListDevicesUseCase();

    const result = await listDevicesUseCase.execute(Number(greenhouseId));

    return response.status(200).json(result);
  }
}
