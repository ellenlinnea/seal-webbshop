import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Header.css'

// Tar emot user (null om ej inloggad) och onLogout-funktion från App
function Header({ cartCount = 0, favCount = 0, user = null, onLogout }) {
  // Håller koll på om mobilmenyn är öppen eller stängd
  const [menuOpen, setMenuOpen] = useState(false)

  // Stänger menyn när man klickar på en länk
  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="header">
      <Link to="/" className="header__logo" onClick={closeMenu}>
        <img src="/seal-the-deal-logo.svg" alt="Seal the Deal logga" className="header__logo-img" />
        <div className="header__logo-text">
          <span className="header__logo-name">Seal the Deal</span>
          <span className="header__logo-sub">genuine seal co</span>
        </div>
      </Link>

      {/* Navigeringslänkar - döljs på mobil och visas i menyn istället */}
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

        {/* Visas på desktop - döljs på mobil */}
        <div className="header__desktop-auth">
          {user ? (
            <div className="header__user">
              <NavLink to="/profil" className="header__user-name">Hej, {user.name.split(' ')[0]}</NavLink>
              <button className="header__logout-btn" onClick={onLogout}>Logga ut</button>
            </div>
          ) : (
            <NavLink to="/login" className="header__login-btn">Logga in</NavLink>
          )}
        </div>

        {/* Hamburgerknapp - visas bara på mobil */}
        <button
          className="header__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Stäng meny' : 'Öppna meny'}
        >
          {menuOpen ? (
            // X-ikon när menyn är öppen
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            // Tre streck när menyn är stängd
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobilmeny - visas under headern när hamburgerknappen trycks */}
      {menuOpen && (
        <div className="header__mobile-menu">
          <nav className="header__mobile-nav">
            <NavLink to="/" end onClick={closeMenu}>Hem</NavLink>
            <NavLink to="/salar" onClick={closeMenu}>Sälar</NavLink>
            <NavLink to="/om-oss" onClick={closeMenu}>Om oss</NavLink>
          </nav>

          <div className="header__mobile-auth">
            {user ? (
              <>
                <NavLink to="/profil" className="header__mobile-profile" onClick={closeMenu}>
                  Mitt konto — {user.name.split(' ')[0]}
                </NavLink>
                <button className="header__mobile-logout" onClick={() => { onLogout(); closeMenu() }}>
                  Logga ut
                </button>
              </>
            ) : (
              <NavLink to="/login" className="header__mobile-login" onClick={closeMenu}>
                Logga in
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
