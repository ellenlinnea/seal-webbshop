import { createContext, useContext, useState } from 'react'
import { loginUser, registerUser } from '../hooks/useUsers'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  // kollar med localStorage när appen startar om det finns en inloggad användare sen innan (som inte loggat ut...)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('seal-user')
    return saved ? JSON.parse(saved) : null
  })

  // Hjälpfunktion som uppdaterar både state och localStorage
  function saveUser(userData) {
    setUser(userData)
    localStorage.setItem('seal-user', JSON.stringify(userData))
  }

  // Loggin-funktion som anropar hook
  async function login(email, password) {
    const loggedInUser = await loginUser(email, password)
    // För att inte spara lösenordet tillsammans med användarinformationen. Destruction?
    const { password: _pw, ...safeUser } = loggedInUser
    saveUser(safeUser)
  }

  // Registrera användare + loggar in direkt efter
  async function register(name, email, password) {
    const newUser = await registerUser(name, email, password)
    const { password: _pw, ...safeUser } = newUser
    saveUser(safeUser)
  }

  // Loggar ut - rensar state och localStorage
  function logout() {
    setUser(null)
    localStorage.removeItem('seal-user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
