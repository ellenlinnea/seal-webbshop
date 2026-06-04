const API = import.meta.env.VITE_API_URL

// Hämtar den inloggade användarens favoriter från backenden
export async function getFavorites(token) {
  const res = await fetch(`${API}/favorites`, {
    headers: { Authorization: `Bearer ${token}` }
  })

  if (!res.ok) throw new Error('Kunde inte hämta favoriter')

  return res.json()
}

// Lägger till en säl som favorit hos den inloggade användaren
// Returnerar den uppdaterade favoritlistan
export async function addFavorite(token, sealId) {
  const res = await fetch(`${API}/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ sealId })
  })

  if (!res.ok) throw new Error('Kunde inte lägga till favorit')

  return res.json()
}

// Tar bort en säl från favoriter hos den inloggade användaren
// Returnerar den uppdaterade favoritlistan
export async function removeFavorite(token, sealId) {
  const res = await fetch(`${API}/favorites/${sealId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })

  if (!res.ok) throw new Error('Kunde inte ta bort favorit')

  return res.json()
}
