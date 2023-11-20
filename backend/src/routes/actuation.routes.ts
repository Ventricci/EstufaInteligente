import { Router } from "express";
import { SendActuationController } from "../modules/mqtt/useCases/sendActuation/SendActuationController";
import { mqttClient } from "../server";

const sendActuationController = new SendActuationController();

const actuationRoutes = Router();

actuationRoutes.post("/:deviceId/", sendActuationController.handle);

// teste de atuação
// actuationRoutes.post("/test/", (request, response) => {
//   console.log(request.body);
//   const { topic, message } = request.body;
//   const result = mqttClient.sendMessage(topic, message);

//   if (!result) {
//     return response
//       .status(400)
//       .send({ errorMessage: "Ocorreu um erro ao enviar a mensagem" });
//   } else {
//     // Se inscrever no tópico RESPOSTA/<serial>
//     mqttClient.subscribe(`RESPOSTA/db853040-7cf3-11ee-b962-0242ac120002`);
//     return response
//       .status(200)
//       .send({ successMessage: "Solicitação de atuação enviada." });
//   }
// });

export { actuationRoutes };
