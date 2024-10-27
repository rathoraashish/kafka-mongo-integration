import { Admin, Kafka, logLevel, Producer, Message } from "kafkajs";

class KafkaConfig {
  private kafka: Kafka;
  private producer: Producer;
  private admin: Admin;
  private brokers: string;

  constructor() {
    this.brokers = 'localhost:9092';
    
    // Initialize the Kafka instance with configuration
    this.kafka = new Kafka({
      clientId: "post-producer",
      brokers: [this.brokers],
      logLevel: logLevel.INFO,
    });

    // Initialize the producer and admin clients
    this.producer = this.kafka.producer();
    this.admin = this.kafka.admin();
  }

  // Connect the producer and admin clients
  public async connect(): Promise<void> {
    try {
      await this.producer.connect();
      await this.admin.connect();
      console.log("Kafka Producer and Admin connected");
    } catch (error) {
      console.error("Error connecting to Kafka:", error);
    }
  }

  // Disconnect the producer and admin clients
  public async disconnect(): Promise<void> {
    try {
      await this.producer.disconnect();
      await this.admin.disconnect();
      console.log("Kafka Producer and Admin disconnected");
    } catch (error) {
      console.error("Error disconnecting from Kafka:", error);
    }
  }

  // Create a topic if it doesn't already exist
  public async createTopic(topic: string): Promise<void> {
    try {
      const topics = await this.admin.listTopics();
      if (!topics.includes(topic)) {
        await this.admin.createTopics({
          topics: [{ topic, numPartitions: 1, replicationFactor: 1 }],
        });
        console.log(`Topic ${topic} created`);
      } else {
        console.log(`Topic ${topic} already exists`);
      }
    } catch (error) {
      console.error("Error creating topic:", error);
    }
  }

   // Send a message to a specified Kafka topic
   public async sendMessage(topic: string, message: string): Promise<void> {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: message }],
      });
      console.log(`Message sent to topic ${topic}`);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
}

export default new KafkaConfig();