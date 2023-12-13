import { Router } from "express";
import { CreateGreenhouseController } from "../modules/greenhouses/useCases/createGreenhouse/CreateGreenhouseController";
import { ListGreenhousesController } from "../modules/greenhouses/useCases/listGreenhouses/ListGreenhousesController";
import { GetGreenhouseController } from "../modules/greenhouses/useCases/getGreenhouse/GetGreenhouseController";

import fs from "fs";
import { IRoute } from ".";

const listGreenhousesController = new ListGreenhousesController();
const getGreenhouseController = new GetGreenhouseController();
const createGreenhouseController = new CreateGreenhouseController();

const greenhousesRoutes = Router();

export function listGreenhousesRoutes() {
  const routesList: IRoute[] = [];
  greenhousesRoutes.stack.forEach((r) => {
    if (r.route && r.route.path) {
      if (r.route.path === "/create") {
        routesList.push({
          method: Object.keys(r.route.methods)[0].toUpperCase(),
          path: `greenhouses${r.route.path}`,
          body: {
            name: "Estufa 1",
            idealTemperature: 25,
            idealHumidity: 50,
            address_id: 1,
          },
        });
        return;
      }
      routesList.push({
        method: Object.keys(r.route.methods)[0].toUpperCase(),
        path: `greenhouses${r.route.path}`,
      });
    }
  });

  if (!fs.existsSync("docs")) {
    fs.mkdirSync("docs");
  }
  fs.writeFileSync(
    "docs/greenhousesRoutes.json",
    JSON.stringify(routesList, null, 2)
  );
}

greenhousesRoutes.get("/listGreenhouses", listGreenhousesController.handle);
greenhousesRoutes.get("/:greenhouseId", getGreenhouseController.handle);
greenhousesRoutes.post("/create", createGreenhouseController.handle);

export { greenhousesRoutes };
