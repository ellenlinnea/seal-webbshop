import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Cart.css'

function Cart() {
  // Hämtar varukorgens innehåll och funktioner från context
  const { cart, removeFromCart, clearCart } = useCart()

  // Räknar ut totalpriset - reduce går igenom alla varor och lägger ihop priserna, startar från 0
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  // Visar ett tomt-läge om varukorgen är tom
  if (cart.length === 0) {
    return (
      <div className="cart">
        <p className="cart__eyebrow">Din varukorg</p>
        <h1 className="cart__title--empty">Helt <em>torrlagd.</em></h1>
        <div className="cart__empty-card">
          <img src="/seal-the-deal-logo.svg" alt="Seal the Deal" className="cart__empty-logo" />
          <p className="cart__empty-text">Din varukorg är torrlagd. Sälarna väntar på dig — gå och hälsa på flocken.</p>
          <Link to="/salar" className="cart__empty-btn">Möt sälarna →</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart">
      <h1 className="cart__title">Varukorg</h1>

      <div className="cart__layout">
        {/* Lista med sälar */}
        <div className="cart__items">
          {cart.map(item => (
            <div key={item.id} className="cart__item">
              <img src={item.image} alt={item.name} className="cart__item-img" />
              <div className="cart__item-info">
                <h3 className="cart__item-name">{item.name}</h3>
                <p className="cart__item-meta">{item.personality} · {item.size} · {item.age} år</p>
                {item.housetrained && <span className="cart__item-badge">Rumsren</span>}
              </div>
              <div className="cart__item-right">
                <span className="cart__item-price">{item.price.toLocaleString('sv-SE')} kr</span> 
                {/* sv-Se formaterar priset med att separera tusental med mellanslag + lägger på kr */}
                {/* Tar bort sälen från varukorgen */}
                <button
                  className="cart__item-remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Ta bort ${item.name} från varukorgen`}
                >
                  Ta bort
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Totalsumma och gå till kassa-knapp */}
        <div className="cart__summary">
          <h2 className="cart__summary-title">Sammanställning</h2>

          <div className="cart__summary-rows">
            {cart.map(item => (
              <div key={item.id} className="cart__summary-row">
                <span>{item.name}</span>
                <span>{item.price.toLocaleString('sv-SE')} kr</span>
              </div>
            ))}
          </div>

          <div className="cart__summary-total">
            <span>Totalt</span>
            <span>{total.toLocaleString('sv-SE')} kr</span>
          </div>

          <Link to="/kassa" className="cart__checkout-btn">
            Gå till kassan →
          </Link>

          <p className="cart__returns">14 dagars ångerrätt på alla sälar</p>

          {/* Tömmer hela varukorgen */}
          <button className="cart__clear" onClick={clearCart}>
            Rensa varukorg
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
