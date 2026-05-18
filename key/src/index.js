import express from 'express'
import Redis from 'ioredis'

const app = express()
app.use(express.json())

const key = 'key123'

app.get('/set-key', async (req, res) => {
    await redis.set(key, 'Hello from Redis!')
    res.send("Key set successfully")
})

app.get('/get-key', async (req, res) => {
    const value = await redis.get(key)
    res.json({ message: value })
})

app.get('/delete-key', async (req, res) => {
    const value = await redis.del(key)
    res.json({ message: value })
})

app.get('/expire-key', async (req, res) => {
    const value = await redis.expire(key, 60)
    res.json({ message: value })
})

app.get('/ttl', async (req, res) => {
    const value = await redis.ttl(key)
    res.json({ message: value })
})

app.get('/', async (req, res) => {
    res.send("Server is running with Redis")
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})