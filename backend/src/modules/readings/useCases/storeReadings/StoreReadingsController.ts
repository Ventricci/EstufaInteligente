import { Readings, Readings_Greatness } from "@prisma/client";
import { StoreReadingsUseCase } from "./StoreReadingsUseCase";

export class StoreReadingsController {
  async handle(topic: string, message: string) {
    let result: Readings | Error;
    const storeReadingsUseCase = new StoreReadingsUseCase();

    const greatness: Readings_Greatness | null =
      topic === process.env.MQTT_TOPIC_TEMPERATURE
        ? Readings_Greatness.temperature
        : topic === process.env.MQTT_TOPIC_HUMIDITY
        ? Readings_Greatness.humidity
        : null;

    // message é do tipo: dispositivoId.valor.timestamp
    const serial = message.split("\t")[0].trim();
    const value = Number(message.split("\t")[1]);
    const timestamp = message.split("\t")[2];
    const dateTime = new Date(timestamp);
    dateTime.setUTCHours(dateTime.getUTCHours() - 3);

    if (!greatness) result = new Error("Invalid topic");
    else if (!serial) result = new Error("Invalid device serial");
    else if (!value) result = new Error("Invalid value");
    else if (!dateTime) result = new Error("Invalid date");
    else
      result = await storeReadingsUseCase.execute({
        greatness,
        serial,
        value,
        dateTime,
      });

    return result;
  }
}
