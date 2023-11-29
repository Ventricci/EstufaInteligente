import { AppError } from "../../../../errors/AppError";
import { Request, Response } from "express";
import { GetLatestReadingsUseCase } from "./GetLatestReadingsUseCase";
import { Readings_Greatness } from "@prisma/client";

export class GetLatestReadingsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { deviceId, greatness, initialDate } = request.params;

    if (!greatness || !Readings_Greatness.hasOwnProperty(greatness))
      throw new AppError("A grandeza informada é inválida");

    if (!deviceId || isNaN(Number(deviceId)))
      throw new AppError("O id do dispositivo informado é inválido");

    const dateAndTimeRegex =
      /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/;
    let convertedInitialDate: Date;

    if (dateAndTimeRegex.test(initialDate) === false)
      throw new AppError("A data deve estar no formato yyyy-mm-ddThh:mm:ss");

    convertedInitialDate = new Date(initialDate);
    convertedInitialDate.setUTCHours(convertedInitialDate.getUTCHours() - 3);

    if (convertedInitialDate > new Date())
      throw new AppError("A data inicial não pode ser maior que a data atual");

    const getLatestReadingsUseCase = new GetLatestReadingsUseCase();

    const result = await getLatestReadingsUseCase.execute(
      greatness as Readings_Greatness,
      Number(deviceId),
      convertedInitialDate
    );

    return response.status(200).json(result);
  }
}
