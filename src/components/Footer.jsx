import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
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

        <div className="footer__col">
          <p className="footer__col-title">Sortiment</p>
          <Link to="/salar">Alla sälar</Link>
          <Link to="/salar?housetrained=true">Rumsrena sälar</Link>
          <Link to="/salar?size=liten">Småsälar</Link>
          <Link to="/salar?size=stor">Stora sälar</Link>
        </div>

        <div className="footer__col">
          <p className="footer__col-title">Service</p>
          <Link to="/salvard">Sälvård</Link>
          <Link to="/frakt">Frakt & hemleverans</Link>
          <Link to="/returer">Returer</Link>
        </div>

        <div className="footer__col">
          <p className="footer__col-title">Företaget</p>
          <Link to="/om-oss">Om oss</Link>
          <Link to="/kontakt">Kontakt</Link>
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
