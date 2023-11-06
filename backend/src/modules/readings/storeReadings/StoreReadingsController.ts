import { Readings, Readings_Greatness } from "@prisma/client";
import { StoreReadingsUseCase } from "./StoreReadingsUseCase";

export class StoreReadingsController {
  async handle(topic: string, message: string) {
    let result: Readings | Error;
    const storeReadingsUseCase = new StoreReadingsUseCase();

    const greatness: Readings_Greatness | null =
      topic === "MONITORAMENTO/TEMPERATURA"
        ? Readings_Greatness.temperature
        : topic === "MONITORAMENTO/UMIDADE"
        ? Readings_Greatness.humidity
        : null;

    // message é do tipo: dispositivoId.valor.timestamp
    const deviceId = Number(message.split(".")[0]);
    const value = Number(message.split(".")[1]);
    const timestamp = message.split(".")[2];
    const dateTime = new Date(timestamp);
    dateTime.setUTCHours(dateTime.getUTCHours() - 3);

    if (!greatness) {
      result = new Error("Invalid topic");
    } else if (!deviceId) {
      result = new Error("Invalid device id");
    } else if (!value) {
      result = new Error("Invalid value");
    } else if (!dateTime) {
      result = new Error("Invalid date");
    } else {
      result = await storeReadingsUseCase.execute({
        greatness,
        deviceId,
        value,
        dateTime,
      });
    }

    return result;
  }
}
