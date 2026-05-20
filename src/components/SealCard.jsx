import { Link } from 'react-router-dom'
import './SealCard.css'

// Tar emot en säl och funktioner för köp och favorit som props
function SealCard({ seal, onAddToCart, onToggleFav, isFav = false }) {
  return (
    <article className="seal-card">
      <Link to={`/salar/${seal.id}`} className="seal-card__img-wrap">
        {/* Visar bild om den finns, annars en emoji som backup */}
        {seal.image
          ? <img src={seal.image} alt={seal.name} className="seal-card__img" />
          : <div className="seal-card__img-placeholder">🦭</div>
        }
        <button
          className={`seal-card__fav ${isFav ? 'seal-card__fav--active' : ''}`}
          aria-label={isFav ? `Ta bort ${seal.name} från favoriter` : `Lägg till ${seal.name} i favoriter`}
          onClick={(e) => { e.preventDefault(); onToggleFav(seal) }}
        >
          {/* SVG-hjärta: fyllt när favoritmarkerat, kontur annars */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke={isFav ? 'none' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </Link>

      <div className="seal-card__body">
        <div className="seal-card__meta">
          {seal.housetrained && <span className="seal-card__badge">Rumsren</span>}
          <span className="seal-card__size">{seal.size}</span>
        </div>

        <div className="seal-card__name-row">
          <Link to={`/salar/${seal.id}`} className="seal-card__name-link">
            <h3 className="seal-card__name">{seal.name}</h3>
          </Link>
          <span className="seal-card__age">{seal.age} år</span>
        </div>

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
