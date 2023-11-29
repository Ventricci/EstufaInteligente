import { Users } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";

export class GetUserProfileUseCase {
  async execute(userId: number): Promise<Users> {
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new AppError("Usuário não encontrado");

    return user;
  }
}
