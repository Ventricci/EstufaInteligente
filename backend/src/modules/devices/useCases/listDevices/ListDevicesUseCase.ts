import { Devices } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

type Response = Devices[] | { errorMessage: string };

export class ListDevicesUseCase {
  async execute(greenhouseId: number): Promise<Response> {
    // verificando se a estufa existe
    const greenhouse = await prisma.greenhouses.findUnique({
      where: {
        id: greenhouseId,
      },
    });

    if (!greenhouse) {
      return { errorMessage: "Estufa não encontrada" };
    }

    const devices = await prisma.devices.findMany({
      where: {
        greenhousesid: greenhouseId,
      },
    });

    return devices;
  }
}
