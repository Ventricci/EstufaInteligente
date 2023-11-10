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
    const message = "Change the device state";
    const topic = `ACIONAMENTO/${deviceSerial}`;

    const result = mqttClient.sendMessage(topic, message);

    if (!result) {
      return {
        errorMessage: "Ocorreu um erro ao enviar a mensagem",
      };
    } else {
      // Se inscrever no tópico RESPOSTA/<serial>
      mqttClient.subscribe(`RESPOSTA/${deviceSerial}`);
      return {
        successMessage:
          "Mensagem enviada com sucesso. Para receber a resposta, solicite o status do dispositivo em alguns segundos.",
      };
    }
  }
}
