import { Router } from 'express'
import { createOrder, getOrderById, getMyOrders } from '../controllers/ordersController.js'
import verifyToken from '../middleware/verifyToken.js'
import optionalAuth from '../middleware/optionalAuth.js'

const router = Router()

// Skapa en ny order - fungerar både för inloggade och gäster
// optionalAuth sätter req.user om token finns, annars behandlas det som gäst-köp
router.post('/', optionalAuth, createOrder)

// Hämta alla ordrar för den inloggade användaren - måste vara före /:id annars matchar Express "mine" som ett id
router.get('/mine', verifyToken, getMyOrders)

// Hämta en specifik order - används på bekräftelsesidan
router.get('/:id', getOrderById)

export default router
