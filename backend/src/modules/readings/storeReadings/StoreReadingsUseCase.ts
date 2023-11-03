import { prisma } from "../../../prisma/client";
import { StoreReadingsDTO } from "../dtos/ReadingsDTO";

export class StoreReadingsUseCase {
  async execute({ greatness, deviceId, value, dateTime }: StoreReadingsDTO) {
    // Verificando se o dispositivo existe
    const deviceAlreadyExists = await prisma.devices.findFirst({
      where: {
        id: deviceId,
      },
    });

    if (!deviceAlreadyExists) {
      return new Error("Device doesn't exists");
    }

    // armazenando a leitura no banco de dados
    const reading = await prisma.readings.create({
      data: {
        value,
        devicesid: deviceId,
        datetime: dateTime,
        greatness,
      },
    });

    return reading;
  }
}
