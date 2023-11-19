import { Router } from "express";
import { GetReadingsController } from "../modules/readings/useCases/getReadings/GetReadingsController";
import { GetLastReadingController } from "../modules/readings/useCases/getLastReading/GetLastReadingController";
import { GetLatestReadingsController } from "../modules/readings/useCases/getLatestReadings/GetLatestReadingsController";

const getReadingsController = new GetReadingsController();
const getLastReadingsController = new GetLastReadingController();
const getLatestReadingsController = new GetLatestReadingsController();

const readingsRoutes = Router();

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
