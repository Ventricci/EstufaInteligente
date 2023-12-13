import { Addresses } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";

export class ListAddressesUseCase {
  async execute(userId: number): Promise<Addresses[]> {
    const userExists = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) throw new AppError("Usuário não existe!");

    const userAddresses = await prisma.addresses.findMany({
      where: {
        users_adresses: {
          some: {
            usersid: userId,
          },
        },
      },
    });

    if (!userAddresses)
      throw new AppError("Este usuário não possui endereços cadastrados!");

    return userAddresses;
  }
}
