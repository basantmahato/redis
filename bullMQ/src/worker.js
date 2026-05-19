import { Worker } from 'bullmq'
import { connection } from './queue.js'

// Create a Worker to process jobs in the background
const emailWorker = new Worker('email-queue', async job => {
    const { to, subject, body } = job.data
    console.log(`Processing email job ${job.id} to ${to}...`)
    
    // Simulate some async task like sending an email
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log(`Email job ${job.id} processed successfully!`)
}, { connection })

// Listen to worker events
emailWorker.on('completed', job => {
    console.log(`Job ${job.id} completed!`)
})

emailWorker.on('failed', (job, err) => {
    console.log(`Job ${job.id} failed: ${err.message}`)
})

export default emailWorker
