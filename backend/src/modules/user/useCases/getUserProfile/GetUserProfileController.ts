import { Request, Response } from "express";
import { GetUserProfileUseCase } from "./GetUserProfileUseCase";
import { Users } from "@prisma/client";

export class GetUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;

    if (!userId) {
      return response
        .status(400)
        .json({ errorMessage: "O id do usuário é obrigatório" });
    } else if (Number.isNaN(Number(userId))) {
      return response
        .status(400)
        .json({ errorMessage: "O id do usuário deve ser um número" });
    }

    const getUserProfileUseCase = new GetUserProfileUseCase();

    const user = await getUserProfileUseCase.execute(Number(userId));

    if ("errorMessage" in user) {
      return response.status(404).json({ errorMessage: user.errorMessage });
    } else {
      return response.status(200).json(user);
    }
  }
}
