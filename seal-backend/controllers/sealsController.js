import Seal from '../models/Seal.js'

// @desc   Hämta alla sälar
// @route  GET /api/seals
// @access Public
export async function getAllSeals(req, res) {
  try {
    const seals = await Seal.find()
    res.json(seals)
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte hämta sälar' })
  }
}

// @desc   Hämta en enskild säl
// @route  GET /api/seals/:id
// @access Public
export async function getSealById(req, res) {
  try {
    const seal = await Seal.findById(req.params.id)
    if (!seal) return res.status(404).json({ error: 'Sälen hittades inte' })
    res.json(seal)
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte hämta sälen' })
  }
}
