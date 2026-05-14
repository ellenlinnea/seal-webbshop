import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { createOrder } from '../hooks/useOrders'
import './Checkout.css'

function Checkout() {
  const { cart, clearCart } = useCart()
  const navigate = useNavigate()

  // lagra inmatningar i formuläret
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Räknar ut totalpriset
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  // Uppdaterar formuläret när användare skriver
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Skickar ordern till databasen när formuläret skickas
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const order = {
      customer: form,
      items: cart,
      total,
      date: new Date().toISOString()
    }

    try {
      //använder hook för API-anrop
      const savedOrder = await createOrder(cart, form, total)

      // Tömmer varukorgen och skickar vidare till bekräftelsesidan med order-id
      clearCart()
      navigate(`/bekraftelse/${savedOrder.id}`)
    } catch (err) {
      setError('Det gick inte att skicka ordern. Försök igen.')
      setLoading(false)
    }
  }

  return (
    <div className="checkout">
      <h1 className="checkout__title">Kassa</h1>

      <div className="checkout__layout">
        {/* Formulär med kunduppgifter */}
        <form className="checkout__form" onSubmit={handleSubmit}>
          <div className="checkout__section">
            <h2 className="checkout__section-title">Dina uppgifter</h2>

            <div className="checkout__field">
              <label htmlFor="name">Namn</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Förnamn Efternamn"
                required
              />
            </div>

            <div className="checkout__field">
              <label htmlFor="email">E-post</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="din@epost.se"
                required
              />
            </div>
          </div>

          <div className="checkout__section">
            <h2 className="checkout__section-title">Leveransadress</h2>

            <div className="checkout__field">
              <label htmlFor="address">Gatuadress</label>
              <input
                id="address"
                name="address"
                type="text"
                value={form.address}
                onChange={handleChange}
                placeholder="Storgatan 1"
                required
              />
            </div>

            <div className="checkout__field-row">
              <div className="checkout__field">
                <label htmlFor="zip">Postnummer</label>
                <input
                  id="zip"
                  name="zip"
                  type="text"
                  value={form.zip}
                  onChange={handleChange}
                  placeholder="123 45"
                  required
                />
              </div>
              <div className="checkout__field">
                <label htmlFor="city">Ort</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Stockholm"
                  required
                />
              </div>
            </div>
            <p className="checkout__payment-note">Vi levererar hem till dig! Sälen levereras inpackad i våtdräkt och tillsammans med fisk för två dagar.</p>
          </div>

          <div className="checkout__section">
            <h2 className="checkout__section-title">Betalning</h2>

            <div className="checkout__field">
              <label htmlFor="cardNumber">Kortnummer</label>
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                value={form.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                required
              />
            </div>

            <div className="checkout__field-row">
              <div className="checkout__field">
                <label htmlFor="cardExpiry">Utgår MM/ÅÅ</label>
                <input
                  id="cardExpiry"
                  name="cardExpiry"
                  type="text"
                  value={form.cardExpiry}
                  onChange={handleChange}
                  placeholder="MM/ÅÅ"
                  maxLength={5}
                  required
                />
              </div>
              <div className="checkout__field">
                <label htmlFor="cardCvc">CVC</label>
                <input
                  id="cardCvc"
                  name="cardCvc"
                  type="text"
                  value={form.cardCvc}
                  onChange={handleChange}
                  placeholder="123"
                  maxLength={3}
                  required
                />
              </div>
            </div>
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
              <div key={item.id} className="checkout__summary-item">
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
