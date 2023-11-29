import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { GetDeviceStatusDTO } from "../../dtos/DevicesDTO";

interface IResponse {
  status?: "Ligado" | "Desligado";
}

export class GetDeviceStatusUseCase {
  async execute({ deviceId }: GetDeviceStatusDTO): Promise<IResponse> {
    const device = await prisma.devices.findFirst({
      where: {
        id: deviceId,
      },
      select: {
        status: true,
      },
    });

    if (!device) throw new AppError("Houve um erro ao buscar o dispositivo");

    return { status: device.status ? "Ligado" : "Desligado" };
  }
}
