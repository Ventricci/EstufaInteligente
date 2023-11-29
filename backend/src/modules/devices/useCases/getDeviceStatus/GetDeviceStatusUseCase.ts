import { prisma } from "../../../../prisma/client";
import { GetDeviceStatusDTO } from "../../dtos/DevicesDTO";

interface IResponse {
  errorMessage?: string;
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

    if (!device)
      return { errorMessage: "Houve um erro ao obter o dispositivo" };

    return { status: device.status ? "Ligado" : "Desligado" };
  }
}
