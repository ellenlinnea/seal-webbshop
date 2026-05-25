import jwt from 'jsonwebtoken'

// Kontrollerar att det finns en giltig inloggningstoken i anropet
const verifyToken = (req, res, next) => {
  let token
  const authHeader = req.headers.authorization || req.headers.Authorization

  if (authHeader && authHeader.startsWith('Bearer ')) {
    // Plockar ut själva token-delen efter "Bearer "
    token = authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({ error: 'Ingen token, åtkomst nekad' })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Ogiltig eller utgången token' })
      }

      // Lägger användarinfo på requesten så controllern kan använda den
      req.user = decoded.user
      next()
    })
  } else {
    return res.status(401).json({ error: 'Ingen token, åtkomst nekad' })
  }
}

export default verifyToken
