import { prisma } from "../../../../prisma/client";
import { mqttClient } from "../../../../server";
import { SendActuationDTO } from "../../dtos/SendActuationDTO";

interface IResponse {
  errorMessage?: string;
  successMessage?: string;
  deviceStatus?: boolean;
}

export class SendActuationUseCase {
  async execute({ deviceId }: SendActuationDTO): Promise<IResponse> {
    // Verificar se existe um dispositivo com o deviceId informado
    const deviceExists = await prisma.devices.findUnique({
      where: {
        id: deviceId,
      },
    });

    if (!deviceExists) {
      return {
        errorMessage: "Não existe um dispositivo com o id informado",
      };
    }

    // Obter o serial do dispositivo
    const deviceSerial = deviceExists.serial;

    const oldStatus = deviceExists.status;
    const action = deviceExists.status === true ? "0" : "1";
    const topic = `${process.env.MQTT_TOPIC_ACTUATION}/${deviceSerial}`;

    console.log(`[TESTE] Enviando mensagem para o tópico ${topic}: ${action}`);

    const result = mqttClient.sendMessage(topic, action);

    if (!result) {
      return {
        errorMessage: "Ocorreu um erro ao enviar a mensagem",
      };
    } else {
      // Depois de enviar a mensagem, esperar 10 segundos, verificar o status do dispositivo e retornar uma mensagem de sucesso com o status atualizado
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          const device = await prisma.devices.findUnique({
            where: {
              id: deviceId,
            },
          });

          if (!device) {
            reject({
              errorMessage:
                "Ocorreu um erro ao verificar o status do dispositivo",
            });
          } else {
            const newStatus = device.status;

            if (newStatus === oldStatus) {
              resolve({
                successMessage: "O dispositivo permaneceu no mesmo status.",
                deviceStatus: newStatus,
              });
            } else {
              resolve({
                successMessage: `O dispositivo mudou de status. Status atual: ${newStatus}`,
                deviceStatus: newStatus,
              });
            }
          }
        }, 1000 * 5);
      });
    }
  }
}
