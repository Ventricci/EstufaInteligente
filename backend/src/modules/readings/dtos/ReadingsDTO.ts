import { Readings_Greatness } from "@prisma/client";

export interface GetReadingsDTO {
  greatness: Readings_Greatness;
  initialDate: Date;
  finalDate: Date;
  deviceId: number;
}

export interface StoreReadingsDTO {
  greatness: Readings_Greatness;
  deviceId: number;
  value: number;
  dateTime: Date;
}
