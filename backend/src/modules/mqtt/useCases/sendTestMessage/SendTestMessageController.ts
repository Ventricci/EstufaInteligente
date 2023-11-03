import { Request, Response } from "express";
import { SendTestMessageUseCase } from "./SendtestMessageUsecase";

export class SendTestMessageController {
  async handle(request: Request, response: Response) {
    const { topic, message } = request.body;
    const sendTestMessageUseCase = new SendTestMessageUseCase();

    const result = await sendTestMessageUseCase.execute({ topic, message });

    if (result) {
      return response
        .status(200)
        .send("Sua mensagem de teste foi enviada com sucesso!");
    } else {
      return response
        .status(400)
        .send("Ocorreu um erro ao enviar sua mensagem."); // TODO: Verificar se é o melhor status code
    }
  }
}
