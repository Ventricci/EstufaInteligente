import { AppError } from "../../../../errors/AppError";
import { Request, Response } from "express";
import { GetReadingsUseCase } from "./GetReadingsUseCase";
import { GetReadingsDTO } from "../../dtos/ReadingsDTO";
import { Readings_Greatness } from "@prisma/client";

export class GetReadingsController {
  async handle(request: Request, response: Response) {
    const { greenhousesid, greatness, initialDate, finalDate } = request.params;

    // validando se os campos estão corretos
    // greenhousesid
    if (!greenhousesid || isNaN(Number(greenhousesid)))
      throw new AppError("O id da estufa informado é inválido");
    // greatness
    if (
      !greatness ||
      (greatness !== Readings_Greatness.temperature &&
        greatness !== Readings_Greatness.humidity)
    )
      throw new AppError("A grandeza informada é inválida");
    // initialDate e finalDate
    const dateAndTimeRegex =
      /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/;
    let convertedInitialDate: Date;
    let convertedFinalDate: Date;

    if (
      dateAndTimeRegex.test(initialDate) === false ||
      dateAndTimeRegex.test(finalDate) === false
    )
      throw new AppError("As datas devem estar no formato yyyy-mm-ddThh:mm:ss");
    convertedInitialDate = new Date(initialDate);
    convertedInitialDate.setUTCHours(convertedInitialDate.getUTCHours() - 3);
    convertedFinalDate = new Date(finalDate);
    convertedFinalDate.setUTCHours(convertedFinalDate.getUTCHours() - 3);
    if (convertedInitialDate > convertedFinalDate)
      throw new AppError("A data inicial não pode ser maior que a data final");

    const getReadingsUseCase = new GetReadingsUseCase();

    const result = await getReadingsUseCase.execute({
      greenhouseId: Number(greenhousesid),
      greatness,
      initialDate: convertedInitialDate,
      finalDate: convertedFinalDate,
    });

    return response.status(200).json(result);
  }
}
