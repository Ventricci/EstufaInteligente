import { Readings_Greatness } from "@prisma/client";

export interface GetReadingsDTO {
  greenhouseId: number;
  greatness: Readings_Greatness;
  initialDate: Date;
  finalDate: Date;
}

export interface StoreReadingsDTO {
  serial: string;
  greatness: Readings_Greatness;
  value: number;
  dateTime: Date;
}
