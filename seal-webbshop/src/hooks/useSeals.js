import { useEffect, useState } from 'react'

const API = 'http://localhost:5000/api'

// Hämtar alla sälar från databasen
export function useSeals() {
  const [seals, setSeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API}/seals`)
      .then(res => res.json())
      .then(data => {
        setSeals(data)
        setLoading(false)
      })
      .catch(err => {
        // Om något går fel sparas felmeddelandet i error-state
        setError(err.message)
        setLoading(false)
      })
  }, []) // Tom array = körs bara en gång när komponenten laddas

  return { seals, loading, error }
}

// Hämtar en enskild säl baserat på id
export function useSeal(id) {
  const [seal, setSeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API}/seals/${id}`)
      .then(res => res.json())
      .then(data => {
        setSeal(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id]) // Körs om igen om id ändras, t.ex. när man navigerar mellan sälar

  return { seal, loading, error }
}
