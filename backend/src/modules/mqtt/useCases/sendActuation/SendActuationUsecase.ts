import { prisma } from "../../../../prisma/client";
import { mqttClient } from "../../../../server";
import { SendActuationDTO } from "../../dtos/SendActuationDTO";

interface IResponse {
  errorMessage?: string;
  successMessage?: string;
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

    // Enviar uma mensagem de acionamento para o tópico ACIONAMENTO/<serial>
    const action = deviceExists.status === true ? "0" : "1";
    const topic = `ACIONAMENTO/${deviceSerial}`;

    const result = mqttClient.sendMessage(topic, action);

    if (!result) {
      return {
        errorMessage: "Ocorreu um erro ao enviar a mensagem",
      };
    } else {
      return {
        successMessage: `O dispositivo está sendo ${
          deviceExists.status === true ? "desligado" : "ligado"
        }.`,
      };
    }
  }
}
