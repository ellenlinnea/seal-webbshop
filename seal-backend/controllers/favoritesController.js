import User from '../models/User.js'

// @desc   Hämta den inloggade användarens favoriter
// @route  GET /api/favorites
// @access Private
export async function getFavorites(req, res) {
  try {
    const user = await User.findById(req.user.userId).populate('favorites')
    if (!user) return res.status(404).json({ error: 'Användaren hittades inte' })
    res.json(user.favorites)
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte hämta favoriter' })
  }
}

// @desc   Lägg till en säl i favoriter
// @route  POST /api/favorites
// @access Private
export async function addFavorite(req, res) {
  const { sealId } = req.body

  if (!sealId) return res.status(400).json({ error: 'sealId krävs' })

  try {
    // $addToSet lägger till värdet i arrayen, men bara om det inte redan finns där
    // utan { new: true } får vi tillbaka användaren som den såg ut INNAN sälen lades till - inte särskilt användbart
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $addToSet: { favorites: sealId } },
      { new: true }
    ).populate('favorites')

    res.json(user.favorites)
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte lägga till favorit' })
  }
}

// @desc   Ta bort en säl från favoriter
// @route  DELETE /api/favorites/:sealId
// @access Private
export async function removeFavorite(req, res) {
  try {
    // utan { new: true } får vi tillbaka användaren som den såg ut INNAN sälen togs bort - inte särskilt användbart
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $pull: { favorites: req.params.sealId } },
      { new: true }
    ).populate('favorites')

    res.json(user.favorites)
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte ta bort favorit' })
  }
}
