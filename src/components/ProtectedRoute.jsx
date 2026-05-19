import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Skyddar sidor som kräver inloggning
// Om användaren inte är inloggad skickas den till login-sidan istället
//Används i App.jsx för att skydda Profile-sidan från icke-inloggade
function ProtectedRoute({ children }) {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" />

  return children
}

export default ProtectedRoute
