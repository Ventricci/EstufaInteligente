import { Devices_Type } from "@prisma/client";

export interface CreateDeviceDTO {
  name: string;
  category: Devices_Type;
  status: boolean;
  serial: string;
  greenhousesid: number;
}

export interface ListDevicesByGreenhouseDTO {
  greenhouse_id: number;
  user_cpf: string;
}
