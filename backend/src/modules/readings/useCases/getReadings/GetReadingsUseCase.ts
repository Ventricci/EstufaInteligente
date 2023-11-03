import { Readings } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { GetReadingsDTO } from "../../dtos/ReadingsDTO";

/**
 * [GET] `/readings/:greatness/:initialDate/:finalDate/:deviceId` - Retorna todas as leituras de determinada grandeza de um dispositivo em um intervalo de tempo
 */

export class GetReadingsUseCase {
  async execute({
    greatness,
    initialDate,
    finalDate,
    deviceId,
  }: GetReadingsDTO): Promise<Readings[]> {
    // Verify if device exists
    const deviceExists = await prisma.devices.findFirst({
      where: {
        id: deviceId,
      },
    });

    if (!deviceExists) {
      throw new Error("Device does not exists");
    }

    // Verify if readings exists
    const readingsExists = await prisma.readings.findMany({
      where: {
        greatness,
        devicesid: deviceId,
        datetime: {
          gte: initialDate,
          lte: finalDate,
        },
      },
    });

    if (!readingsExists) {
      throw new Error("Readings does not exists");
    }

    // Get readings
    const readings = await prisma.readings.findMany({
      where: {
        greatness,
        devicesid: deviceId,
        datetime: {
          gte: new Date(initialDate),
          lte: new Date(finalDate),
        },
      },
      orderBy: {
        datetime: "asc",
      },
    });

    return readings;
  }
}
