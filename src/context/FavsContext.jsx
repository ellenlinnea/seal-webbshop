import { createContext, useContext, useState } from 'react'

//Context för att ha en plats att hantera favoritlistans data, funktioner och synka med LocalStorage.
// Kan då återanvända på flera pages

// Skapar själva context-objektet som håller favoritlistan
const FavsContext = createContext()

export function FavsProvider({ children }) {
  // Läser från localStorage när sidan laddas, annars startar vi med tom lista
  const [favs, setFavs] = useState(() => {
    const saved = localStorage.getItem('seal-favs')
    return saved ? JSON.parse(saved) : []
  })

  // Hjälpfunktion som uppdaterar både state och localStorage samtidigt
  function saveFavs(newFavs) {
    setFavs(newFavs)
    localStorage.setItem('seal-favs', JSON.stringify(newFavs))
  }

  // Lägger till eller tar bort en säl från favoriter beroende på om den redan finns
  function toggleFav(seal) {
    const exists = favs.find(f => f.id === seal.id)
    if (exists) {
      saveFavs(favs.filter(f => f.id !== seal.id))
    } else {
      saveFavs([...favs, seal])
    }
  }

  // Kollar om en specifik säl är favorit, används för att visa rätt hjärtikon
  function isFav(sealId) {
    return favs.some(f => f.id === sealId)
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
