import { Request, Response } from "express";
import { GetReadingsUseCase } from "./GetReadingsUseCase";
import { GetReadingsDTO } from "../../dtos/ReadingsDTO";
import { Readings_Greatness } from "@prisma/client";

export class GetReadingsController {
  async handle(request: Request, response: Response) {
    const { greatness, initialDate, finalDate, deviceId } = request.params;

    // validando se os campos estão corretos
    // greatness
    if (
      greatness !== Readings_Greatness.temperature &&
      greatness !== Readings_Greatness.humidity
    ) {
      return response.status(400).json({
        message: "Invalid greatness",
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
        message: "Invalid date or time format",
      });
    } else {
      convertedInitialDate = new Date(initialDate);
      convertedFinalDate = new Date(finalDate);

      if (convertedInitialDate > convertedFinalDate) {
        return response.status(400).json({
          message: "Initial date must be before final date",
        });
      }
    }

    // deviceId
    const deviceIdNumber = Number(deviceId);

    const getReadingsUseCase = new GetReadingsUseCase();

    const result = await getReadingsUseCase.execute({
      greatness,
      initialDate: convertedInitialDate,
      finalDate: convertedFinalDate,
      deviceId: deviceIdNumber,
    });

    return response.status(200).json(result);
  }
}
