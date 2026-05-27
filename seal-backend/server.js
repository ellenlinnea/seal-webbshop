import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/dbConnection.js'
import sealsRouter from './routes/seals.js'
import authRouter from './routes/auth.js'
import ordersRouter from './routes/orders.js'
import favoritesRouter from './routes/favorites.js'

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: ['http://localhost:5173', 'https://seal-webbshop.onrender.com']
}))
app.use(express.json())

// Alla anrop som börjar med /api/seals skickas till sealsRouter
app.use('/api/seals', sealsRouter)

// Alla anrop som börjar med /api/auth skickas till authRouter
app.use('/api/auth', authRouter)

// Alla anrop som börjar med /api/orders skickas till ordersRouter
app.use('/api/orders', ordersRouter)

// Alla anrop som börjar med /api/favorites skickas till favoritesRouter
app.use('/api/favorites', favoritesRouter)

app.listen(PORT, () => console.log(`Servern körs på port ${PORT}`))
