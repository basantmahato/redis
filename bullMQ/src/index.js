import app from './api.js'
import './worker.js'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
