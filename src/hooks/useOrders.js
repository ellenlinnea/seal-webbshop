import { useState, useEffect } from 'react'

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

// Hämtar alla ordrar för den inloggade användaren, baserat på e-post
// Fungerar precis som useSeals - returnerar orders, loading och error
export function useOrdersByEmail(email) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!email) return

    fetch(`${API}/orders?customer.email=${email}`)
      .then(res => {
        if (!res.ok) throw new Error('Kunde inte hämta ordrar')
        return res.json()
      })
      .then(data => {
        // Lägger senaste ordern överst
        const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date))
        setOrders(sorted)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [email])

  return { orders, loading, error }
}
