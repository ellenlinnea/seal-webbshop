import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('seal-cart')
    return saved ? JSON.parse(saved) : []
  })

  function saveCart(newCart) {
    setCart(newCart)
    localStorage.setItem('seal-cart', JSON.stringify(newCart))
  }

  function addToCart(seal) {
    const exists = cart.find(item => item.id === seal.id)
    if (exists) {
      saveCart(cart.map(item =>
        item.id === seal.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      saveCart([...cart, { ...seal, quantity: 1 }])
    }
  }

  function removeFromCart(sealId) {
    saveCart(cart.filter(item => item.id !== sealId))
  }

  function clearCart() {
    saveCart([])
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
