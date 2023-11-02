import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { AuthenticateUserDTO } from "../../dtos/UserDTO";

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, pass } = request.body as AuthenticateUserDTO;

    // validando se os campos estão corretos
    // email:
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email || email.length > 160) {
      return response.status(400).json({ error: "email is too long" });
    } else if (!emailRegex.test(email)) {
      return response.status(400).json({ error: "email is invalid" });
    }

    // pass:
    if (!pass || pass.length > 30) {
      return response.status(400).json({ error: "pass is too long" });
    }

    const authenticateUserUseCase = new AuthenticateUserUseCase();

    const result = await authenticateUserUseCase.execute({
      email,
      pass,
    });

    if (result.auth) {
      return response.status(200).json(result);
    } else {
      return response.status(401).json(result);
    }
  }
}
