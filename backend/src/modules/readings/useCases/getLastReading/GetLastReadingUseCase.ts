import { Readings, Readings_Greatness } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

type Response = {
  errorMessage?: string;
  id?: Readings["id"];
  value?: Readings["value"];
  datetime?: Readings["datetime"];
};

export class GetLastReadingUseCase {
  async execute(
    greatness: Readings_Greatness,
    deviceId: number
  ): Promise<Response | { errorMessage: string }> {
    //  Verificando se o dispositivo existe
    const device = await prisma.devices.findUnique({
      where: { id: deviceId },
    });

    if (!device)
      return {
        errorMessage: "O dispositivo informado não existe",
      };

    // Obtendo a última leitura do dispositivo
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
      return {
        errorMessage: "Não há leituras para o dispositivo informado",
      };
    else return lastReading;
  }
}
