import { Link, NavLink } from 'react-router-dom'
import './Header.css'

// Tar emot user (null om ej inloggad) och onLogout-funktion från App
function Header({ cartCount = 0, favCount = 0, user = null, onLogout }) {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src="/seal-the-deal-logo.svg" alt="Seal the Deal logga" className="header__logo-img" />
        <div className="header__logo-text">
            <span className="header__logo-name">Seal the Deal</span>
            <span className="header__logo-sub">genuine seal co</span>
        </div>
      </Link>

      <nav className="header__nav" aria-label="Huvudnavigation">
        <NavLink to="/" end>Hem</NavLink>
        <NavLink to="/salar">Sälar</NavLink>
        <NavLink to="/om-oss">Om oss</NavLink>
      </nav>

      <div className="header__actions">
        <NavLink to="/favoriter" aria-label={`Favoriter (${favCount})`} className="header__icon-btn">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {favCount > 0 && <span className="header__badge">{favCount}</span>}
        </NavLink>
        <NavLink to="/varukorg" aria-label={`Varukorg (${cartCount})`} className="header__icon-btn">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {cartCount > 0 && <span className="header__badge">{cartCount}</span>}
        </NavLink>

        {/* Visar antingen inloggad användares namn + logga ut, eller en länk till login */}
        {user ? (
          <div className="header__user">
            <NavLink to="/profil" className="header__user-name">Hej, {user.name.split(' ')[0]}</NavLink>
            <button className="header__logout-btn" onClick={onLogout}>Logga ut</button>
          </div>
        ) : (
          <NavLink to="/login" className="header__login-btn">Logga in</NavLink>
        )}
      </div>
    </header>
  )
}

export default Header