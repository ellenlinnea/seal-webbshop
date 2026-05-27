import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

// Context för att hantera favoritlistan
// Inloggad användare: synkas mot backenden
// Gäst: sparas i localStorage precis som innan
const FavsContext = createContext()

const API = 'http://localhost:5000/api'

export function FavsProvider({ children }) {
  const { user } = useAuth()

  // Läser från localStorage när sidan laddas, annars startar vi med tom lista
  const [favs, setFavs] = useState(() => {
    const saved = localStorage.getItem('seal-favs')
    return saved ? JSON.parse(saved) : []
  })

  // Om användaren loggar in - hämta favoriter från backenden istället
  // Om användaren loggar ut - läs tillbaka från localStorage
  useEffect(() => {
    if (user) {
      const token = localStorage.getItem('seal-token')
      fetch(`${API}/favorites`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setFavs(data))
        .catch(() => setFavs([]))
    } else {
      const saved = localStorage.getItem('seal-favs')
      setFavs(saved ? JSON.parse(saved) : [])
    }
  }, [user])

  // Lägger till eller tar bort en säl från favoriter
  async function toggleFav(seal) {
    if (user) {
      // Inloggad: synka med backenden
      const token = localStorage.getItem('seal-token')
      const exists = favs.some(f => f._id === seal._id)

      if (exists) {
        const res = await fetch(`${API}/favorites/${seal._id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        })
        const updated = await res.json()
        setFavs(updated)
      } else {
        const res = await fetch(`${API}/favorites`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ sealId: seal._id })
        })
        const updated = await res.json()
        setFavs(updated)
      }
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
