import { AppError } from "../../../../errors/AppError";
import { Readings_Greatness } from "@prisma/client";
import { Request, Response } from "express";
import { GetLastReadingUseCase } from "./GetLastReadingUseCase";

export class GetLastReadingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { deviceId, greatness } = request.params;

    //  Verificando se o parâmetro greatness é válido e do tipo correto
    if (!greatness || !Readings_Greatness.hasOwnProperty(greatness))
      throw new AppError("A grandeza informada é inválida");

    //  Verificando se o parâmetro deviceId é válido e do tipo correto
    if (isNaN(Number(deviceId)))
      throw new AppError("O id do dispositivo informado é inválido");

    const getLastReadingUseCase = new GetLastReadingUseCase();

    const result = await getLastReadingUseCase.execute(
      greatness as Readings_Greatness,
      Number(deviceId)
    );

    return response.status(200).json(result);
  }
}
