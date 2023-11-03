import * as mqtt from "mqtt";
import dotenv from "dotenv";
import { StoreReadingsController } from "./modules/readings/storeReadings/StoreReadingsController";
import { Readings } from "@prisma/client";

dotenv.config();

const TESTTOPIC = "test";
const TEMPTOPIC = "MONITORAMENTO/TEMPERATURA";
const HUMITOPIC = "MONITORAMENTO/UMIDADE";
const LUMITOPIC = "ACIONAMENTO/LUMINOSIDADE";

class MqttHandler {
  private client: mqtt.MqttClient | null;
  private endPoint: string;
  private username: string;
  private password: string;
  private protocol: mqtt.MqttProtocol;
  private storeReadingsController: any;

  constructor() {
    this.client = null;
    this.endPoint = `${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`;
    this.username = process.env.MQTT_USERNAME;
    this.password = process.env.MQTT_PASSWORD;
    this.protocol = "mqtts";

    this.storeReadingsController = new StoreReadingsController();
  }

  public connect() {
    this.client = mqtt.connect(this.endPoint, {
      clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
      username: this.username,
      password: this.password,
      protocol: this.protocol,
    });

    this.client.on("error", (error) => {
      console.log(`[x] Não foi possível conectar ao broker: ${error}`);
      console.log("[...] Tentando reconectar em 10 segundos");
      setTimeout(() => {
        this.connect();
      }, 1000 * 10);
    });

    this.client.on("connect", () => {
      console.log("[✓] Conectado ao broker!\n");
    });

    this.client.connected &&
      this.client.subscribe([TEMPTOPIC, HUMITOPIC], (error) => {
        if (error) {
          console.log(
            `[x] Não foi possível se inscrever nos tópicos: ${error}\n`
          );
        } else {
          console.log(
            `[✓] Inscrito nos seguintes tópicos:\n- ${TEMPTOPIC}\n- ${HUMITOPIC}\n`
          );
        }
      });

    this.client.on("message", (topic, message) => {
      console.log(`[✓] Recebido mensagem do tópico ${topic}: "${message}"\n`);
      if (topic === TEMPTOPIC || topic === HUMITOPIC) {
        console.log("[_] Armazenando dados no banco de dados...");
        this.storeReadingsController
          .handle(topic, message.toString())
          .then((result: Readings | Error) => {
            if (result instanceof Error) {
              console.log(
                `[x] Não foi possível armazenar os dados: ${result}\n`
              );
            } else {
              console.log("[✓] Dados armazenados com sucesso!\n");
            }
          });
      }
    });

    this.client.on("close", () => {
      console.log("[x] Conexão com o broker fechada.\n");
    });

    this.client.on("offline", () => {
      console.log("[x] Client offline.\n");
    });

    this.client.on("reconnect", () => {
      console.log("[...] Tentando reconectar ao broker...");
    });
  }

  public async sendMessage(topic: string, message: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this.client && this.client.connected) {
        this.client.publish(topic, message, { qos: 2 }, (error) => {
          if (error) {
            console.log(`[x] Não foi possível enviar a mensagem: ${error}\n`);
            reject(false); // Rejeitando a promessa com "false" em caso de erro
          } else {
            console.log("[✓] Mensagem enviada com sucesso!\n");
            resolve(true); // Resolvendo a promessa com "true" em caso de sucesso
          }
        });
      } else {
        console.log(
          "[x] Não foi possível enviar a mensagem: Client não conectado.\n"
        );
        reject(false); // Rejeitando a promessa com "false" em caso de erro
      }
    });
  }
}

export { MqttHandler };