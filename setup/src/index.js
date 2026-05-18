import express from 'express'
import Redis from 'ioredis'
import mongoose from 'mongoose'

const app = express()
app.use(express.json())

// Connect to Redis
const redis = new Redis({
    host: '127.0.0.1',
    port: 6379
})

redis.on('connect', () => console.log('✅ Connected to Redis'))
redis.on('error', (err) => console.error('❌ Redis connection error:', err))

// Connect to MongoDB
const mongoURI = 'mongodb://admin:password@127.0.0.1:27017/?authSource=admin'
mongoose.connect(mongoURI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err))

app.get('/ping', async (req, res) => {
    try {
        // Ping Redis
        const redisPing = await redis.ping()
        
        // Ping MongoDB
        const mongoState = mongoose.connection.readyState
        const mongoStatus = mongoState === 1 ? 'PONG' : 'DISCONNECTED'

        res.json({
            redis: redisPing,
            mongodb: mongoStatus
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})