import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { ListDevicesByGreenhouseDTO } from "../../dtos/DevicesDTO";

export class ListDevicesByGreenhouseUseCase {
  async execute({ greenhouse_id, user_cpf }: ListDevicesByGreenhouseDTO) {
    const user_id = await prisma.users.findFirst({
      select: {
        id: true,
      },
      where: {
        cpf: user_cpf,
      },
    });

    if (!user_id) throw new AppError("Houve um erro ao obter o id do usuário");

    const greenhouse = await prisma.greenhouses.findFirst({
      where: {
        id: greenhouse_id,
        usersid: user_id.id,
      },
    });

    if (!greenhouse) throw new AppError("Houve um erro ao obter a estufa");

    const devices = await prisma.devices.findMany({
      where: {
        greenhousesid: greenhouse.id,
      },
    });

    if (!devices) throw new AppError("Houve um erro ao obter os dispositivos");
    return devices;
  }
}
