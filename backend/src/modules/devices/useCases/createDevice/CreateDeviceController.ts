import { Devices_Type } from "@prisma/client";
import { CreateDeviceDTO } from "../../dtos/DevicesDTO";
import { Request, Response } from "express";
import { CreateDeviceUseCase } from "./CreateDeviceUseCase";

export class CreateDeviceController {
  async handle(request: Request, response: Response) {
    const { name, category, status, serial, greenhousesid } =
      request.body as CreateDeviceDTO;
    // validando se os campos estão corretos
    // name:
    if (!name || name.length > 80) {
      return response.status(400).json({
        error: "O banco de dados não aceita nomes com mais de 80 caracteres",
      });
    }
    // category:
    if (
      !category ||
      (category !== Devices_Type.sensor && category !== Devices_Type.activation)
    ) {
      return response.status(400).json({
        error: "A categoria só pode ser 'sensor' ou 'activation'",
      });
    }
    // status:
    if (status === undefined) {
      return response.status(400).json({
        error: "O status não pode ser undefined",
      });
    }
    // serial:
    if (!serial || serial.length > 80) {
      return response.status(400).json({
        error: "O banco de dados não aceita seriais com mais de 80 caracteres",
      });
    }
    // greenhousesid:
    if (!greenhousesid) {
      return response.status(400).json({
        error: "O id da estufa não pode ser undefined",
      });
    }

    const createDeviceUseCase = new CreateDeviceUseCase();

    const result = await createDeviceUseCase.execute({
      name,
      category,
      status,
      serial,
      greenhousesid,
    });

    if (result) {
      return response.status(201).json(result);
    } else {
      return response
        .status(409)
        .json({
          error:
            "Um dispositivo dessa categoria e com esse serial já está cadastrado",
        });
    }
  }
}