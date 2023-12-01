import { prisma } from "../../../../prisma/client";

export class DeleteUserUseCase {
  async execute(userId: number) {
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("O usuário a ser deletado não existe");
    }

    await prisma.users.delete({
      where: {
        id: userId,
      },
    });

    const userDeleted = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (userDeleted) {
      throw new Error("Não foi possível deletar o usuário");
    }

    return;
  }
}
