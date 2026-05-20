const Redis = require("ioredis");

// Initialize a Redis client for subscribing
const redis = new Redis();

const channel = "updates-channel";

// Subscribe to a specific channel
redis.subscribe(channel, (err, count) => {
  if (err) {
    console.error("Failed to subscribe:", err.message);
  } else {
    console.log(`Subscribed successfully! Currently subscribed to ${count} channel(s).`);
  }
});

// Listen for messages on the subscribed channels
redis.on("message", (channel, message) => {
  console.log(`[${channel}] Received message:`, message);
});

console.log(`Subscriber started. Waiting for messages on channel: "${channel}"...`);
