# Kafka Node.js Microservices Demo

This project demonstrates a microservices architecture using Apache Kafka, Node.js, Express, and MongoDB. It consists of two services: a post producer and a post consumer.

## System Architecture

- **Post Producer**: REST API service that creates posts and publishes them to Kafka
- **Post Consumer**: Service that consumes post messages and stores them in MongoDB
- **Kafka**: Message broker for async communication between services
- **MongoDB**: Database for storing the consumed posts

## Prerequisites

- Docker and Docker Compose
- Node.js 16+
- MongoDB
- TypeScript

## Services Overview

### Post Producer (Port 3000)
- Creates new posts via REST API
- Manages Kafka topics
- Publishes post messages to Kafka

### Post Consumer (Port 3001)
- Consumes messages from Kafka topic
- Stores posts in MongoDB
- Uses consumer group 'post-consumer'

## Quick Start

1. Start Kafka infrastructure:
```bash
docker-compose up -d
```

2. Start the producer service:
```bash
cd post-producer
npm install
npm run dev
```

3. Start the consumer service:
```bash
cd post-consumer
npm install
npm run dev
```

## Kafka Configuration

- Zookeeper Port: 2181
- Kafka Broker Port: 9092
- Topic Name: post

## Project Structure
```
├── docker-compose.yml
├── post-producer/
├── post-consumer/
└── README.md
```

See individual service READMEs for specific details:
- [Post Producer README](./post-producer/README.md)
- [Post Consumer README](./post-consumer/README.md)