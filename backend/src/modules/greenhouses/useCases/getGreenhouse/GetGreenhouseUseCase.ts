import { Greenhouses } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";

export class GetGreenhouseUseCase {
  async execute(greenhouseId: number): Promise<Greenhouses[]> {
    const greenhouses = await prisma.greenhouses.findMany({
      where: {
        id: greenhouseId,
      },
    });

    if (!greenhouses) throw new AppError("Estufa não encontrada");

    return greenhouses;
  }
}
