import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  // Håller koll på vilka sektioner som är öppna i mobilläget
  // Varje nyckel matchar en sektion - false = stängd, true = öppen
  const [open, setOpen] = useState({
    sortiment: false,
    service: false,
    foretaget: false
  })

  // Växlar en sektion mellan öppen och stängd
  function toggle(section) {
    setOpen(prev => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <img src="/seal-the-deal-logo.svg" alt="Seal the Deal" className="footer__logo-img" />
            <div className="footer__logo-text">
              <span className="footer__logo-name">Seal the Deal</span>
              <span className="footer__logo-sub">genuine seal co · est mmxxvi</span>
            </div>
          </Link>
          <p className="footer__desc">Sveriges enda boutique för sälar. Varje säl är noga utvald, besiktigad och strålar med sin helt egen personlighet.</p>
        </div>

        {/* Varje kolumn har en klickbar rubrik som öppnar/stänger länkarna på mobil */}
        <div className="footer__col">
          <button className="footer__col-title" onClick={() => toggle('sortiment')}>
            Sortiment
            <span className="footer__col-icon">{open.sortiment ? '−' : '+'}</span>
          </button>
          <div className={`footer__col-links ${open.sortiment ? 'footer__col-links--open' : ''}`}>
            <Link to="/salar">Alla sälar</Link>
            <Link to="/salar?housetrained=true">Rumsrena sälar</Link>
            <Link to="/salar?size=liten">Småsälar</Link>
            <Link to="/salar?size=stor">Stora sälar</Link>
          </div>
        </div>

        <div className="footer__col">
          <button className="footer__col-title" onClick={() => toggle('service')}>
            Service
            <span className="footer__col-icon">{open.service ? '−' : '+'}</span>
          </button>
          <div className={`footer__col-links ${open.service ? 'footer__col-links--open' : ''}`}>
            <Link to="/salvard">Sälvård</Link>
            <Link to="/frakt">Frakt & hemleverans</Link>
            <Link to="/returer">Returer</Link>
          </div>
        </div>

        <div className="footer__col">
          <button className="footer__col-title" onClick={() => toggle('foretaget')}>
            Företaget
            <span className="footer__col-icon">{open.foretaget ? '−' : '+'}</span>
          </button>
          <div className={`footer__col-links ${open.foretaget ? 'footer__col-links--open' : ''}`}>
            <Link to="/om-oss">Om oss</Link>
            <Link to="/kontakt">Kontakt</Link>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2026 Seal the Deal AB · Sthlm</p>
        <p>Med kärlek från svenska kusten 🌊</p>
      </div>
    </footer>
  )
}

export default Footer
