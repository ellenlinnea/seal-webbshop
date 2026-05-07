import { createContext, useContext, useState } from 'react'

const FavsContext = createContext()

export function FavsProvider({ children }) {
  const [favs, setFavs] = useState(() => {
    const saved = localStorage.getItem('seal-favs')
    return saved ? JSON.parse(saved) : []
  })

  function saveFavs(newFavs) {
    setFavs(newFavs)
    localStorage.setItem('seal-favs', JSON.stringify(newFavs))
  }

  function toggleFav(seal) {
    const exists = favs.find(f => f.id === seal.id)
    if (exists) {
      saveFavs(favs.filter(f => f.id !== seal.id))
    } else {
      saveFavs([...favs, seal])
    }
  }

  function isFav(sealId) {
    return favs.some(f => f.id === sealId)
  }

  const favCount = favs.length

  return (
    <FavsContext.Provider value={{ favs, toggleFav, isFav, favCount }}>
      {children}
    </FavsContext.Provider>
  )
}

export function useFavs() {
  return useContext(FavsContext)
}
