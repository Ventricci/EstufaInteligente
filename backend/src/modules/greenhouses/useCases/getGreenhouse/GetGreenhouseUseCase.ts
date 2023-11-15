import { Greenhouses } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class GetGreenhouseUseCase {
  async execute(
    greenhouseId: number
  ): Promise<Greenhouses[] | { errorMessage: string }> {
    // verificando se a estufa existe
    const greenhouses = await prisma.greenhouses.findMany({
      where: {
        id: greenhouseId,
      },
    });

    if (!greenhouses) {
      return { errorMessage: "Estufa não encontrada" };
    }

    return greenhouses;
  }
}
