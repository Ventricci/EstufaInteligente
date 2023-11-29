import { AppError } from "../../../../errors/AppError";
import { Readings, Readings_Greatness } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

interface IResponse {
  id: Readings["id"];
  value: Readings["value"];
  datetime: Readings["datetime"];
}

export class GetLastReadingUseCase {
  async execute(
    greatness: Readings_Greatness,
    deviceId: number
  ): Promise<IResponse> {
    const device = await prisma.devices.findUnique({
      where: { id: deviceId },
    });

    if (!device) throw new AppError("O dispositivo informado não existe");

    const lastReading = await prisma.readings.findFirst({
      where: { devicesid: deviceId, greatness },
      select: {
        id: true,
        value: true,
        datetime: true,
      },
      orderBy: { datetime: "desc" },
    });

    if (!lastReading)
      throw new AppError("Não há leituras para este dispositivo");

    return lastReading;
  }
}
