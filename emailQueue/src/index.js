import express from 'express'
import Redis from 'ioredis'

const app = express()
app.use(express.json())

const redis = new Redis({
    host: '127.0.0.1',
    port: 6379
})

app.post('/send-email', async (req, res) => {
    const { to, subject, body } = req.body
    await redis.lpush('email-queue', JSON.stringify({ to, subject, body }))
    res.send("Email sent successfully")
})

app.get('/email/process', async (req, res) => {
    const email = await redis.rpop('email-queue')
    if (email) {
        res.json(JSON.parse(email))
    } else {
        res.send("No email in queue")
    }
})


app.get('/', async (req, res) => {
    res.send("Server is running with Redis")
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})