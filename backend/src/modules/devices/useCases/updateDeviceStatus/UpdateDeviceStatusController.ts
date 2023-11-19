import { UpdateDeviceStatusUseCase } from "./UpdateDeviceStatusUSeCase";

export interface IResponse {
  error?: string;
  success?: string;
}

export class UpdateDeviceStatusController {
  async handle(topic: string, message: string): Promise<IResponse> {
    // A mensagem recebida é do tipo:
    // serial(tab)0 ou 1(tab)timestamp
    // Exemplo: db853040-7cf3-11ee-b962-0242ac120002	1	1634022607
    const deviceSerial = message.split("\t")[0].trim();
    const deviceStatus = message.split("\t")[1].trim();
    // const timestamp = message.split("\t")[2].trim();

    const updateDeviceStatusUseCase = new UpdateDeviceStatusUseCase();

    const result = await updateDeviceStatusUseCase.execute({
      deviceSerial,
      deviceStatus: deviceStatus as "0" | "1",
    });

    return result;
  }
}
