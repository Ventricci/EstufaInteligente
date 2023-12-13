import { Router } from "express";
import { GetReadingsController } from "../modules/readings/useCases/getReadings/GetReadingsController";
import { GetLastReadingController } from "../modules/readings/useCases/getLastReading/GetLastReadingController";
import { GetLatestReadingsController } from "../modules/readings/useCases/getLatestReadings/GetLatestReadingsController";

import fs from "fs";
import { IRoute } from ".";

const getReadingsController = new GetReadingsController();
const getLastReadingsController = new GetLastReadingController();
const getLatestReadingsController = new GetLatestReadingsController();

const readingsRoutes = Router();

export function listReadingsRoutes() {
  const routesList: IRoute[] = [];
  readingsRoutes.stack.forEach((r) => {
    if (r.route && r.route.path) {
      routesList.push({
        method: Object.keys(r.route.methods)[0].toUpperCase(),
        path: `readings${r.route.path}`,
      });
    }
  });

  if (!fs.existsSync("docs")) {
    fs.mkdirSync("docs");
  }
  fs.writeFileSync(
    "docs/readingsRoutes.json",
    JSON.stringify(routesList, null, 2)
  );
}

readingsRoutes.get(
  "/interval/:greenhousesid/:greatness/:initialDate/:finalDate",
  getReadingsController.handle
);

readingsRoutes.get(
  "/last/:deviceId/:greatness",
  getLastReadingsController.handle
);

readingsRoutes.get(
  "/latest/:deviceId/:greatness/:initialDate",
  getLatestReadingsController.handle
);

export { readingsRoutes };
