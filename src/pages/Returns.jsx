import { Link } from 'react-router-dom'
import './InfoPage.css'

function Returns() {
  return (
    <div className="info">
      <p className="info__eyebrow">Returer</p>
      <h1 className="info__title">14 dagars<br /><em>ångerrätt.</em></h1>
      <p className="info__lead">
        Vi förstår att det inte alltid blir som man tänkt sig. Kanske var personkemin
        fel. Kanske var lägenheten för liten. Kanske är du en person som inte ska ha säl.
        Vi dömer inte. Mycket.
      </p>

      <div className="info__section">
        <h2 className="info__section-title">Så går en retur till</h2>
        <ul className="info__list">
          <li>Kontakta oss inom 14 dagar från leveransdatum</li>
          <li>Berätta varför — inte för att vi kräver det, utan för att vi genuint undrar</li>
          <li>Sälen ska vara i ursprungligt skick, det vill säga levande och relativt ostressad</li>
          <li>Vi skickar en transportlåda och fisk för hemresan</li>
          <li>Återbetalning sker inom 5–7 arbetsdagar, efter att sälen verifierats</li>
        </ul>
      </div>

      <div className="info__box">
        <p className="info__box-title">Vad som gäller</p>
        <div className="info__box-rows">
          <div className="info__box-row">
            <span className="info__box-label">Ångerrätt</span>
            <span className="info__box-value">14 dagar från leverans</span>
          </div>
          <div className="info__box-row">
            <span className="info__box-label">Returfraktkostnad</span>
            <span className="info__box-value">Gratis (sälen simmar)</span>
          </div>
          <div className="info__box-row">
            <span className="info__box-label">Återbetalning</span>
            <span className="info__box-value">Hela beloppet, exkl. fisk som förbrukats</span>
          </div>
          <div className="info__box-row">
            <span className="info__box-label">Sälen som inte kan returneras</span>
            <span className="info__box-value">Sälar som fått eget Spotify-konto</span>
          </div>
        </div>
      </div>

      <div className="info__section">
        <h2 className="info__section-title">En vädjan</h2>
        <p className="info__section-text">
          Vi respekterar din ångerrätt fullt ut. Men vi vill ändå be dig att
          sova på saken en natt till. Ibland tar det lite tid för en säl att
          vänja sig. Sture, till exempel, verkar otrevlig de första tre dagarna
          men är sedan helt oemotståndlig. Det har vi sett gång på gång.
        </p>
        <p className="info__section-text">
          Om du ändå bestämt dig — ring oss. Vi pratar gärna igenom det.
          Björn-Erik gråter inte, han har bara allergier.
        </p>
      </div>

      <Link to="/salar" className="info__cta">Ge sälarna en ny chans →</Link>
    </div>
  )
}

export default Returns
