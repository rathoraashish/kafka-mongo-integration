# Post Producer Service

REST API service that creates posts and publishes them to Kafka.

## Features

- Express.js REST API
- Kafka producer implementation
- Topic management
- TypeScript support

## API Endpoints

### Create Post
```
POST /create-post
```

**Request Body:**
```json
{
  "title": "string",
  "content": "string"
}
```

## Configuration

- Server Port: 3000
- Kafka Broker: localhost:9092
- Topic Name: post

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

- Express.js
- kafkajs
- TypeScript
- Other project-specific dependencies

## Environment Variables

Create a `.env` file:
```
PORT=3000
KAFKA_BROKER=localhost:9092
```

## Project Structure
```
src/
├── config/
│   └── kafka.config.ts
├── routes/
│   └── route.ts
├── service/
│   └── create-post.ts
|── index.ts
|── start-service.ts
```