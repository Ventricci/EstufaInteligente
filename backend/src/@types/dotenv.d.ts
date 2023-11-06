declare namespace NodeJS {
  interface ProcessEnv {
    MQTT_HOST: string;
    MQTT_PORT: string;
    MQTT_USERNAME: string;
    MQTT_PASSWORD: string;
    MQTT_CLIENT_ID: string;
    JWT_SECRET: string;
  }
}
