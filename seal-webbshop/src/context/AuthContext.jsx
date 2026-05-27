import { createContext, useContext, useState } from 'react'
import { loginUser, registerUser } from '../api/authApi'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  // kollar med localStorage när appen startar om det finns en inloggad användare sen innan (som inte loggat ut...)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('seal-user')
    return saved ? JSON.parse(saved) : null
  })

  // Sparar användare i state och både användare och token i localStorage
  function saveSession(userData, token) {
    setUser(userData)
    localStorage.setItem('seal-user', JSON.stringify(userData))
    localStorage.setItem('seal-token', token)
  }

  // Loggar in - backenden returnerar { token, user }, inget lösenord i svaret
  async function login(email, password) {
    const { token, user } = await loginUser(email, password)
    saveSession(user, token)
  }

  // Registrerar användare och loggar in direkt - backenden returnerar { token, user }
  async function register(name, email, password) {
    const { token, user } = await registerUser(name, email, password)
    saveSession(user, token)
  }

  // Loggar ut - rensar state och tar bort både användare och token från localStorage
  function logout() {
    setUser(null)
    localStorage.removeItem('seal-user')
    localStorage.removeItem('seal-token')
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
