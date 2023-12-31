import { AppError } from "../../../../errors/AppError";
import { Devices_Type, Readings } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { GetReadingsDTO } from "../../dtos/ReadingsDTO";

export class GetReadingsUseCase {
  async execute({
    greenhouseId,
    greatness,
    initialDate,
    finalDate,
  }: GetReadingsDTO): Promise<Readings[]> {
    const greenhouseExists = await prisma.greenhouses.findFirst({
      where: {
        id: greenhouseId,
      },
    });

    if (!greenhouseExists) throw new AppError("Estufa não encontrada");

    const devices = await prisma.devices.findMany({
      where: {
        greenhousesid: greenhouseId,
        category: Devices_Type.sensor,
      },
    });

    if (!devices) throw new AppError("Dispositivos não encontrados");

    const readings = await prisma.readings.findMany({
      where: {
        devicesid: {
          in: devices.map((device) => device.id),
        },
        greatness,
        datetime: {
          gte: initialDate,
          lte: finalDate,
        },
      },
      select: {
        devicesid: true,
        id: true,
        value: true,
        datetime: true,
      },
    });

    if (!readings) throw new AppError("Leituras não encontradas");

    const readingsByDevice = new Map();

    for (const reading of readings) {
      const { devicesid, id, value, datetime } = reading;

      if (!readingsByDevice.has(devicesid)) {
        readingsByDevice.set(devicesid, {
          deviceId: devicesid,
          readings: [],
        });
      }

      const deviceReadings = readingsByDevice.get(devicesid).readings;
      deviceReadings.push({ id, value, datetime });
    }

    const groupedReadings = [...readingsByDevice.values()];

    if (!groupedReadings)
      throw new AppError("Houve um erro ao agrupar as leituras");

    return groupedReadings;
  }
}
