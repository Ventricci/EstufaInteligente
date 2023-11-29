import { Devices_Type } from "@prisma/client";
import { CreateDeviceDTO } from "../../dtos/DevicesDTO";
import { Request, Response } from "express";
import { CreateDeviceUseCase } from "./CreateDeviceUseCase";
import { AppError } from "../../../../errors/AppError";

export class CreateDeviceController {
  async handle(request: Request, response: Response) {
    const { name, category, status, serial, greenhousesid } =
      request.body as CreateDeviceDTO;
    if (!name || name.length > 80)
      throw new AppError(
        "O banco de dados não aceita nomes com mais de 80 caracteres"
      );
    if (
      !category ||
      (category !== Devices_Type.sensor && category !== Devices_Type.activation)
    )
      throw new AppError("A categoria só pode ser 'sensor' ou 'activation'");
    if (status === undefined)
      throw new AppError("Você precisa definir o status do dispositivo");
    if (!serial || serial.length > 80)
      throw new AppError(
        "O banco de dados não aceita seriais com mais de 80 caracteres"
      );
    if (!greenhousesid)
      throw new AppError("O identificador da estufa é obrigatório");

    const createDeviceUseCase = new CreateDeviceUseCase();

    const result = await createDeviceUseCase.execute({
      name,
      category,
      status,
      serial,
      greenhousesid,
    });

    return response.status(201).json(result);
  }
}
