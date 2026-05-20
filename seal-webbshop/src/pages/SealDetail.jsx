import { useParams, Link } from 'react-router-dom'
import { useSeal } from '../hooks/useSeals'
import { useCart } from '../context/CartContext'
import { useFavs } from '../context/FavsContext'
import './SealDetail.css'

function SealDetail() {
  // useParams hämtar id:t från URL:en, t.ex. /salar/3 ger id = "3"
  const { id } = useParams()
  const { seal, loading } = useSeal(id)

  const { addToCart, cart } = useCart()
  const { toggleFav, isFav } = useFavs()

  // Kollar om sälen redan ligger i varukorgen för att gråa ut knappen
  const inCart = cart.some(item => item.id === seal?.id)

  // Visar laddningstext medan data hämtas, eller felmeddelande om sälen inte finns
  if (loading) return <p className="seal-detail__loading">Hämtar säl...</p>
  if (!seal) return <p className="seal-detail__loading">Sälen hittades inte.</p>

  return (
    <div className="seal-detail">
      <Link to="/salar" className="seal-detail__back">← Tillbaka till alla sälar</Link>

      <div className="seal-detail__layout">
        {/* Vänster: bild */}
        <div className="seal-detail__img-wrap">
          <img src={seal.image} alt={seal.name} className="seal-detail__img" />
        </div>

        {/* Höger: info */}
        <div className="seal-detail__info">
          <div className="seal-detail__top">
            <div>
              <p className="seal-detail__personality">{seal.personality}</p>
              <h1 className="seal-detail__name">{seal.name}</h1>
            </div>
            {/* Hjärtknapp för att lägga till/ta bort från favoriter */}
            <button
              className={`seal-detail__fav ${isFav(seal.id) ? 'seal-detail__fav--active' : ''}`}
              onClick={() => toggleFav(seal)}
              aria-label={isFav(seal.id) ? 'Ta bort från favoriter' : 'Lägg till i favoriter'}
            >
              {isFav(seal.id) ? '♥' : '♡'}
            </button>
          </div>

          <p className="seal-detail__bio">{seal.bio}</p>

          {/* Faktaruta med sälens egenskaper */}
          <div className="seal-detail__facts">
            <div className="seal-detail__fact">
              <span className="seal-detail__fact-label">Ålder</span>
              <span className="seal-detail__fact-value">{seal.age} år</span>
            </div>
            <div className="seal-detail__fact">
              <span className="seal-detail__fact-label">Vikt</span>
              <span className="seal-detail__fact-value">{seal.weight}</span>
            </div>
            <div className="seal-detail__fact">
              <span className="seal-detail__fact-label">Storlek</span>
              <span className="seal-detail__fact-value">{seal.size}</span>
            </div>
            <div className="seal-detail__fact">
              <span className="seal-detail__fact-label">Kön</span>
              <span className="seal-detail__fact-value">{seal.sex}</span>
            </div>
            <div className="seal-detail__fact">
              <span className="seal-detail__fact-label">Rumsren</span>
              <span className="seal-detail__fact-value">{seal.housetrained ? 'Ja' : 'Nej'}</span>
            </div>
          </div>

          {/* Personlighetsdrag */}
          <div className="seal-detail__traits">
            <p className="seal-detail__traits-label">Karaktärsdrag</p>
            <div className="seal-detail__traits-list">
              {/* Loopar igenom traits-arrayen och visar varje drag som en pill */}
              {seal.traits.map((trait, i) => (
                <span key={i} className="seal-detail__trait">{trait}</span>
              ))}
            </div>
          </div>

          {/* Pris och köp-knapp */}
          <div className="seal-detail__footer">
            <span className="seal-detail__price">{seal.price.toLocaleString('sv-SE')} kr</span>
            <button
              className={`seal-detail__btn ${inCart ? 'seal-detail__btn--in-cart' : ''}`}
              onClick={() => addToCart(seal)}
              disabled={inCart}
            >
              {inCart ? 'Tillagd i varukorg' : 'Köp'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SealDetail
