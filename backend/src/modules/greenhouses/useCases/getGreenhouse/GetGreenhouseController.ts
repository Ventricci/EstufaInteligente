import { Request, Response } from "express";
import { GetGreenhouseUseCase } from "./GetGreenhouseUseCase";

export class GetGreenhouseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { greenhouseId } = request.params;

    // verificando se greenhouseId é válido e do tipo correto
    if (!greenhouseId || Number.isNaN(Number(greenhouseId))) {
      return response
        .status(400)
        .json({ errorMessage: "Id de estufa inválido" });
    }

    const getGreenhouseUseCase = new GetGreenhouseUseCase();

    const result = await getGreenhouseUseCase.execute(Number(greenhouseId));

    if (!result) {
      return response.status(404).json(result);
    } else {
      return response.status(200).json(result);
    }
  }
}
