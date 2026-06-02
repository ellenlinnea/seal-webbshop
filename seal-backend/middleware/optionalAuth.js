import jwt from 'jsonwebtoken'

// Läser token om den finns och sätter req.user
// Till skillnad från verifyToken blockerar denna inte anrop utan token
// Används för rutter som ska fungera både för inloggade och gäster
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded.user
      } catch (err) {
        // Ignorerar ogiltig token och behandlar anropet som ett gäst-anrop
      }
    }
  }

  next()
}

export default optionalAuth
