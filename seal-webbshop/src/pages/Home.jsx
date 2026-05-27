import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import SealCard from '../components/SealCard'
import { useCart } from '../context/CartContext'
import { useFavs } from '../context/FavsContext'
import { useSeals } from '../hooks/useSeals'
import './Home.css'

function Home() {
  // Hämtar alla sälar via custom hook
  const { seals, loading } = useSeals()

  // Hämtar funktioner från cart- och favs-context
  const { addToCart } = useCart()
  const { toggleFav, isFav } = useFavs()

  // Sorterar sälar efter popularitet och tar de 4 högsta
  // useMemo gör att sorteringen inte körs om i onödan, bara när seals ändras
  const popularSeals = useMemo(
    () => [...seals].sort((a, b) => b.popularity - a.popularity).slice(0, 4),
    [seals]
  )

  // useMemo är en inbyggd React-hook som cachar resultatet och bara räknar om när seals ändras
  // Väljer dagens säl baserat på datum - samma säl hela dagen, ny säl varje dag
  // Filtrerar bort sålda sälar så att en såld säl aldrig visas som dagens säl
  const dailySeal = useMemo(() => {
    const available = seals.filter(s => s.available)
    if (!available.length) return null
    const today = new Date()
    const startOfYear = new Date(today.getFullYear(), 0, 0)
    const dayOfYear = Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24))
    return available[dayOfYear % available.length]
  }, [seals])

  return (
    <main>
      {/* Hero-sektion med bakgrundsbild och overlay för att lägga texten på bilden */}
      <section className="hero">
        <img src="/Hero-image-seal.jpg" alt="En säl i havet" className="hero__img" />
        <div className="hero__overlay" />
        <div className="hero__content">
          <p className="hero__eyebrow">Nordens ledande sälbutik</p>
          <h1 className="hero__title">Hitta en säl som gör<br />hemmet mjukare</h1>
          <p className="hero__sub">Olika individer. Var och en med sin egen personlighet, historia och favoritmat.</p>
          <Link to="/salar" className="hero__cta">Möt sälarna →</Link>
        </div>
      </section>

      {/* Dagens säl - visas inte alls om alla sälar är sålda */}
      {!loading && !dailySeal && (
        <section className="daily">
          <p className="daily__eyebrow">Dagens säl</p>
          <div className="daily__card daily__card--empty">
            <p className="daily__empty">Nya sälar kommer snart — håll utkik!</p>
          </div>
        </section>
      )}

      {dailySeal && (
        <section className="daily">
          <p className="daily__eyebrow">Dagens säl</p>
          <div className="daily__card">
            <div className="daily__img-wrap">
              <img src={dailySeal.image} alt={dailySeal.name} className="daily__img" />
            </div>
            <div className="daily__info">
              <h2 className="daily__name">{dailySeal.name}</h2>
              <p className="daily__personality">{dailySeal.personality}</p>
              <p className="daily__bio">{dailySeal.bio}</p>
              <div className="daily__meta">
                <span>{dailySeal.age} år</span>
                <span>{dailySeal.weight}</span>
                {/* Rumsren-badge visas bara om sälen är rumsren */}
                {dailySeal.housetrained && <span className="daily__badge">Rumsren</span>}
              </div>
              <div className="daily__actions">
                <span className="daily__price">{dailySeal.price.toLocaleString('sv-SE')} kr</span>
                <button className="daily__btn" onClick={() => addToCart(dailySeal)} disabled={!dailySeal.available}>
                  {dailySeal.available ? 'Köp' : 'Såld'}
                  {/* toggla om knappen är klickbar eller inte samt köp/såld-text beroende på tillgänglighet (avalible_true/false) */}
                </button>
                <Link to={`/salar/${dailySeal._id}`} className="daily__more">Läs mer →</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Populära sälar - visar laddningstext tills data kommit in */}
      <section className="popular">
        <div className="popular__header">
          <h2 className="popular__title">Populära sälar</h2>
          <Link to="/salar" className="popular__link">Se alla →</Link>
        </div>

        {loading ? (
          <p className="popular__loading">Hämtar sälar...</p>
        ) : (
          <div className="popular__grid">
            {popularSeals.map(seal => (
              // Varje SealCard får säl-data och funktioner för köp och favorit
              <SealCard
                key={seal._id}
                seal={seal}
                onAddToCart={addToCart}
                onToggleFav={toggleFav}
                isFav={isFav(seal._id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Säljargument */}
      <section className="trust">
        <div className="trust__item">
          <span className="trust__num">— 01</span>
          <h3 className="trust__title">Hälsobesiktigad</h3>
          <p className="trust__text">Varje säl undersöks av legitimerad veterinär innan den läggs ut för försäljning.</p>
        </div>
        <div className="trust__item">
          <span className="trust__num">— 02</span>
          <h3 className="trust__title">Sälpass</h3>
          <p className="trust__text">Du får med ett färdigt pass för din säl, redo att ta med på nya äventyr.</p>
        </div>
        <div className="trust__item">
          <span className="trust__num">— 03</span>
          <h3 className="trust__title">14 dagars ångerrätt</h3>
          <p className="trust__text">Skulle det inte fungera mellan dig och din nya säl, ingen fara! Du har ångerrätt upp till 14 dagar efter att du mottagit din säl.</p>
        </div>
      </section>
      <div className="trust__spacer" />
    </main>
  )
}

export default Home
