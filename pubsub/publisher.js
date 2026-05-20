const Redis = require("ioredis");

// Initialize a Redis client. It connects to 127.0.0.1:6379 by default
const redis = new Redis();

const channel = "updates-channel";

// Publish a message every 2 seconds
setInterval(() => {
  const message = JSON.stringify({ 
    time: new Date().toISOString(), 
    message: "Hello from publisher!" 
  });
  
  // The publish method returns the number of subscribers that received the message
  redis.publish(channel, message)
    .then(receivers => {
      console.log(`Published to ${receivers} subscribers. Message:`, message);
    })
    .catch(err => {
      console.error("Error publishing message:", err);
    });
}, 2000);

console.log(`Publisher started. Publishing to channel: "${channel}" every 2 seconds...`);
