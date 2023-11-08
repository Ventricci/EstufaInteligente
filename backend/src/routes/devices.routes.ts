import { Router } from "express";
import { CreateDeviceController } from "../modules/devices/useCases/createDevice/CreateDeviceController";

const createDeviceController = new CreateDeviceController();

const devicesRoutes = Router();

devicesRoutes.post("/create", createDeviceController.handle);
devicesRoutes.get(
  "/listByGreenhouse/:greenhouse_id",
  createDeviceController.handle
);
