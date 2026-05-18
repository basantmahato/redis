import express from 'express'
import Redis from 'ioredis'

const app = express()
app.use(express.json())

const redis = new Redis({
    host: '127.0.0.1',
    port: 6379
})


function generateOtp(phone) {
    const min = Math.ceil(100000)
    const max = Math.floor(999999)

    return Math.floor(Math.random() * (max - min + 1))
}

app.post('/send-otp', async (req, res) => {
    try {
        const { phone } = req.body

        const key = `otp:${phone}`

        const existingOtp = await redis.get(key)
        if (existingOtp) {
            return res.status(400).json({ message: 'OTP already sent. Please try again after some time.' })
        }

        const otp = generateOtp(phone)

        await redis.setex(key, 60, otp)

        res.status(200).json({ message: 'OTP sent successfully' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Failed to send OTP' })
    }
})

app.post('/verify-otp', async (req, res) => {
    try {
        const { phone, otp } = req.body

        const key = `otp:${phone}`

        const storedOtp = await redis.get(key)

        if (!storedOtp) {
            return res.status(400).json({ message: 'OTP expired or invalid' })
        }

        if (storedOtp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' })
        }

        await redis.del(key)

        res.status(200).json({ message: 'OTP verified successfully' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Failed to verify OTP' })
    }   
})

app.get('/otp/:phone/ttl', async (req, res) => {
    try {
        const { phone } = req.params
        const key = `otp:${phone}`
        const ttl = await redis.ttl(key)
        res.json({ ttl })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Failed to get OTP TTL' })
    }
})


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
