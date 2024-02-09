const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const authRouter = require('./routes/auth.route')
const fileRouter = require('./routes/file.route')
const app = express()
const corsMiddleware = require('./middleware/cors.middleware')

app.use(corsMiddleware)
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/files", fileRouter)

const PORT = config.get('serverPort')

const start = async () => {
    try {
        await mongoose.connect(config.get('dbUrl'))
        app.listen(PORT, () => {
            console.log('Server started on port', PORT)
        })
    }catch (e){

    }
}

start()
