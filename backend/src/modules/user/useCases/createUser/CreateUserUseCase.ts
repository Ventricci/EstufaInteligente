import { Users } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateUserDTO } from "../../dtos/UserDTO";

interface IResponse {
  errorMessage?: string;
  successMessage?: string;
}

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
  }: CreateUserDTO): Promise<Users | IResponse> {
    // Verify if user already exists
    const userAlreadyExists = await prisma.users.findFirst({
      where: {
        cpf,
      },
    });

    if (userAlreadyExists) return { errorMessage: "Usuário já cadastrado" };

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

    // Create a Users_Addresses relationship
    await prisma.users_Adresses.create({
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

    return { successMessage: "Usuário criado com sucesso!" };
  }
}
