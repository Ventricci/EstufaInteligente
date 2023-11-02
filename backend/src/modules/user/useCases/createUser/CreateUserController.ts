import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserDTO } from "../../dtos/UserDTO";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, cpf, email, pass, role } = request.body as CreateUserDTO;

    // validando se os campos estão corretos
    // name:
    if (!name || name.length > 80) {
      return response.status(400).json({ error: "name is too long" });
    }
    // cpf:
    if (!cpf || cpf.length !== 11) {
      return response.status(400).json({ error: "cpf is invalid" });
    }
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
    // role:
    if (!role || (role !== "Administrator" && role !== "Client")) {
      return response.status(400).json({ error: "role is invalid" });
    }

    const createUserUseCase = new CreateUserUseCase();

    const result = await createUserUseCase.execute({
      name,
      cpf,
      email,
      pass,
      role,
    });

    return response.status(201).json(result);
  }
}
