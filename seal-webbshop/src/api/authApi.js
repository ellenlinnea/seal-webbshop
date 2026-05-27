const API = import.meta.env.VITE_API_URL

// Loggar in en användare - skickar email och lösenord till backenden
// Backenden jämför med bcrypt och svarar med token + användarinfo om det stämmer
export async function loginUser(email, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Något gick fel vid inloggningen')
  }

  // Returnerar { token, user } - tas emot av AuthContext
  return res.json()
}

// Skapar ett nytt konto - skickar namn, email och lösenord till backenden
// Backenden hashar lösenordet och svarar med token + användarinfo direkt
export async function registerUser(name, email, password) {
  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  })

  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Något gick fel när kontot skapades')
  }

  // Returnerar { token, user } - tas emot av AuthContext
  return res.json()
}
