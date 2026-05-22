import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/dbConnection.js'

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.listen(PORT, () => console.log(`Servern körs på port ${PORT}`))
