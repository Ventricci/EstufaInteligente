import { prisma } from "../../../../prisma/client";

export class DeleteGreenhouseUseCase {
  async execute(id: number) {
    const greenhouseExists = await prisma.greenhouses.findFirst({
      where: {
        id,
      },
    });

    if (!greenhouseExists) {
      throw new Error("Greenhouse does not exists!");
    }

    const greenhouse = await prisma.greenhouses
      .delete({
        where: {
          id,
        },
      })
      .catch((error) => {
        throw new Error(error);
      });

    return greenhouse;
  }
}
