import { AppError } from "../../../../errors/AppError";
import { Request, Response } from "express";
import { GetGreenhouseUseCase } from "./GetGreenhouseUseCase";

export class GetGreenhouseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { greenhouseId } = request.params;

    if (!greenhouseId || isNaN(Number(greenhouseId)))
      throw new AppError("É necessário informar um id de estufa válido");

    const getGreenhouseUseCase = new GetGreenhouseUseCase();

    const result = await getGreenhouseUseCase.execute(Number(greenhouseId));

    return response.status(200).json(result);
  }
}
