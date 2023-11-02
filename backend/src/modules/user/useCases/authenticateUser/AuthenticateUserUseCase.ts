import { Users } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AuthenticateUserDTO } from "../../dtos/UserDTO";
import jwt from "jsonwebtoken";

interface IResponse {
  auth: boolean;
  token: string | null;
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
      return { auth: false, token: null };
    }

    // Verify if pass is correct
    if (user.pass !== pass) {
      return { auth: false, token: null };
    }

    // Generate token
    const token = jwt.sign(
      {
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
        algorithm: "HS256",
      }
    );

    return { auth: true, token: token };
  }
}
