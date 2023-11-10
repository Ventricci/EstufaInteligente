import { UpdateDeviceStatusUseCase } from "./UpdateDeviceStatusUSeCase";

export interface IResponse {
  error?: string;
  success?: string;
}

export class UpdateDeviceStatusController {
  async handle(topic: string, message: string): Promise<IResponse> {
    const deviceSerial = topic.split("/")[1].trim();
    const deviceStatus = message.split(":")[1].trim() === "ON" ? true : false;

    const updateDeviceStatusUseCase = new UpdateDeviceStatusUseCase();

    const result = await updateDeviceStatusUseCase.execute({
      deviceSerial,
      deviceStatus,
    });

    return result;
  }
}
