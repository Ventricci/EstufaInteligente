import { Router } from "express";
import { CreateDeviceController } from "../modules/devices/useCases/createDevice/CreateDeviceController";
import { GetDeviceStatusController } from "../modules/devices/useCases/getDeviceStatus/GetDeviceStatusController";
import { ListDevicesController } from "../modules/devices/useCases/listDevices/ListDevicesController";

import fs from "fs";
import { IRoute } from ".";

const createDeviceController = new CreateDeviceController();
const getDeviceStatusController = new GetDeviceStatusController();
const listDevicesController = new ListDevicesController();

const devicesRoutes = Router();

export function listDevicesRoutes() {
  const routesList: IRoute[] = [];
  devicesRoutes.stack.forEach((r) => {
    if (r.route && r.route.path) {
      if (r.route.path === "/create") {
        routesList.push({
          method: Object.keys(r.route.methods)[0].toUpperCase(),
          path: `devices${r.route.path}`,
          body: {
            name: "Nome do dispositivo",
            category: "Categoria do dispositivo",
            status: "Status do dispositivo",
            serial: "Serial do dispositivo",
            greenhouseId: "id",
          },
        });
        return;
      }
      routesList.push({
        method: Object.keys(r.route.methods)[0].toUpperCase(),
        path: `devices${r.route.path}`,
      });
    }
  });

  if (!fs.existsSync("docs")) {
    fs.mkdirSync("docs");
  }
  fs.writeFileSync(
    "docs/devicesRoutes.json",
    JSON.stringify(routesList, null, 2)
  );
}

devicesRoutes.post("/create", createDeviceController.handle);
devicesRoutes.get("/status/:deviceId", getDeviceStatusController.handle);
devicesRoutes.get("/list/:greenhouseId", listDevicesController.handle);

export { devicesRoutes };
