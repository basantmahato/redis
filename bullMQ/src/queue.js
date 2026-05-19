import { Queue } from 'bullmq'

export const connection = {
    host: '127.0.0.1',
    port: 6379
}

// Create a Queue for adding jobs
export const emailQueue = new Queue('email-queue', { connection })
