import { Greenhouses, Users } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AuthenticateUserDTO } from "../../dtos/UserDTO";
import jwt from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";

interface IAuthenticateUserResponse {
  auth: boolean;
  token: string;
  id: Users["id"];
  name: Users["name"];
  cpf: Users["cpf"];
  email: Users["email"];
  role: Users["role"];
  photo: Users["photo"];
  greenhouses: Greenhouses["name"][];
}

export class AuthenticateUserUseCase {
  async execute({
    email,
    pass,
  }: AuthenticateUserDTO): Promise<IAuthenticateUserResponse> {
    // Verify if user exists
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) throw new AppError("Usuário não encontrado");

    // Verify if pass is correct
    if (user.pass !== pass) throw new AppError("Senha incorreta");

    // Generate token
    const token = jwt.sign(
      {
        cpf: user.cpf,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
        algorithm: "HS256",
      }
    );

    if (!token) throw new AppError("Não foi possível gerar o token");

    // Get user greenhouses
    const greenhouses = await prisma.users
      .findFirst({
        where: {
          id: user.id,
        },
      })
      .greenhouses()
      .then((greenhouses) => {
        return greenhouses
          ? greenhouses.map((greenhouse) => {
              return greenhouse.name;
            })
          : [];
      });

    return {
      auth: true,
      token,
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      email: user.email,
      role: user.role,
      photo: user.photo,
      greenhouses,
    };
  }
}
