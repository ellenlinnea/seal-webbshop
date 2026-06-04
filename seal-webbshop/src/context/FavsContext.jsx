import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { getFavorites, addFavorite, removeFavorite } from '../api/favsApi'

// Context för att hantera favoritlistan
// Inloggad användare: synkas mot backenden
// Gäst: sparas i localStorage precis som innan
const FavsContext = createContext()

export function FavsProvider({ children }) {
  const { user } = useAuth()

  // Läser från localStorage när sidan laddas, annars startar vi med tom lista
  const [favs, setFavs] = useState(() => {
    const saved = localStorage.getItem('seal-favs')
    return saved ? JSON.parse(saved) : []
  })

  // Om användaren loggar in - migrera ev. gäst-favoriter från localStorage till backenden
  // och hämta sedan den uppdaterade listan
  // Om användaren loggar ut - läs tillbaka från localStorage
  useEffect(() => {
    async function syncFavs() {
      if (user) {
        const token = localStorage.getItem('seal-token')

        // Kollar om det finns favoriter sparade i localStorage från när användaren var gäst
        const guestFavs = JSON.parse(localStorage.getItem('seal-favs') || '[]')

        // Skickar över ev. gäst-favoriter till backenden så de sparas på kontot
        // Backendens $addToSet hanterar dubbletter automatiskt
        if (guestFavs.length > 0) {
          await Promise.all(guestFavs.map(seal => addFavorite(token, seal._id)))
          // Rensar gäst-favoriterna nu när de har sparats på kontot
          localStorage.removeItem('seal-favs')
        }

        // Hämtar den slutgiltiga listan från backenden
        try {
          const data = await getFavorites(token)
          setFavs(data)
        } catch {
          setFavs([])
        }
      } else {
        const saved = localStorage.getItem('seal-favs')
        setFavs(saved ? JSON.parse(saved) : [])
      }
    }
    syncFavs()
  }, [user])

  // Lägger till eller tar bort en säl från favoriter
  async function toggleFav(seal) {
    if (user) {
      // Inloggad: synka med backenden via favsApi
      const token = localStorage.getItem('seal-token')
      const exists = favs.some(f => f._id === seal._id)

      const updated = exists
        ? await removeFavorite(token, seal._id)
        : await addFavorite(token, seal._id)

      setFavs(updated)
    } else {
      // Gäst: spara i localStorage precis som innan
      const exists = favs.find(f => f._id === seal._id)
      const newFavs = exists ? favs.filter(f => f._id !== seal._id) : [...favs, seal]
      setFavs(newFavs)
      localStorage.setItem('seal-favs', JSON.stringify(newFavs))
    }
  }

  // Kollar om en specifik säl är favorit, används för att visa rätt hjärtikon
  function isFav(sealId) {
    if (user) return favs.some(f => f._id === sealId)
    return favs.some(f => f._id === sealId)
  }

  // Antal favoriter, visas som badge i headern
  const favCount = favs.length

  return (
    // Gör favoritlistan och alla funktioner tillgängliga för alla komponenter under Provider
    <FavsContext.Provider value={{ favs, toggleFav, isFav, favCount }}>
      {children}
    </FavsContext.Provider>
  )
}

// Custom hook så man enkelt kan använda favoriter med useFavs()
export function useFavs() {
  return useContext(FavsContext)
}
