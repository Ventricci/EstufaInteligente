import { Greenhouses, Users } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AuthenticateUserDTO } from "../../dtos/UserDTO";
import jwt from "jsonwebtoken";

interface IResponse {
  auth: boolean;
  token?: string | null;
  id?: Users["id"];
  name?: Users["name"];
  cpf?: Users["cpf"];
  email?: Users["email"];
  role?: Users["role"];
  photo?: Users["photo"];
  greenhouses?: Greenhouses["id"][];
  errorMessage?: string;
}

export class AuthenticateUserUseCase {
  async execute({ email, pass }: AuthenticateUserDTO): Promise<IResponse> {
    // Verify if user exists
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        auth: false,
        token: null,
        errorMessage: "O email informado não está cadastrado",
      };
    }

    // Verify if pass is correct
    if (user.pass !== pass) {
      return {
        auth: false,
        token: null,
        errorMessage: "A senha informada está incorreta",
      };
    }

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

    if (!token)
      return {
        auth: false,
        token: null,
        errorMessage: "Erro ao gerar token",
      };

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
              return greenhouse.id;
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
