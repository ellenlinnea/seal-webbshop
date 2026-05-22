import { Router } from 'express'
import { getAllSeals, getSealById } from '../controllers/sealsController.js'

const router = Router()

// Hämta alla sälar
router.get('/', getAllSeals)

// Hämta en specifik säl baserat på id
router.get('/:id', getSealById)

export default router
