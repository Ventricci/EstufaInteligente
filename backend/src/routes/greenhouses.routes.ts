import e, { Router } from "express";
import { CreateGreenhouseController } from "../modules/greenhouses/useCases/createGreenhouse/CreateGreenhouseController";
import { ListGreenhousesController } from "../modules/greenhouses/useCases/listGreenhouses/ListGreenhousesController";
import { GetGreenhouseController } from "../modules/greenhouses/useCases/getGreenhouse/GetGreenhouseController";
import { UpdateGreenhouseController } from "../modules/greenhouses/useCases/updateGreenhouse/UpdateGreenhouseController";
import { DeleteGreenhouseController } from "../modules/greenhouses/useCases/deleteGreenhouse/DeleteGreenhouseController";

import fs from "fs";
import { IRoute } from ".";

const listGreenhousesController = new ListGreenhousesController();
const getGreenhouseController = new GetGreenhouseController();
const createGreenhouseController = new CreateGreenhouseController();
const updateGreenhouseController = new UpdateGreenhouseController();
const deleteGreenhouseController = new DeleteGreenhouseController();

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
      } else if (r.route.path === "/update/:id") {
        routesList.push({
          method: Object.keys(r.route.methods)[0].toUpperCase(),
          path: `greenhouses${r.route.path}`,
          body: {
            name: "Estufa 1",
            idealTemperature: 30,
            idealHumidity: 60,
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

greenhousesRoutes.get("/list", listGreenhousesController.handle);
greenhousesRoutes.get("/get/:greenhouseId", getGreenhouseController.handle);
greenhousesRoutes.post("/create", createGreenhouseController.handle);
greenhousesRoutes.put("/update/:id", updateGreenhouseController.handle);
greenhousesRoutes.delete("/delete/:id", deleteGreenhouseController.handle);

export { greenhousesRoutes };
