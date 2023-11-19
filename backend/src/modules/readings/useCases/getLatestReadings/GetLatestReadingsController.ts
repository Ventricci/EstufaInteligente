import { Request, Response } from "express";
import { GetLatestReadingsUseCase } from "./GetLatestReadingsUseCase";
import { Readings_Greatness } from "@prisma/client";

export class GetLatestReadingsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { deviceId, greatness, initialDate } = request.params;

    //  Verificando se o parâmetro greatness é válido e do tipo correto
    if (!greatness || !Readings_Greatness.hasOwnProperty(greatness)) {
      return response
        .status(400)
        .json({ error: "A grandeza informada é inválida" });
    }

    //  Verificando se o parâmetro deviceId é válido e do tipo correto

    if (isNaN(Number(deviceId))) {
      return response
        .status(400)
        .json({ error: "O deviceId informado é inválido" });
    }

    //  Verificando se o parâmetro initialDate é válido e do tipo correto
    const dateAndTimeRegex =
      /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/;
    let convertedInitialDate: Date;

    if (dateAndTimeRegex.test(initialDate) === false) {
      return response.status(400).json({
        errorMessage: "A data deve estar no formato 'yyyy-mm-ddThh:mm:ss'",
      });
    } else {
      convertedInitialDate = new Date(initialDate);
      convertedInitialDate.setUTCHours(convertedInitialDate.getUTCHours() - 3);
    }

    // se a data inicial for maior que a data atual, retorna erro
    if (convertedInitialDate > new Date()) {
      return response.status(400).json({
        errorMessage: "A data inicial deve ser menor que a data atual",
      });
    }

    const getLatestReadingsUseCase = new GetLatestReadingsUseCase();

    const result = await getLatestReadingsUseCase.execute(
      greatness as Readings_Greatness,
      Number(deviceId),
      convertedInitialDate
    );

    if ("errorMessage" in result) {
      return response.status(400).json(result);
    } else {
      return response.status(200).json(result);
    }
  }
}
