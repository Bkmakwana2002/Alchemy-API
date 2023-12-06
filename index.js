const express = require('express')
const app = express()
const connectDB = require('./db')
const transaction_routes = require('./routes/transactions')
const token_routes = require('./routes/token')
const nft_routes = require('./routes/nft')
const user_routes = require('./routes/user')
const { rateLimit } = require('express-rate-limit')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
require("dotenv").config({ path: './.env' })
connectDB()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    standardHeaders: true, 
    legacyHeaders: false, 
})

app.use(limiter)
app.use('/api', transaction_routes)
app.use('/api', token_routes)
app.use('/api', nft_routes)
app.use('/api', user_routes)

app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`)
})