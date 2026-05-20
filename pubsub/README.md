# Redis Pub/Sub Example

This folder contains a simple demonstration of Redis Publish/Subscribe functionality using Node.js and the `ioredis` library.

## Setup
Make sure you have Redis running (either locally or via Docker).
If you haven't installed dependencies yet, run:
```bash
npm install
```

## How to run

You'll need two separate terminal windows.

**Terminal 1 (Subscriber):**
This script listens for messages on the `updates-channel` channel.
```bash
npm run start:subscriber
# or run: node subscriber.js
```

**Terminal 2 (Publisher):**
This script publishes a JSON message to the `updates-channel` channel every 2 seconds.
```bash
npm run start:publisher
# or run: node publisher.js
```

When both are running, you will see the publisher sending messages and the subscriber logging the received messages in real time!
