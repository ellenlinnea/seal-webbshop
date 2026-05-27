import { createContext, useContext, useState } from 'react'

//Context för att ha en plats att hantera varukorgens data, funktioner och synka med LocalStorage.
// Kan då återanvända på flera pages

// Skapar själva context-objektet som håller varukorgens data
const CartContext = createContext()

export function CartProvider({ children }) {
  // Läser från localStorage när sidan laddas, annars startar vi med tom varukorg
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('seal-cart')
    return saved ? JSON.parse(saved) : []
  })

  // Håller koll på vilken säl som senast lades till, så popupen vet vad den ska visa
  const [addedSeal, setAddedSeal] = useState(null)

  // Hjälpfunktion som uppdaterar både state och localStorage samtidigt
  function saveCart(newCart) {
    setCart(newCart)
    localStorage.setItem('seal-cart', JSON.stringify(newCart))
  }

  // Lägger till en säl i varukorgen - ska bara gå att lägga till om den inte redan finns där
  function addToCart(seal) {
    const exists = cart.find(item => item._id === seal._id)
    if (exists) return
    saveCart([...cart, seal])
    setAddedSeal(seal) // Visar popupen med denna säl
  }

  // Stänger popupen
  function clearAddedSeal() {
    setAddedSeal(null)
  }

  // Tar bort en säl från varukorgen baserat på id
  function removeFromCart(sealId) {
    saveCart(cart.filter(item => item._id !== sealId))
  }

  // Tömmer hela varukorgen, t.ex. efter genomförd beställning
  function clearCart() {
    saveCart([])
  }

  // Antal sälar i varukorgen
  const cartCount = cart.length

  return (
    // Gör cart och alla funktioner tillgängliga för alla komponenter under Provider
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartCount, addedSeal, clearAddedSeal }}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook så man enkelt kan använda varukorgen med useCart()
export function useCart() {
  return useContext(CartContext)
}
