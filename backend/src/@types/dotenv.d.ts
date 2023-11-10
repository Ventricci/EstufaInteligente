declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    MQTT_HOST: string;
    MQTT_PORT: string;
    MQTT_USERNAME: string;
    MQTT_PASSWORD: string;
    MQTT_CLIENT_ID: string;
    JWT_SECRET: string;
    MQTT_TOPIC_TEMPERATURE: string;
    MQTT_TOPIC_HUMIDITY: string;
  }
}
