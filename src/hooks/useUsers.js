const API = 'http://localhost:3001'

// Loggar in en användare - hämtar från db baserat på e-post och kollar lösenordet
// OBS: lösenord sparas i klartext här eftersom det är en mock-backend!
// När det byts till Express + MongoDB - använda bcrypt och JWT istället.
export async function loginUser(email, password) {
  const res = await fetch(`${API}/users?email=${email}`)

  if (!res.ok) throw new Error('Kunde inte kontakta servern')

  const users = await res.json()
  const user = users[0]

  // Hittas ingen användare med den e-posten, eller fel lösenord
  if (!user || user.password !== password) {
    throw new Error('Fel e-postadress eller lösenord')
  }

  return user
}

// Skapar ett nytt konto - kollar först att e-posten inte redan används
export async function registerUser(name, email, password) {
  // Kontrollerar om e-posten redan är registrerad
  const checkRes = await fetch(`${API}/users?email=${email}`)
  const existing = await checkRes.json()

  if (existing.length > 0) {
    throw new Error('Det finns redan ett konto med den e-postadressen')
  }

  const res = await fetch(`${API}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  })

  if (!res.ok) throw new Error('Något gick fel när kontot skapades')

  return res.json()
}
