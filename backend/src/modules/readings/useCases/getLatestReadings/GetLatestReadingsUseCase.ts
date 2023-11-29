import { AppError } from "../../../../errors/AppError";
import { Readings, Readings_Greatness } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

interface IReadings {
  id: Readings["id"];
  value: Readings["value"];
  datetime: Readings["datetime"];
}

export class GetLatestReadingsUseCase {
  async execute(
    greatness: Readings_Greatness,
    deviceId: number,
    initialDate: Date
  ): Promise<IReadings[]> {
    //  Verificando se o dispositivo existe
    const device = await prisma.devices.findUnique({
      where: { id: deviceId },
    });

    if (!device) throw new AppError("O dispositivo informado não existe");
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
      throw new AppError("Não há leituras para este dispositivo");

    return latestReadings;
  }
}
