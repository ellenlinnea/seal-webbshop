import { Router } from 'express'
import { createOrder, getOrderById, getMyOrders } from '../controllers/ordersController.js'
import verifyToken from '../middleware/verifyToken.js'

const router = Router()

// Skapa en ny order - kräver inloggning
router.post('/', verifyToken, createOrder)

// Hämta en specifik order - används på bekräftelsesidan
router.get('/:id', getOrderById)

// Hämta alla ordrar för den inloggade användaren
router.get('/mine', verifyToken, getMyOrders)

export default router
