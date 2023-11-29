import { Devices_Type } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { UpdateDeviceStatusDTO } from "../../dtos/DevicesDTO";
import { IResponse } from "./UpdateDeviceStatusController";

export class UpdateDeviceStatusUseCase {
  async execute({
    deviceSerial,
    deviceStatus,
  }: UpdateDeviceStatusDTO): Promise<IResponse> {
    // Verificando se o dispositivo existe e se é um atuador e devolve o id
    const deviceId = await prisma.devices.findFirst({
      where: {
        serial: deviceSerial,
        category: Devices_Type.activation,
      },
      select: {
        id: true,
      },
    });

    if (!deviceId) {
      return {
        error: "O dispositivo não existe ou não é um atuador.",
      };
    }

    // Atualizando o status do dispositivo
    const device = await prisma.devices.update({
      where: {
        id: deviceId.id,
      },
      data: {
        status: deviceStatus === "1" ? true : false,
      },
    });

    if (!device) {
      return {
        error: "Ocorreu um erro ao atualizar o status do dispositivo.",
      };
    } else {
      return {
        success: "Status do dispositivo atualizado com sucesso.",
      };
    }
  }
}
