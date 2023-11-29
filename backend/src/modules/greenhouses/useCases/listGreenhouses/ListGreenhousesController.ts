import { Request, Response } from "express";
import { ListGreenhousesUseCase } from "./ListGreenhousesUseCase";

export class ListGreenhousesController {
  async handle(request: Request, response: Response) {
    const user_cpf = request.body.cpf;

    const listGreenhousesUseCase = new ListGreenhousesUseCase();

    const greenhouses = await listGreenhousesUseCase.execute({ user_cpf });

    return response.status(200).json(greenhouses);
  }
}
