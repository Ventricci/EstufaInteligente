import { AppError } from "../../../../errors/AppError";
import { Request, Response } from "express";
import { GetUserProfileUseCase } from "./GetUserProfileUseCase";
import { Users } from "@prisma/client";

export class GetUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;

    if (!userId || isNaN(Number(userId)))
      throw new AppError("Usuário inválido");

    const getUserProfileUseCase = new GetUserProfileUseCase();

    const user = await getUserProfileUseCase.execute(Number(userId));

    return response.status(200).json(user);
  }
}
