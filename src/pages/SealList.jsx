import { useState, useMemo } from 'react'
import SealCard from '../components/SealCard'
import { useSeals } from '../hooks/useSeals'
import { useCart } from '../context/CartContext'
import { useFavs } from '../context/FavsContext'
import './SealList.css'

function SealList() {
  const { seals, loading } = useSeals()
  const { addToCart } = useCart()
  const { toggleFav, isFav } = useFavs()

  // Håller koll på vad användaren valt i filtren
  const [filterSize, setFilterSize] = useState('')
  const [filterGender, setFilterGender] = useState('')
  const [filterHousetrained, setFilterHousetrained] = useState(false)
  const [sortBy, setSortBy] = useState('popularity')

  // Filtrerar och sorterar
  // Körs bara om när seals eller något filter ändras
  const filteredSeals = useMemo(() => {
    let result = [...seals] //Kopierar arrayen så vi inte ändrar orginal

    if (filterSize) result = result.filter(s => s.size === filterSize)
    if (filterGender) result = result.filter(s => s.gender === filterGender)
    if (filterHousetrained) result = result.filter(s => s.housetrained === true)

    if (sortBy === 'popularity') result.sort((a, b) => b.popularity - a.popularity)
    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price)
    if (sortBy === 'age') result.sort((a, b) => a.age - b.age)

    return result
  }, [seals, filterSize, filterGender, filterHousetrained, sortBy])

  // Nollställer all filtrering och sortering...
  function resetFilters() {
    setFilterSize('')
    setFilterGender('')
    setFilterHousetrained(false)
    setSortBy('popularity')
  }

  // För att visa "Rensa filter" om något är filtrerat ´, annars inte
  const hasActiveFilters = filterSize || filterGender || filterHousetrained

  return (
    <div className="seal-list-page">
      <div className="seal-list-page__layout">

        <aside className="filters">
          <p className="filters__heading">Filter</p>

          {/* knappar för storlek - ska kunna klicka igen för att avmarkera */}
          <div className="filters__group">
            <p className="filters__label">Storlek</p>
            <div className="filters__chips">
              {['liten', 'mellan', 'stor'].map(size => (
                <button
                  key={size}
                  className={`filters__chip ${filterSize === size ? 'filters__chip--active' : ''}`}
                  onClick={() => setFilterSize(filterSize === size ? '' : size)}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)} {/* Första bokstaven stor, eftersom allt i databasen är med små bokstäver */}
                </button>
              ))}
            </div>
          </div>

          {/* knappar för kön */}
          <div className="filters__group">
            <p className="filters__label">Kön</p>
            <div className="filters__chips">
              {['hona', 'hane'].map(gender => (
                <button
                  key={gender}
                  className={`filters__chip ${filterGender === gender ? 'filters__chip--active' : ''}`}
                  onClick={() => setFilterGender(filterGender === gender ? '' : gender)}
                >
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </button>
              ))}
            </div>
          </div>

            {/* checkbox för om endast rumsrena sälar ska visas */}
          <div className="filters__group">
            <p className="filters__label">Rumsren</p>
            <label className="filters__checkbox">
              <input
                type="checkbox"
                checked={filterHousetrained}
                onChange={e => setFilterHousetrained(e.target.checked)}
              />
              Endast rumsrena sälar
            </label>
          </div>

              {/* dropdown för sortering - på populäritet, pris eller ålder */}
          <div className="filters__group">
            <p className="filters__label">Sortera</p>
            <select
              className="filters__select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="popularity">Populärast</option>
              <option value="price-asc">Pris: lågt → högt</option>
              <option value="price-desc">Pris: högt → lågt</option>
              <option value="age">Ålder</option>
            </select>
          </div>

          {/* Rensa-knappen */}
          {hasActiveFilters && (
            <button className="filters__reset" onClick={resetFilters}>Rensa filter</button>
          )}
        </aside>

        <div className="seal-list-page__content">
          <div className="seal-list-page__header">
            <h1 className="seal-list-page__title">Alla sälar</h1>
            {/* Antalet sälar som visas automatiskt när filter är aktivt */}
            <p className="seal-list-page__count">{filteredSeals.length} sälar</p>
          </div>

            {/* Sälarna visas genom seal-card-komponent, om det finns som matchar */}
          {loading ? (
            <p className="seal-list-page__loading">Hämtar sälar...</p>
          ) : filteredSeals.length === 0 ? (
            <p className="seal-list-page__empty">Inga sälar matchar ditt filter.</p>
          ) : (
            <div className="seal-list-page__grid">
              {filteredSeals.map(seal => (
                <SealCard
                  key={seal.id}
                  seal={seal}
                  onAddToCart={addToCart}
                  onToggleFav={toggleFav}
                  isFav={isFav(seal.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SealList
