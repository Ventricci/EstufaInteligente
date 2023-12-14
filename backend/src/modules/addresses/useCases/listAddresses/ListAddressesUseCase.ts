import { Addresses } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";

export class ListAddressesUseCase {
  async execute(user_cpf: string): Promise<Addresses[]> {
    const user_id = await prisma.users.findFirst({
      select: {
        id: true,
      },
      where: {
        cpf: user_cpf,
      },
    });

    if (!user_id) throw new AppError("Usuário com este CPF não encontrado");

    const addresses = await prisma.addresses.findMany({
      where: {
        users_adresses: {
          some: {
            usersid: user_id.id,
          },
        },
      },
    });

    if (!addresses) throw new AppError("Não foi possível listar os endereços");

    return addresses;
  }
}
