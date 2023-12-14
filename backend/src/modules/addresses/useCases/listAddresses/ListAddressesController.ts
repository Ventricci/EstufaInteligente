import { Request, Response } from "express";
import { AppError } from "../../../../errors/AppError";
import { ListAddressesUseCase } from "./ListAddressesUseCase";

export class ListAddressesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_cpf: string = request.body.cpf;

    if (!user_cpf || user_cpf.length !== 11) throw new AppError("CPF inválido");

    const listAddressesUseCase = new ListAddressesUseCase();

    const addresses = await listAddressesUseCase.execute(user_cpf);

    return response.status(200).json(addresses);
  }
}
