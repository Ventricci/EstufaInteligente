import { Request, Response } from "express";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

export class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { userId } = request.params;

    if (!userId || isNaN(Number(userId))) {
      return response.status(400).json({ error: "Invalid user id" });
    }

    const deleteUserUseCase = new DeleteUserUseCase();

    await deleteUserUseCase.execute(Number(userId));

    return response.status(204).send({
      message: "Usuário deletado com sucesso",
    });
  }
}
