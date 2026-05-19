import express from 'express'
import Redis from 'ioredis'

const app = express()
app.use(express.json())

const redis = new Redis({
    host: '127.0.0.1',
    port: 6379
})

//Users API with JSON data

app.post('/user/:id', async (req, res) => {
    const id = req.params.id
    const user = req.body
    await redis.set(`user:${id}`, JSON.stringify(user))
    res.send("User created successfully")
})

app.get('/user/:id', async (req, res) => {
    const id = req.params.id
    const user = await redis.get(`user:${id}`)
    res.json(JSON.parse(user))
})

app.delete('/user/:id', async (req, res) => {
    const id = req.params.id
    await redis.del(`user:${id}`)
    res.send("User deleted successfully")
})

app.put('/user/:id', async (req, res) => {
    const id = req.params.id
    const user = req.body
    await redis.set(`user:${id}`, JSON.stringify(user))
    res.send("User updated successfully")
})

//User api with hash

app.post('/user/:id', async (req, res) => {
    const id = req.params.id
    const user = req.body
    await redis.hset(`user:${id}`, user)
    res.send("User created successfully")
})

app.get('/user/:id', async (req, res) => {
    const id = req.params.id
    const user = await redis.hgetall(`user:${id}`)
    res.json(user)
})

app.delete('/user/:id', async (req, res) => {
    const id = req.params.id
    await redis.del(`user:${id}`)
    res.send("User deleted successfully")
})

app.put('/user/:id', async (req, res) => {
    const id = req.params.id
    const user = req.body
    await redis.hset(`user:${id}`, user)
    res.send("User updated successfully")
})


//End


app.get('/', async (req, res) => {
    res.send("Server is running with Redis")
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})