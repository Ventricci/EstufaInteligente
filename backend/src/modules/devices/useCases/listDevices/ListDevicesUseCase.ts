import { Devices } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";

export class ListDevicesUseCase {
  async execute(greenhouseId: number): Promise<Devices[]> {
    // verificando se a estufa existe
    const greenhouse = await prisma.greenhouses.findUnique({
      where: {
        id: greenhouseId,
      },
    });

    if (!greenhouse) throw new AppError("Estufa não encontrada");

    const devices = await prisma.devices.findMany({
      where: {
        greenhousesid: greenhouseId,
      },
    });

    if (!devices.length) throw new AppError("Nenhum dispositivo encontrado");

    return devices;
  }
}
