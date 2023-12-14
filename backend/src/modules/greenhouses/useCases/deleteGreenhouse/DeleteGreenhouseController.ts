import { Request, Response } from "express";
import { AppError } from "../../../../errors/AppError";
import { DeleteGreenhouseUseCase } from "./DeleteGreenhouseUseCase";

export class DeleteGreenhouseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (!id) throw new AppError("O id da estufa é obrigatório!");

    const deleteGreenhouseUseCase = new DeleteGreenhouseUseCase();

    const greenhouse = await deleteGreenhouseUseCase.execute(Number(id));

    return response.status(200).json(greenhouse);
  }
}
