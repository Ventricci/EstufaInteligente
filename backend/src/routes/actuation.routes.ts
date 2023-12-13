import { Router } from "express";
import { SendActuationController } from "../modules/mqtt/useCases/sendActuation/SendActuationController";
import { mqttClient } from "../server";

import fs from "fs";
import { IRoute } from ".";

const sendActuationController = new SendActuationController();

const actuationRoutes = Router();

export function listActuationRoutes() {
  const routesList: IRoute[] = [];
  actuationRoutes.stack.forEach((r) => {
    if (r.route && r.route.path) {
      routesList.push({
        method: Object.keys(r.route.methods)[0].toUpperCase(),
        path: `actuation${r.route.path}`,
      });
    }
  });

  if (!fs.existsSync("docs")) {
    fs.mkdirSync("docs");
  }
  fs.writeFileSync(
    "docs/actuationRoutes.json",
    JSON.stringify(routesList, null, 2)
  );
}

actuationRoutes.post("/:deviceId/", sendActuationController.handle);

export { actuationRoutes };
