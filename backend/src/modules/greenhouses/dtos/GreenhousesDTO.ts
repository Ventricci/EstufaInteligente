export interface CreateGreenhouseDTO {
  name: string;
  idealTemperature?: number;
  idealHumidity?: number;
  user_cpf: string;
  address_id: number;
}

export interface ListGreenhousesDTO {
  user_cpf: string;
}
