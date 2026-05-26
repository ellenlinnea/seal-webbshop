import { Router } from 'express'
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favoritesController.js'
import verifyToken from '../middleware/verifyToken.js'

const router = Router()

// Hämta den inloggade användarens favoriter
router.get('/', verifyToken, getFavorites)

// Lägg till en säl i favoriter
router.post('/', verifyToken, addFavorite)

// Ta bort en säl från favoriter
router.delete('/:sealId', verifyToken, removeFavorite)

export default router
