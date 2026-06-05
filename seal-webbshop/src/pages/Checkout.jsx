import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { createOrder } from '../hooks/useOrders'
import './Checkout.css'

function Checkout() {
  const { cart, clearCart } = useCart()
  const { user, login, register } = useAuth()
  const navigate = useNavigate()

  // Formulärfälten för kunduppgifter och betalning
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    swishPhone: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Förifylller namn och e-post om användaren är inloggad
  useEffect(() => {
    if (user) {
      setForm(prev => ({ ...prev, name: user.name, email: user.email }))

      // Rensar ev. lingerande customValidity på de autofyllda fälten
      // onInput triggas inte när värdet sätts via state, så måste göra det manuellt
      document.getElementById('name')?.setCustomValidity('')
      document.getElementById('email')?.setCustomValidity('')
    }
  }, [user])

  // Login-rutan i kassan - håller koll på om den är öppen och vilket läge den är i
  const [authMode, setAuthMode] = useState(null) // null = stängd, 'login' eller 'register'
  const [authName, setAuthName] = useState('')
  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  // Hanterar inloggning eller registrering direkt i kassan utan att lämna sidan
  async function handleAuthSubmit(e) {
    e.preventDefault()
    setAuthError('')
    setAuthLoading(true)

    try {
      if (authMode === 'login') {
        await login(authEmail, authPassword)
      } else {
        await register(authName, authEmail, authPassword)
      }
      // Stänger login-rutan - namn och e-post fylls i automatiskt via useEffect ovan
      setAuthMode(null)
    } catch (err) {
      setAuthError(err.message)
    } finally {
      setAuthLoading(false)
    }
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Hjälpfunktion för att visa egna felmeddelanden istället för webbläsarens standard
  function validation(message) {
    return {
      onInvalid: (e) => e.target.setCustomValidity(message),
      onInput: (e) => e.target.setCustomValidity('')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const savedOrder = await createOrder(cart, form, total)
      clearCart()
      navigate(`/bekraftelse/${savedOrder._id}`)
    } catch (err) {
      setError('Det gick inte att skicka ordern. Försök igen.')
      setLoading(false)
    }
  }

  return (
    <div className="checkout">
      <h1 className="checkout__title">Kassa</h1>

      <div className="checkout__layout">
        <form className="checkout__form" onSubmit={handleSubmit}>

          {/* Visar antingen "inloggad som"-raden eller login-rutan beroende på om man är inloggad */}
          {user ? (
            // Inloggad: visar namn och att fälten är förifyllda
            <div className="checkout__auth-bar">
              <span>Inloggad som <strong>{user.name}</strong></span>
              <span className="checkout__auth-bar-note">Namn och e-post är förifyllda</span>
            </div>
          ) : (
            // Inte inloggad: visar valfri login-ruta, kan ignoreras och handla ändå
            <div className="checkout__auth-box">
              <p className="checkout__auth-title">Vill du spara din order?</p>
              <p className="checkout__auth-sub">Logga in eller skapa ett konto — eller fortsätt som vanligt utan konto.</p>

              {/* Knapparna visas när login-rutan är stängd */}
              {authMode === null && (
                <div className="checkout__auth-btns">
                  <button type="button" className="checkout__auth-btn" onClick={() => setAuthMode('login')}>Logga in</button>
                  <button type="button" className="checkout__auth-btn" onClick={() => setAuthMode('register')}>Skapa konto</button>
                </div>
              )}

              {/* Formuläret visas när man klickat logga in eller skapa konto */}
              {authMode !== null && (
                <div className="checkout__auth-form">
                  <div className="checkout__auth-tabs">
                    <button type="button" className={`checkout__auth-tab ${authMode === 'login' ? 'checkout__auth-tab--active' : ''}`} onClick={() => { setAuthMode('login'); setAuthError('') }}>Logga in</button>
                    <button type="button" className={`checkout__auth-tab ${authMode === 'register' ? 'checkout__auth-tab--active' : ''}`} onClick={() => { setAuthMode('register'); setAuthError('') }}>Skapa konto</button>
                  </div>

                  {authMode === 'register' && (
                    <input className="checkout__auth-input" type="text" placeholder="Namn" value={authName} onChange={e => setAuthName(e.target.value)} required />
                  )}
                  <input className="checkout__auth-input" type="email" placeholder="E-postadress" value={authEmail} onChange={e => setAuthEmail(e.target.value)} required />
                  <input className="checkout__auth-input" type="password" placeholder="Lösenord" value={authPassword} onChange={e => setAuthPassword(e.target.value)} required />

                  {authError && <p className="checkout__auth-error">{authError}</p>}

                  <div className="checkout__auth-actions">
                    <button type="button" className="checkout__auth-submit" onClick={handleAuthSubmit} disabled={authLoading}>
                      {authLoading ? 'Ett ögonblick...' : authMode === 'login' ? 'Logga in' : 'Skapa konto'}
                    </button>
                    <button type="button" className="checkout__auth-skip" onClick={() => setAuthMode(null)}>Avbryt</button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="checkout__section">
            <h2 className="checkout__section-title">Dina uppgifter</h2>

            <div className="checkout__field">
              <label htmlFor="name">Namn</label>
              <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Förnamn Efternamn" required {...validation('Fyll i ditt fullständiga namn')} />
            </div>

            <div className="checkout__field">
              <label htmlFor="email">E-post</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="din@epost.se" required {...validation('Fyll i en giltig e-postadress, t.ex. namn@exempel.se')} />
            </div>
          </div>

          <div className="checkout__section">
            <h2 className="checkout__section-title">Leveransadress</h2>

            <div className="checkout__field">
              <label htmlFor="address">Gatuadress</label>
              <input id="address" name="address" type="text" value={form.address} onChange={handleChange} placeholder="Storgatan 1" required {...validation('Fyll i din gatuadress, t.ex. Storgatan 1')} />
            </div>

            <div className="checkout__field-row">
              <div className="checkout__field">
                <label htmlFor="zip">Postnummer</label>
                <input id="zip" name="zip" type="text" value={form.zip} onChange={handleChange} placeholder="123 45" pattern="\d{3} ?\d{2}" required {...validation('Fyll i ett giltigt postnummer (5 siffror, t.ex. 123 45)')} />
              </div>
              <div className="checkout__field">
                <label htmlFor="city">Ort</label>
                <input id="city" name="city" type="text" value={form.city} onChange={handleChange} placeholder="Stockholm" required {...validation('Fyll i din ort, t.ex. Stockholm')} />
              </div>
            </div>
            <p className="checkout__payment-note">Vi levererar hem till dig! Sälen levereras inpackad i våtdräkt och med fisk för två dagar.</p>
          </div>

          <div className="checkout__section">
            <h2 className="checkout__section-title">Betalning</h2>

            {/* Val mellan kort och swish - styr vilka fält som visas nedan */}
            <div className="checkout__payment-methods">
              <button
                type="button"
                className={`checkout__payment-method ${form.paymentMethod === 'card' ? 'checkout__payment-method--active' : ''}`}
                onClick={() => setForm({ ...form, paymentMethod: 'card' })}
              >
                Kort
              </button>
              <button
                type="button"
                className={`checkout__payment-method ${form.paymentMethod === 'swish' ? 'checkout__payment-method--active' : ''}`}
                onClick={() => setForm({ ...form, paymentMethod: 'swish' })}
              >
                Swish
              </button>
            </div>

            {form.paymentMethod === 'card' ? (
              <>
                <div className="checkout__field">
                  <label htmlFor="cardNumber">Kortnummer</label>
                  <input id="cardNumber" name="cardNumber" type="text" value={form.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" maxLength={19} required {...validation('Fyll i ditt kortnummer (16 siffror)')} />
                </div>

                <div className="checkout__field-row">
                  <div className="checkout__field">
                    <label htmlFor="cardExpiry">Utgår MM/ÅÅ</label>
                    <input id="cardExpiry" name="cardExpiry" type="text" value={form.cardExpiry} onChange={handleChange} placeholder="MM/ÅÅ" maxLength={5} pattern="\d{2}/\d{2}" required {...validation('Fyll i utgångsdatum i formatet MM/ÅÅ, t.ex. 09/27')} />
                  </div>
                  <div className="checkout__field">
                    <label htmlFor="cardCvc">CVC</label>
                    <input id="cardCvc" name="cardCvc" type="text" value={form.cardCvc} onChange={handleChange} placeholder="123" maxLength={3} pattern="\d{3}" required {...validation('Fyll i CVC-koden (3 siffror på baksidan av kortet)')} />
                  </div>
                </div>
              </>
            ) : (
              <div className="checkout__field">
                <label htmlFor="swishPhone">Telefonnummer</label>
                <input id="swishPhone" name="swishPhone" type="tel" value={form.swishPhone} onChange={handleChange} placeholder="070 123 45 67" required {...validation('Fyll i ditt telefonnummer för Swish, t.ex. 070 123 45 67')} />
              </div>
            )}
          </div>

          {error && <p className="checkout__error">{error}</p>}

          <button className="checkout__submit" type="submit" disabled={loading}>
            {loading ? 'Skickar...' : 'Slutför köp →'}
          </button>
        </form>

        {/* Ordersammanställning */}
        <div className="checkout__summary">
          <h2 className="checkout__summary-title">Din order</h2>

          <div className="checkout__summary-items">
            {cart.map(item => (
              <div key={item._id} className="checkout__summary-item">
                <img src={item.image} alt={item.name} className="checkout__summary-img" />
                <div>
                  <p className="checkout__summary-name">{item.name}</p>
                  <p className="checkout__summary-meta">{item.personality}</p>
                </div>
                <span className="checkout__summary-price">{item.price.toLocaleString('sv-SE')} kr</span>
              </div>
            ))}
          </div>

          <div className="checkout__summary-total">
            <span>Totalt</span>
            <span>{total.toLocaleString('sv-SE')} kr</span>
          </div>

          <p className="checkout__summary-returns">14 dagars ångerrätt på alla sälar</p>
        </div>
      </div>
    </div>
  )
}

export default Checkout
