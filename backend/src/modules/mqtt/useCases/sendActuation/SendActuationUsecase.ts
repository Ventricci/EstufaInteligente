import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { mqttClient } from "../../../../server";
import { SendActuationDTO } from "../../dtos/SendActuationDTO";

export class SendActuationUseCase {
  async execute({ deviceId }: SendActuationDTO): Promise<any> {
    const deviceExists = await prisma.devices.findUnique({
      where: {
        id: deviceId,
      },
    });

    if (!deviceExists)
      throw new AppError("Não existe um dispositivo com o id informado");

    const deviceSerial = deviceExists.serial;

    const oldStatus = deviceExists.status;
    const action = deviceExists.status === true ? "0" : "1";
    const topic = `${process.env.MQTT_TOPIC_ACTUATION}/${deviceSerial}`;

    const result = mqttClient.sendMessage(topic, action);

    if (!result) throw new AppError("Não foi possível enviar a mensagem");
    // Depois de enviar a mensagem, esperar 5 segundos, verificar o status do dispositivo e retornar uma mensagem de sucesso com o status atualizado
    await new Promise((resolve) => setTimeout(resolve, 1000 * 5));

    const updatedDevice = await prisma.devices.findUnique({
      where: {
        id: deviceId,
      },
    });

    if (!updatedDevice)
      throw new AppError("Houve um erro ao verificar o status do dispositivo");

    const newStatus = updatedDevice.status;

    if (newStatus === oldStatus)
      return {
        success: false,
        message: "O dispositivo não respondeu",
      };

    return {
      success: true,
      message: `O dispositivo foi ${newStatus ? "ligado" : "desligado"}`,
    };
  }
}
