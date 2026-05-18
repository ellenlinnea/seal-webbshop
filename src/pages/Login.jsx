import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Login.css'

function Login() {
  // Växlar mellan inloggning och registrering
  const [mode, setMode] = useState('login')

  // Formulärfälten - name används bara vid registrering
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Visar fel och laddningsstatus under API-anropet
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login, register } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'login') {
        await login(email, password)
      } else {
        await register(name, email, password)
      }
      // Skickar användaren till startsidan efter inloggning/registrering
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Byter läge och rensar formuläret
  function switchMode(newMode) {
    setMode(newMode)
    setError('')
    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className="login">
      <div className="login__card">
        <p className="login__eyebrow">Seal the Deal</p>
        <h1 className="login__title">
          {mode === 'login' ? <>Välkommen <em>tillbaka.</em></> : <>Skapa ett <em>konto.</em></>}
        </h1>

        {/* Toggle mellan inloggning och registrering */}
        <div className="login__tabs">
          <button
            className={`login__tab ${mode === 'login' ? 'login__tab--active' : ''}`}
            onClick={() => switchMode('login')}
            type="button"
          >
            Logga in
          </button>
          <button
            className={`login__tab ${mode === 'register' ? 'login__tab--active' : ''}`}
            onClick={() => switchMode('register')}
            type="button"
          >
            Skapa konto
          </button>
        </div>

        <form className="login__form" onSubmit={handleSubmit}>
          {/* Namnfältet visas bara när man registrerar sig */}
          {mode === 'register' && (
            <div className="login__field">
              <label className="login__label" htmlFor="name">Namn</label>
              <input
                id="name"
                className="login__input"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ditt namn"
                required
              />
            </div>
          )}

          <div className="login__field">
            <label className="login__label" htmlFor="email">E-postadress</label>
            <input
              id="email"
              className="login__input"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="din@epost.se"
              required
            />
          </div>

          <div className="login__field">
            <label className="login__label" htmlFor="password">Lösenord</label>
            <input
              id="password"
              className="login__input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {/* Felmeddelande från API:et visas här */}
          {error && <p className="login__error">{error}</p>}

          <button className="login__submit" type="submit" disabled={loading}>
            {loading ? 'Ett ögonblick...' : mode === 'login' ? 'Logga in' : 'Skapa konto'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
