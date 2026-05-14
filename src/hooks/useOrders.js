const API = 'http://localhost:3001'

// Skickar en ny order till databasen
// Returnerar den sparade ordern med id om det gick bra, annars kastas ett fel
export async function createOrder(cart, customer, total) {
  const order = {
    customer,
    items: cart,
    total,
    date: new Date().toISOString()
  }

  const res = await fetch(`${API}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  })

  if (!res.ok) throw new Error('Något gick fel när ordern skickades')

  return res.json()
}

// Hämtar en enskild order baserat på id - används på bekräftelsesidan
export async function getOrder(id) {
  const res = await fetch(`${API}/orders/${id}`)

  if (!res.ok) throw new Error('Kunde inte hämta ordern')

  return res.json()
}

// Hämtar alla ordrar för en specifik användare baserat på e-post
// Används sen på profilsidan för att visa orderhistorik
export async function getOrdersByEmail(email) {
  const res = await fetch(`${API}/orders?customer.email=${email}`)

  if (!res.ok) throw new Error('Kunde inte hämta ordrar')

  return res.json()
}
