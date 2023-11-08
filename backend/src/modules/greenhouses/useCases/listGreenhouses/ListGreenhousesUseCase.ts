import { prisma } from "../../../../prisma/client";
import { Greenhouses } from "@prisma/client";
import { ListGreenhousesDTO } from "../../dtos/GreenhousesDTO";

interface IResponse {
  errorMessage: string;
}

export class ListGreenhousesUseCase {
  async execute({
    user_cpf,
  }: ListGreenhousesDTO): Promise<Greenhouses[] | IResponse> {
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

    // Listar as estufas
    const greenhouses = await prisma.greenhouses.findMany({
      where: {
        usersid: user_id.id,
      },
    });

    if (!greenhouses)
      return { errorMessage: "Houve um erro ao listar as estufas" };
    else return greenhouses;
  }
}
