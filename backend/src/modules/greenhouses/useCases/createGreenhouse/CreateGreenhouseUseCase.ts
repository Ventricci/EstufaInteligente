import { AppError } from "../../../../errors/AppError";
import { Greenhouses } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateGreenhouseDTO } from "../../dtos/GreenhousesDTO";

export class CreateGreenhouseUseCase {
  async execute({
    name,
    idealTemperature,
    idealHumidity,
    user_cpf,
    address_id,
  }: CreateGreenhouseDTO): Promise<Greenhouses> {
    // Obter o id do usuário
    const user_id = await prisma.users.findFirst({
      select: {
        id: true,
      },
      where: {
        cpf: user_cpf,
      },
    });

    if (!user_id) throw new AppError("Usuário não encontrado");

    // Criar uma estufa
    const greenhouse = await prisma.greenhouses.create({
      data: {
        name,
        idealtemperature: idealTemperature,
        idealhumidty: idealHumidity,
        usersid: user_id.id,
        deleted: false,
        addressesid: address_id,
      },
    });

    if (!greenhouse) throw new AppError("Não foi possível criar a estufa");
    return greenhouse;
  }
}
