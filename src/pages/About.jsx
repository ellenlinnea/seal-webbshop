import { Link } from 'react-router-dom'
import './InfoPage.css'

function About() {
  return (
    <div className="info">
      <p className="info__eyebrow">Företaget</p>
      <h1 className="info__title">Vi säljer <em>sälar.</em><br />Det är ungefär allt.</h1>
      <p className="info__lead">
        Seal the Deal grundades 2019 av Björn-Erik Hammarström, en tidigare laxodlare
        från Lysekil som en dag vaknade upp med en grönlandssäl på altanen och tänkte:
        "det här är nog ett tecken." Det var det förmodligen inte. Men affärerna gick bra.
      </p>

      <div className="info__section">
        <h2 className="info__section-title">Hur det började</h2>
        <p className="info__section-text">
          Under de första åren bedrevs verksamheten från Björn-Eriks båthus utanför Grebbestad.
          Sortimentet bestod av tre sälar: Sture, en nevrotisk grönlandssäl, Doris som sedan
          visade sig vara en gråsäl av hankön, och en tredje säl vars namn vi fortfarande
          inte kommit överens om internt.
        </p>
        <p className="info__section-text">
          Idag har vi ett växande sortiment av sälar, ett kontor med tre anställda och en
          gemensam fikabricka som alla är lite för rädda för att ta det sista från. Vi är
          stolta över det vi gör, vilket är sälja sälar till privatpersoner på internet —
          något som juridiskt befinner sig i en gråzon vi väljer att inte titta för noga på.
        </p>
      </div>

      <div className="info__section">
        <h2 className="info__section-title">Våra värderingar</h2>
        <ul className="info__list">
          <li>Varje säl är en individ och behandlas därefter — inklusive de med tvivelaktiga personligheter</li>
          <li>Vi ljuger aldrig om en säls personlighet — vi formulerar bara sanningen optimistiskt</li>
          <li>Hållbarhet är viktigt för oss, framför allt för sälarna som föredrar kallvatten</li>
          <li>Kundnöjdhet mäts i antal kunder som ringer tillbaka för att berätta hur det gått</li>
          <li>Vi har en policy om öppenhet och ärlighet, förutom gällande säl nummer tre</li>
        </ul>
      </div>

      <div className="info__section">
        <h2 className="info__section-title">Teamet</h2>
        <p className="info__section-text">
          Vi är tre personer och, beroende på hur man räknar, ett varierande antal sälar.
          Björn-Erik sköter sälarna. Marita sköter administrationen och är den enda som
          förstår faktureringssystemet. Viktor är praktikant och har hittills mest matat sälar,
          vilket han verkar trivas med.
        </p>
      </div>

      <Link to="/salar" className="info__cta">Träffa sälarna →</Link>
    </div>
  )
}

export default About
