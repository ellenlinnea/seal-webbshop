import { Link } from 'react-router-dom'
import { useFavs } from '../context/FavsContext'
import { useCart } from '../context/CartContext'
import SealCard from '../components/SealCard'
import './Favs.css'

function Favs() {
  // Hämtar favoritlistan och toggle-funktionen från context
  const { favs, toggleFav } = useFavs()

  // Hämtar varukorgen och addToCart för att kunna köpa direkt från favoriter
  const { addToCart, cart } = useCart()

  // Visar ett tomt-läge om inga favoriter finns sparade
  if (favs.length === 0) {
    return (
      <div className="favs">
        <p className="favs__eyebrow">Dina favoriter</p>
        <h1 className="favs__title--empty">Inga <em>hjärtan</em> ännu.</h1>
        <div className="favs__empty-card">
          <img src="/seal-the-deal-logo.svg" alt="Seal the Deal" className="favs__empty-logo" />
          <p className="favs__empty-text">Du har inte sparat några favoriter ännu. Tryck på hjärtat på en säl så hamnar den här.</p>
          <Link to="/salar" className="favs__empty-btn">Utforska sälar →</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="favs">
      <h1 className="favs__title">Favoriter</h1>
      <p className="favs__count">{favs.length} {favs.length === 1 ? 'säl' : 'sälar'} sparade</p>

      {/* Visar alla favoritsälar som cards - samma komponent som andra sidor... */}
      <div className="favs__grid">
        {favs.map(seal => (
          <SealCard
            key={seal.id}
            seal={seal}
            onAddToCart={addToCart}
            onToggleFav={toggleFav}
            // Kollar om sälen redan är favorit (alltid true här, men SealCard behöver prop:en)
            isFav={true}
          />
        ))}
      </div>

      <div className="favs__footer">
        <Link to="/salar" className="favs__more-link">Utforska fler sälar →</Link>
        {/* Visar länk till varukorgen om man lagt till något */}
        {cart.length > 0 && (
          <Link to="/varukorg" className="favs__cart-btn">
            Gå till varukorg ({cart.length}) →
          </Link>
        )}
      </div>
    </div>
  )
}

export default Favs
