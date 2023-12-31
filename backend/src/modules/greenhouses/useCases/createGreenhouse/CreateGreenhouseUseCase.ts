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
    const user_id = await prisma.users.findFirst({
      select: {
        id: true,
      },
      where: {
        cpf: user_cpf,
      },
    });

    if (!user_id) throw new AppError("Usuário não encontrado");

    const address = await prisma.addresses.findFirst({
      where: {
        id: address_id,
      },
      select: {
        id: true,
      },
    });

    if (!address) throw new AppError("Endereço não encontrado");

    const greenhouse = await prisma.greenhouses.create({
      data: {
        name,
        idealtemperature: idealTemperature,
        idealhumidty: idealHumidity,
        usersid: user_id.id,
        deleted: false,
        addressesid: address.id,
      },
    });

    if (!greenhouse) throw new AppError("Não foi possível criar a estufa");
    return greenhouse;
  }
}
