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

    if (!user_id)
      return { errorMessage: "Houve um erro ao obter o id do usuário" };

    // Obter a estufa pelo id, e verificar se o usuário é dono da estufa
    const greenhouse = await prisma.greenhouses.findFirst({
      where: {
        id: greenhouse_id,
        usersid: user_id.id,
      },
    });

    if (!greenhouse)
      return { errorMessage: "Houve um erro ao obter o id da estufa" };

    // Obter os dispositivos pela estufa
    const devices = await prisma.devices.findMany({
      where: {
        greenhousesid: greenhouse.id,
      },
    });

    // Retornar os dispositivos
    if (!devices)
      return { errorMessage: "Houve um erro ao obter os dispositivos" };
    else return devices;
  }
}
