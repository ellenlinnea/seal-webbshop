import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './CartPopup.css'

function CartPopup() {
  const { addedSeal, clearAddedSeal } = useCart()
  const navigate = useNavigate()

  // Inget att visa om ingen säl just lagts till
  if (!addedSeal) return null

  function goToCart() {
    clearAddedSeal()
    navigate('/varukorg')
  }

  return (
    // Bakgrunden som täcker sidan - klicka på den för att stänga
    <div className="cart-popup__backdrop" onClick={clearAddedSeal}>

      {/* Själva rutan */}
      <div className="cart-popup" onClick={e => e.stopPropagation()}>

        <div className="cart-popup__seal">
          {addedSeal.image
            ? <img src={addedSeal.image} alt={addedSeal.name} className="cart-popup__img" />
            : <div className="cart-popup__img-placeholder">🦭</div>
          }
          <div>
            <p className="cart-popup__label">Lagd i varukorgen</p>
            <p className="cart-popup__name">{addedSeal.name}</p>
            <p className="cart-popup__price">{addedSeal.price.toLocaleString('sv-SE')} kr</p>
          </div>
        </div>

        <div className="cart-popup__actions">
          <button className="cart-popup__continue" onClick={clearAddedSeal}>
            Fortsätt handla
          </button>
          <button className="cart-popup__go" onClick={goToCart}>
            Till varukorgen →
          </button>
        </div>

      </div>
    </div>
  )
}

export default CartPopup
