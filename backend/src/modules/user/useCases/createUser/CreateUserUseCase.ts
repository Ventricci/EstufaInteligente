import { Users } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateUserDTO } from "../../dtos/UserDTO";

export class CreateUserUseCase {
  async execute({
    name,
    cpf,
    email,
    pass,
    role,
  }: CreateUserDTO): Promise<Users> {
    // Verify if user already exists
    const userAlreadyExists = await prisma.users.findFirst({
      where: {
        cpf,
      },
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

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

    return user;
  }
}
