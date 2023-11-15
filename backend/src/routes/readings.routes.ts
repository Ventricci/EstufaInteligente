import { Router } from "express";
import { GetReadingsController } from "../modules/readings/useCases/getReadings/GetReadingsController";
import { GetLastReadingController } from "../modules/readings/useCases/getLastReading/GetLastReadingController";

const getReadingsController = new GetReadingsController();
const getLastReadingsController = new GetLastReadingController();

const readingsRoutes = Router();

readingsRoutes.get(
  "/:greenhousesid/:greatness/:initialDate/:finalDate",
  getReadingsController.handle
);
readingsRoutes.get(
  "/last/:deviceId/:greatness",
  getLastReadingsController.handle
);

export { readingsRoutes };
