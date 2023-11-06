import { mqttClient } from "../../../../server";
import { SendMessagesDTO } from "../../dtos/SendMessagesDTO";

export class SendTestMessageUseCase {
  async execute({ topic, message }: SendMessagesDTO): Promise<boolean> {
    const result = await mqttClient.sendMessage(topic, message);

    return result;
  }
}
