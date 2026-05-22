import Seal from '../models/Seal.js'

// Hämtar alla sälar från databasen
export async function getAllSeals(req, res) {
  try {
    const seals = await Seal.find()
    res.json(seals)
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte hämta sälar' })
  }
}

// Hämtar en enskild säl baserat på id i URL:en
export async function getSealById(req, res) {
  try {
    const seal = await Seal.findById(req.params.id)
    if (!seal) return res.status(404).json({ error: 'Sälen hittades inte' })
    res.json(seal)
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte hämta sälen' })
  }
}
