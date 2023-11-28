import { Users } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export type Response = Users | { errorMessage: string };

export class GetUserProfileUseCase {
  async execute(userId: number): Promise<Response> {
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return { errorMessage: "Usuário não encontrado" };
    }

    return user;
  }
}
