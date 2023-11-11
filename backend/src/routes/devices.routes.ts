import { Router } from "express";
import { CreateDeviceController } from "../modules/devices/useCases/createDevice/CreateDeviceController";
import { GetDeviceStatusController } from "../modules/devices/useCases/getDeviceStatus/GetDeviceStatusController";

const createDeviceController = new CreateDeviceController();
const getDeviceStatusController = new GetDeviceStatusController();

const devicesRoutes = Router();

devicesRoutes.post("/create", createDeviceController.handle);
devicesRoutes.get("/status/:deviceId", getDeviceStatusController.handle);
// devicesRoutes.get(
//   "/listByGreenhouse/:greenhouse_id",
//   createDeviceController.handle
// );

export { devicesRoutes };
