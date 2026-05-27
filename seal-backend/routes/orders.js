import { Router } from 'express'
import { createOrder, getOrderById, getMyOrders } from '../controllers/ordersController.js'
import verifyToken from '../middleware/verifyToken.js'

const router = Router()

// Skapa en ny order - kräver inloggning
router.post('/', verifyToken, createOrder)

// Hämta alla ordrar för den inloggade användaren - måste vara före /:id annars matchar Express "mine" som ett id
router.get('/mine', verifyToken, getMyOrders)

// Hämta en specifik order - används på bekräftelsesidan
router.get('/:id', getOrderById)

export default router
