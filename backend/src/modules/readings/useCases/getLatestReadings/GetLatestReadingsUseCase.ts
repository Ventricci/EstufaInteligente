import { Readings, Readings_Greatness } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

type Response = {
  errorMessage?: string;
  id?: Readings["id"];
  value?: Readings["value"];
  datetime?: Readings["datetime"];
};

export class GetLatestReadingsUseCase {
  async execute(
    greatness: Readings_Greatness,
    deviceId: number,
    initialDate: Date
  ): Promise<Response[] | { errorMessage: string }> {
    //  Verificando se o dispositivo existe
    const device = await prisma.devices.findUnique({
      where: { id: deviceId },
    });

    if (!device)
      return {
        errorMessage: "O dispositivo informado não existe",
      };

    // Obtendo as leituras do dispositivo, a partir da data inicial até a data atual
    const latestReadings = await prisma.readings.findMany({
      where: {
        devicesid: deviceId,
        greatness,
        datetime: { gte: initialDate },
      },
      select: {
        id: true,
        value: true,
        datetime: true,
      },
      orderBy: { datetime: "desc" },
    });

    if (!latestReadings)
      return {
        errorMessage: "Não há leituras para o dispositivo informado",
      };
    else return latestReadings;
  }
}
