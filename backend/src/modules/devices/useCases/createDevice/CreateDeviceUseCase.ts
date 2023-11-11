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
    // Verify if device already exists
    const deviceAlreadyExists = await prisma.devices.findFirst({
      where: {
        serial,
        category,
      },
    });
    if (deviceAlreadyExists)
      return {
        errorMessage:
          "Um dispositivo dessa categoria e com esse serial já está cadastrado",
      };
    // Create device
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
    return device
      ? { successMessage: "Dispositivo criado com sucesso!" }
      : { errorMessage: "Houve um erro ao criar o dispositivo" };
  }
}
