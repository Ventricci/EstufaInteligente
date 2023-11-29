import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { UpdateUserDTO } from "../../dtos/UserDTO";

interface Response {
  successMessage: string;
}

export class UpdateUserProfileUseCase {
  async execute({
    id,
    name,
    cpf,
    email,
    pass,
    role,
  }: UpdateUserDTO): Promise<Response> {
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        cpf: true,
        email: true,
        pass: true,
        role: true,
      },
    });

    if (!user) throw new AppError("Usuário não encontrado");

    const userName = name ? name : user?.name;
    const userCpf = cpf ? cpf : user?.cpf;
    const userEmail = email ? email : user?.email;
    const userPass = pass ? pass : user?.pass;
    const userRole = role ? role : user?.role;

    const preData = {
      name: userName === user.name ? undefined : userName,
      cpf: userCpf === user.cpf ? undefined : userCpf,
      email: userEmail === user.email ? undefined : userEmail,
      pass: userPass === user.pass ? undefined : userPass,
      role: userRole === user.role ? undefined : userRole,
    };

    const dataToUpdate = Object.fromEntries(
      Object.entries(preData).filter(([_, v]) => v !== undefined)
    );

    await prisma.users
      .update({
        where: {
          id,
        },
        data: dataToUpdate,
      })
      .catch((err) => {
        console.log(err);
        throw new AppError("Erro ao atualizar usuário");
      });

    return { successMessage: "Usuário atualizado com sucesso" };
  }
}
