import { prisma } from "../../../../prisma/client";
import { Greenhouses } from "@prisma/client";
import { ListGreenhousesDTO } from "../../dtos/GreenhousesDTO";
import { AppError } from "../../../../errors/AppError";

export class ListGreenhousesUseCase {
  async execute({ user_cpf }: ListGreenhousesDTO): Promise<Greenhouses[]> {
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

    // Listar as estufas
    const greenhouses = await prisma.greenhouses.findMany({
      where: {
        usersid: user_id.id,
      },
    });

    if (!greenhouses) throw new AppError("Não foi possível listar as estufas");

    return greenhouses;
  }
}
