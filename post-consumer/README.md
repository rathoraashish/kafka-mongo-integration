# Post Consumer Service

Service that consumes post messages from Kafka and stores them in MongoDB.

## Features

- Kafka consumer implementation
- MongoDB integration
- Automatic message consumption
- TypeScript support

## Configuration

- Server Port: 3001
- Kafka Broker: localhost:9092
- Consumer Group: post-consumer
- MongoDB Collection: posts

## Setup & Running

1. Install dependencies:
```bash
npm install
```

2. Start the service:
```bash
npm run dev
```

## Dependencies

- kafkajs
- mongoose
- TypeScript
- Other project-specific dependencies

## Environment Variables

Create a `.env` file:
```
PORT=3001
KAFKA_BROKER=localhost:9092
MONGODB_URI=mongodb://localhost:27017/posts
```

## Project Structure
```
src/
├── config/
│   ├── db.config.ts
│   └── kafka.config.ts
├── model/
│   ├── posts.ts
├── services/
│   └── post.consumer.ts
|index.ts
└start-service.ts
```

## MongoDB Schema

```typescript
interface Post {
  title: string;
  content: string;
  createdAt: Date;
}
```