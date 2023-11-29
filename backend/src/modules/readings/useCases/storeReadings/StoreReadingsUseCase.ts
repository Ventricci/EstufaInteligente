import { Devices_Type } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { StoreReadingsDTO } from "../../dtos/ReadingsDTO";

export class StoreReadingsUseCase {
  async execute({ greatness, serial, value, dateTime }: StoreReadingsDTO) {
    const deviceAlreadyExists = await prisma.devices.findFirst({
      where: {
        serial,
        category: Devices_Type.sensor,
      },
    });

    if (!deviceAlreadyExists) {
      return new Error("Device doesn't exists");
    }

    const reading = await prisma.readings.create({
      data: {
        value,
        devicesid: deviceAlreadyExists.id,
        datetime: dateTime,
        greatness,
      },
    });

    return reading;
  }
}
