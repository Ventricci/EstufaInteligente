import { UpdateDeviceStatusUseCase } from "./UpdateDeviceStatusUSeCase";

export interface IResponse {
  error?: string;
  success?: string;
}

export class UpdateDeviceStatusController {
  async handle(topic: string, message: string): Promise<IResponse> {
    console.log(`[TESTE] UpdateDeviceStatusController.handle()`);
    console.log(`[TESTE] Tópico: ${topic}`);
    console.log(`[TESTE] Mensagem: ${message}`);

    if (message !== "0" && message !== "1") {
      return {
        error: "O status informado é inválido",
      };
    }

    const deviceSerial = topic.split("/")[2];

    const updateDeviceStatusUseCase = new UpdateDeviceStatusUseCase();

    const result = await updateDeviceStatusUseCase.execute({
      deviceSerial,
      deviceStatus: message,
    });

    return result;
  }
}
