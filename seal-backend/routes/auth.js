import { Router } from 'express'
import { register, login } from '../controllers/authController.js'

const router = Router()

// Skapa ett nytt konto
router.post('/register', register)

// Logga in med befintligt konto
router.post('/login', login)

export default router
