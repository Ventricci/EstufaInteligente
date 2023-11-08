import { Greenhouses } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateGreenhouseDTO } from "../../dtos/GreenhousesDTO";

interface IResponse {
  errorMessage: string;
}

export class CreateGreenhouseUseCase {
  async execute({
    name,
    idealTemperature,
    idealHumidity,
    user_cpf,
    address_id,
  }: CreateGreenhouseDTO): Promise<Greenhouses | IResponse> {
    // Obter o id do usuário
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

    if (!greenhouse)
      return { errorMessage: "Houve um erro ao criar a estufa no banco" };
    else return greenhouse;
  }
}
