import { Link } from 'react-router-dom'
import './SealCard.css'

function SealCard({ seal, onAddToCart, onToggleFav, isFav = false }) {
  return (
    <article className="seal-card">
      <Link to={`/salar/${seal.id}`} className="seal-card__img-wrap">
        {seal.image
          ? <img src={seal.image} alt={seal.name} className="seal-card__img" />
          : <div className="seal-card__img-placeholder">🦭</div>
          // En backup med emoji ifall bilden inte laddas
        }
        <button
          className={`seal-card__fav ${isFav ? 'seal-card__fav--active' : ''}`}
          aria-label={isFav ? `Ta bort ${seal.name} från favoriter` : `Lägg till ${seal.name} i favoriter`}
          onClick={(e) => { e.preventDefault(); onToggleFav(seal) }}
        >
          {isFav ? '♥' : '♡'}
        </button>
      </Link>

      <div className="seal-card__body">
        <div className="seal-card__meta">
          {seal.housetrained && <span className="seal-card__badge">Rumsren</span>}
          <span className="seal-card__size">{seal.size}</span>
        </div>

        <Link to={`/salar/${seal.id}`} className="seal-card__name-link">
          <h3 className="seal-card__name">{seal.name}</h3>
        </Link>

        <p className="seal-card__personality">{seal.personality}</p>

        <div className="seal-card__footer">
          <span className="seal-card__price">{seal.price.toLocaleString('sv-SE')} kr</span>
          <button
            className="seal-card__btn"
            onClick={() => onAddToCart(seal)}
          >
            Köp
          </button>
        </div>
      </div>
    </article>
  )
}

export default SealCard
