import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateDeviceDTO } from "../../dtos/DevicesDTO";

export class CreateDeviceUseCase {
  async execute({
    name,
    category,
    status,
    serial,
    greenhousesid,
  }: CreateDeviceDTO) {
    const deviceAlreadyExists = await prisma.devices.findFirst({
      where: {
        serial,
        category,
      },
    });
    if (deviceAlreadyExists)
      throw new AppError(
        "Um dispositivo dessa categoria e com esse serial já está cadastrado"
      );

    const device = await prisma.devices.create({
      data: {
        name,
        category,
        status,
        serial,
        greenhousesid,
        deleted: false,
      },
    });

    if (!device) throw new AppError("Houve um erro ao criar o dispositivo");

    return device;
  }
}
