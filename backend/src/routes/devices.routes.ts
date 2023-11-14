import { Router } from "express";
import { CreateDeviceController } from "../modules/devices/useCases/createDevice/CreateDeviceController";
import { GetDeviceStatusController } from "../modules/devices/useCases/getDeviceStatus/GetDeviceStatusController";
import { ListDevicesController } from "../modules/devices/useCases/listDevices/ListDevicesController";

const createDeviceController = new CreateDeviceController();
const getDeviceStatusController = new GetDeviceStatusController();
const listDevicesController = new ListDevicesController();

const devicesRoutes = Router();

devicesRoutes.post("/create", createDeviceController.handle);
devicesRoutes.get("/status/:deviceId", getDeviceStatusController.handle);
devicesRoutes.get("/list/:greenhouseId", listDevicesController.handle);

export { devicesRoutes };
