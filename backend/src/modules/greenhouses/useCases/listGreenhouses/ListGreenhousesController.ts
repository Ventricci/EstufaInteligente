import { Request, Response } from "express";
import { ListGreenhousesUseCase } from "./ListGreenhousesUseCase";
import { AppError } from "../../../../errors/AppError";

export class ListGreenhousesController {
  async handle(request: Request, response: Response) {
    const user_cpf = request.body.cpf;

    if (!user_cpf || user_cpf.length !== 11) throw new AppError("CPF inválido");

    const listGreenhousesUseCase = new ListGreenhousesUseCase();

    const greenhouses = await listGreenhousesUseCase.execute({ user_cpf });

    return response.status(200).json(greenhouses);
  }
}
