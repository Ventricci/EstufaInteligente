import { Devices_Type } from "@prisma/client";

export interface CreateDeviceDTO {
  name: string;
  category: Devices_Type;
  status: boolean;
  serial: string;
  greenhousesid: number;
}
