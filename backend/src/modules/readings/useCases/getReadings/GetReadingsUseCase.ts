import { Devices_Type, Readings } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { GetReadingsDTO } from "../../dtos/ReadingsDTO";

interface ErrorResponse {
  errorMessage: string;
} // TODO: mudar para o arquivo de interfaces

export class GetReadingsUseCase {
  async execute({
    greenhouseId,
    greatness,
    initialDate,
    finalDate,
  }: GetReadingsDTO): Promise<Readings[] | ErrorResponse> {
    const greenhouseExists = await prisma.greenhouses.findFirst({
      where: {
        id: greenhouseId,
      },
    });

    if (!greenhouseExists) return { errorMessage: "Estufa não encontrada" };

    const devices = await prisma.devices.findMany({
      where: {
        greenhousesid: greenhouseId,
        category: Devices_Type.sensor,
      },
    });

    if (!devices) return { errorMessage: "Dispositivos não encontrados" };

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
    });

    if (!readings) return { errorMessage: "Leituras não encontradas" };

    // Criar um mapa para agrupar as leituras por dispositivo
    const readingsByDevice = new Map();

    for (const reading of readings) {
      const { devicesid, id, value, datetime } = reading;

      // Verifica se já existe uma entrada para o dispositivo no mapa
      if (!readingsByDevice.has(devicesid)) {
        readingsByDevice.set(devicesid, {
          deviceId: devicesid,
          readings: [],
        });
      }

      // Adiciona a leitura ao dispositivo correspondente no mapa
      const deviceReadings = readingsByDevice.get(devicesid).readings;
      deviceReadings.push({ id, value, datetime });
    }

    // Converter o mapa de volta para um array de objetos
    const groupedReadings = [...readingsByDevice.values()];

    if (!groupedReadings) return { errorMessage: "Falha ao agrupar leituras" };

    return groupedReadings;
  }
}
