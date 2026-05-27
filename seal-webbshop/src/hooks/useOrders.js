import { useState, useEffect } from 'react'

const API = 'http://localhost:5000/api'

// Skickar en ny order till databasen
// Skickar med token om användaren är inloggad - annars behandlas det som ett gästköp
export async function createOrder(cart, customer, total) {
  const token = localStorage.getItem('seal-token')

  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API}/orders`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ customer, items: cart, total })
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

// Hämtar alla ordrar för den inloggade användaren via /orders/mine
// Backenden läser token och vet automatiskt vems ordrar som ska hämtas
export function useMyOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('seal-token')

    fetch(`${API}/orders/mine`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Kunde inte hämta ordrar')
        return res.json()
      })
      .then(data => {
        setOrders(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { orders, loading, error }
}
