import { Link, NavLink } from 'react-router-dom'
import './Header.css'

function Header({ cartCount = 0, favCount = 0 }) {
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
          ♡
          {favCount > 0 && <span className="header__badge">{favCount}</span>}
        </NavLink>
        <NavLink to="/varukorg" aria-label={`Varukorg (${cartCount})`} className="header__icon-btn">
          🛒
          {cartCount > 0 && <span className="header__badge">{cartCount}</span>}
        </NavLink>
        <NavLink to="/login" className="header__login-btn">Logga in</NavLink>
      </div>
    </header>
  )
}

export default Header