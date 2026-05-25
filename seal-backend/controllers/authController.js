import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// @desc   Skapa ett nytt konto
// @route  POST /api/auth/register
// @access Public
export async function register(req, res) {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Alla fält måste fyllas i' })
  }

  try {
    // Kolla om e-posten redan används
    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(409).json({ error: 'Det finns redan ett konto med den e-postadressen' })
    }

    // Hasha lösenordet innan det sparas
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashedPassword })

    // Skapa en token som användaren får tillbaka
    const token = jwt.sign(
      { user: { userId: user._id, email: user.email, name: user.name } },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    })
  } catch (err) {
    res.status(500).json({ error: 'Något gick fel när kontot skapades' })
  }
}

// @desc   Logga in med befintligt konto
// @route  POST /api/auth/login
// @access Public
export async function login(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'E-post och lösenord krävs' })
  }

  try {
    // Hitta användaren med den e-posten
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'Fel e-postadress eller lösenord' })
    }

    // Jämför det angivna lösenordet med det hashade i databasen
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Fel e-postadress eller lösenord' })
    }

    // Skapa en token som användaren får tillbaka
    const token = jwt.sign(
      { user: { userId: user._id, email: user.email, name: user.name } },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    })
  } catch (err) {
    res.status(500).json({ error: 'Något gick fel vid inloggningen' })
  }
}
