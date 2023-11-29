import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { ListDevicesByGreenhouseDTO } from "../../dtos/DevicesDTO";

export class ListDevicesByGreenhouseUseCase {
  async execute({ greenhouse_id, user_cpf }: ListDevicesByGreenhouseDTO) {
    // Obter o id do usuário pelo cpf
    const user_id = await prisma.users.findFirst({
      select: {
        id: true,
      },
      where: {
        cpf: user_cpf,
      },
    });

    if (!user_id) throw new AppError("Houve um erro ao obter o id do usuário");

    // Obter a estufa pelo id, e verificar se o usuário é dono da estufa
    const greenhouse = await prisma.greenhouses.findFirst({
      where: {
        id: greenhouse_id,
        usersid: user_id.id,
      },
    });

    if (!greenhouse) throw new AppError("Houve um erro ao obter a estufa");

    // Obter os dispositivos pela estufa
    const devices = await prisma.devices.findMany({
      where: {
        greenhousesid: greenhouse.id,
      },
    });

    // Retornar os dispositivos
    if (!devices) throw new AppError("Houve um erro ao obter os dispositivos");
    return devices;
  }
}
