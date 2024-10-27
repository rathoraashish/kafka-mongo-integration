import { Kafka, logLevel, Consumer } from "kafkajs";

class KafkaConfig {
  private kafka: Kafka;
  private consumer: Consumer;
  private brokers: string;

  constructor() {
    this.brokers = 'localhost:9092';
    
    // Initialize the Kafka instance with configuration
    this.kafka = new Kafka({
      clientId: "post-consumer",
      brokers: [this.brokers],
      logLevel: logLevel.INFO,
    });

    // Initialize the consumer
    this.consumer = this.kafka.consumer({
        groupId: 'post-consumer'
    });
  }

  // Connect the consumer
  public async connect(): Promise<void> {
    try {
      await this.consumer.connect();
      console.log("Kafka Consumer connected");
    } catch (error) {
      console.error("Error connecting to Kafka:", error);
    }
  }

  // Disconnect the consumer and admin clients
  public async disconnect(): Promise<void> {
    try {
      await this.consumer.disconnect();
      console.log("Kafka Consumer disconnected");
    } catch (error) {
      console.error("Error disconnecting from Kafka:", error);
    }
  }

   // Subscribe to a kafka topic
   public async subscribeTopic(topic: string): Promise<void> {
    try {
      await this.consumer.subscribe({
        topic, 
        fromBeginning: true
      })
      console.log(`Topic subscribed ${topic}`);
    } catch (error) {
      console.error("Error subscribing topic:", error);
    }
  }

     // Consume messages and process with a callback
    public async consume(callback: (message: any) => void): Promise<void> {
        try {
            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    console.log("Message received:", {
                        topic,
                        partition,
                        value: message.value?.toString(),
                    });

                    try {
                        const parsedMessage = JSON.parse(message.value?.toString() || '{}');
                        callback(parsedMessage);
                    } catch (parseError) {
                        console.error("Error parsing message:", parseError);
                    }
                },
            });
        } catch (error) {
            console.error("Error subscribing topic:", error);
        }
    }

}

export default new KafkaConfig();