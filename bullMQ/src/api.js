import express from 'express'
import { emailQueue } from './queue.js'

const app = express()
app.use(express.json())

app.post('/send-email', async (req, res) => {
    const { to, subject, body } = req.body
    
    // Add job to the queue
    const job = await emailQueue.add('send-email-job', { to, subject, body })
    
    res.json({ message: "Email queued successfully", jobId: job.id })
})

app.get('/', async (req, res) => {
    res.send("Server is running with BullMQ")
})

export default app
