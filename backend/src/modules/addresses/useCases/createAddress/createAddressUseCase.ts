import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";
import { ICreateAddressRequestDTO } from "../../dtos/AddressesDTO";
import { Addresses } from "@prisma/client";

export class CreateAddressUseCase {
  async execute({
    user_cpf,
    cep,
    street,
    housenumber,
    district,
    city,
    state,
    adjunct,
  }: ICreateAddressRequestDTO): Promise<Addresses> {
    const user_id = await prisma.users.findFirst({
      select: {
        id: true,
      },
      where: {
        cpf: user_cpf,
      },
    });

    if (!user_id) throw new AppError("Usuário com este CPF não encontrado");

    const address = await prisma.addresses.create({
      data: {
        cep,
        street,
        housenumber,
        district,
        city,
        state,
        adjunt: adjunct,
        deleted: false,
        users_adresses: {
          create: {
            usersid: user_id.id,
          },
        },
      },
    });

    if (!address) throw new AppError("Não foi possível criar o endereço");

    return address;
  }
}
