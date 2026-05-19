# Redis Learning Repository

This repository is a monorepo setup containing various mini-projects and examples to help learn and experiment with Redis concepts using Node.js and the `ioredis` client.

## 📁 Repository Structure

The repository is organized into distinct sub-projects, each focusing on a specific aspect of Redis and application logic.

- **`setup/`**: A foundational project demonstrating how to connect a Node.js Express application to both Redis and MongoDB. Includes a basic health-check `/ping` route.
- **`key/`**: An exploration of basic Redis String operations. Contains examples of creating, reading, deleting, and setting expiration times (TTL) on simple key-value pairs.
- **`jsonhash/`**: A module aimed at working with more complex Redis data structures like Hashes and RedisJSON.
- **`otp/`**: A practical real-world example using Redis to implement a One-Time Password (OTP) system. Shows how to use `setex` to automatically expire an OTP after a certain time limit, preventing reuse and managing state.

## 🚀 Getting Started

### Prerequisites

You need to have the following installed on your machine:

- [Docker & Docker Compose](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/en/)

### 1. Start the Infrastructure

This repository includes a `docker-compose.yml` file to quickly spin up the required databases (Redis and MongoDB).

Open a terminal at the root of the repository and run:

```bash
docker compose up -d
```

This will start:

- Redis instance on port `6379`
- MongoDB instance on port `27017`

### 2. Run a Sub-Project

To run any of the examples, navigate into its specific directory, install the dependencies, and start the server.

For example, to run the `otp` project:

```bash
cd otp
npm install
npm run dev
```

_(Assuming you have configured `dev` script in your package.json, otherwise use `node src/index.js`)_

The Express server will typically start on `http://localhost:3000`.

## 📌 Common Redis Commands Used

- `SET key value`: Sets the value of a key.
- `GET key`: Gets the value of a key.
- `DEL key`: Deletes a key.
- `EXPIRE key seconds`: Sets a timeout on a key.
- `TTL key`: Gets the time to live for a key.
- `SETEX key seconds value`: Sets the value and expiration in one atomic command (ideal for OTPs and caching).

## 💡 Notes

Make sure that your local firewall allows connections on the configured Docker ports, and remember to stop the Docker containers when you're done experimenting using `docker compose down`.
