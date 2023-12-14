import { prisma } from "../../../../prisma/client";
import { UpdateGreenhouseDTO } from "../../dtos/GreenhousesDTO";

export class UpdateGreenhouseUseCase {
  async execute({ id, ...data }: UpdateGreenhouseDTO) {
    const greenhouseExists = await prisma.greenhouses.findFirst({
      where: {
        id,
      },
    });

    if (!greenhouseExists) {
      throw new Error("Greenhouse does not exists!");
    }

    const greenhouse = await prisma.greenhouses
      .update({
        where: {
          id,
        },
        data,
      })
      .catch((error) => {
        throw new Error(error);
      });

    return greenhouse;
  }
}
