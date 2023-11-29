import { Users } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateUserDTO } from "../../dtos/UserDTO";
import { AppError } from "../../../../errors/AppError";

export class CreateUserUseCase {
  async execute({
    name,
    cpf,
    email,
    pass,
    role,
    cep,
    street,
    houseNumber,
    district,
    city,
    state,
    adjunct,
  }: CreateUserDTO): Promise<Users> {
    // Verify if user already exists
    const userAlreadyExists = await prisma.users.findFirst({
      where: {
        cpf,
      },
    });

    if (userAlreadyExists) throw new AppError("Usuário já cadastrado");

    // Create address
    const address = await prisma.addresses.create({
      data: {
        cep,
        street,
        housenumber: houseNumber,
        district,
        city,
        state,
        adjunt: adjunct,
        deleted: false,
      },
    });

    if (!address) throw new AppError("Não foi possível criar o endereço");

    // Create user
    const user = await prisma.users.create({
      data: {
        name,
        cpf,
        email,
        pass,
        role,
        deleted: false,
      },
    });

    if (!user) throw new AppError("Não foi possível criar o usuário");

    // Create a Users_Addresses relationship
    const users_Addresses = await prisma.users_Adresses.create({
      data: {
        users: {
          connect: {
            id: user.id,
          },
        },
        addresses: {
          connect: {
            id: address.id,
          },
        },
      },
    });

    if (!users_Addresses)
      throw new AppError("Não foi possível vincular o usuário ao endereço");

    return user;
  }
}
