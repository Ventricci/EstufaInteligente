import { Request, Response } from "express";
import { GetReadingsUseCase } from "./GetReadingsUseCase";
import { GetReadingsDTO } from "../../dtos/ReadingsDTO";
import { Readings_Greatness } from "@prisma/client";

export class GetReadingsController {
  async handle(request: Request, response: Response) {
    const { greenhousesid, greatness, initialDate, finalDate } = request.params;

    // validando se os campos estão corretos
    // greenhousesid
    const greenhouseId = Number(greenhousesid);
    if (isNaN(greenhouseId)) {
      return response.status(400).json({
        errorMessage: "O id da estufa deve ser um número",
      });
    }
    // greatness
    if (
      greatness !== Readings_Greatness.temperature &&
      greatness !== Readings_Greatness.humidity
    ) {
      return response.status(400).json({
        errorMessage: "A grandeza deve ser 'temperature' ou 'humidity'",
      });
    }
    // initialDate e finalDate
    const dateAndTimeRegex =
      /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/;
    let convertedInitialDate: Date;
    let convertedFinalDate: Date;

    if (
      dateAndTimeRegex.test(initialDate) === false ||
      dateAndTimeRegex.test(finalDate) === false
    ) {
      return response.status(400).json({
        errorMessage: "As datas devem estar no formato 'yyyy-mm-ddThh:mm:ss'",
      });
    } else {
      convertedInitialDate = new Date(initialDate);
      convertedInitialDate.setUTCHours(convertedInitialDate.getUTCHours() - 3);
      convertedFinalDate = new Date(finalDate);
      convertedFinalDate.setUTCHours(convertedFinalDate.getUTCHours() - 3);

      if (convertedInitialDate > convertedFinalDate) {
        return response.status(400).json({
          errorMessage: "A data inicial deve ser menor que a data final",
        });
      }
    }

    const getReadingsUseCase = new GetReadingsUseCase();

    const result = await getReadingsUseCase.execute({
      greenhouseId,
      greatness,
      initialDate: convertedInitialDate,
      finalDate: convertedFinalDate,
    });

    if ("errorMessage" in result) {
      return response.status(400).json(result);
    } else {
      return response.status(200).json(result);
    }
  }
}
