import { prisma } from "../../../../prisma/client";
import { GetDeviceStatusDTO } from "../../dtos/DevicesDTO";

interface IResponse {
  errorMessage?: string;
  status?: "Ligado" | "Desligado";
}

export class GetDeviceStatusUseCase {
  async execute({ deviceId }: GetDeviceStatusDTO): Promise<IResponse> {
    // Obter o dispositivo pelo id
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

    // Retornar o status do dispositivo
    return { status: device.status ? "Ligado" : "Desligado" };
  }
}
