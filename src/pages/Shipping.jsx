import './InfoPage.css'

function Shipping() {
  return (
    <div className="info">
      <p className="info__eyebrow">Frakt & hemleverans</p>
      <h1 className="info__title">Din säl är <em>på väg.</em></h1>
      <p className="info__lead">
        Vi levererar sälar till hela Sverige, med undantag för vissa adresser i
        inlandet där vattentillgången bedöms som otillräcklig. Vi gör alltid
        en individuell bedömning, men Sälen (kommunen) går alltid igenom.
      </p>

      <div className="info__box">
        <p className="info__box-title">Leveransalternativ</p>
        <div className="info__box-rows">
          <div className="info__box-row">
            <span className="info__box-label">Standardleverans till havs</span>
            <span className="info__box-value">3–5 arbetsdagar, 0 kr över 10 000 kr</span>
          </div>
          <div className="info__box-row">
            <span className="info__box-label">Expressleverans</span>
            <span className="info__box-value">1–2 dagar, 599 kr (sälen stressas)</span>
          </div>
          <div className="info__box-row">
            <span className="info__box-label">Hämtning vid piret</span>
            <span className="info__box-value">Gratis, men ring först</span>
          </div>
          <div className="info__box-row">
            <span className="info__box-label">Leverans till Gotland</span>
            <span className="info__box-value">Sälen simmar dit själv, 7–10 dagar</span>
          </div>
        </div>
      </div>

      <div className="info__section">
        <h2 className="info__section-title">Förpackning</h2>
        <p className="info__section-text">
          Alla sälar levereras i fuktig miljö med fisk för två dagar och ett
          informationsbrev med sälens namn, ålder och tre saker den ogillar.
          Vi använder återvinningsbart material där det är möjligt, vilket det
          sällan är när man fraktar en säl.
        </p>
      </div>

      <div className="info__section">
        <h2 className="info__section-title">Spårning</h2>
        <p className="info__section-text">
          Du får ett spårningsnummer via e-post när sälen lämnar oss.
          Systemet uppdateras var sjätte timme, eller när Marita kommer ihåg det.
          Om spårningen inte uppdateras på mer än 48 timmar: sälen mår förmodligen
          bra men befinner sig utanför täckningsområdet.
        </p>
      </div>

      <div className="info__section">
        <h2 className="info__section-title">Viktigt att veta</h2>
        <ul className="info__list">
          <li>Se till att någon är hemma vid leverans — sälar skrivs inte under själva</li>
          <li>Ha ett badkar, bassäng eller likvärdig vattenkälla redo vid ankomst</li>
          <li>Leveransbudet kan verka trött — frakten är krävande, var snäll mot honom</li>
          <li>Om sälen verkar sur vid ankomst beror det på transporten, inte på dig</li>
          <li>Vi ansvarar inte för skador som uppstår om sälen lyckas öppna kartongen själv under frakten</li>
        </ul>
      </div>
    </div>
  )
}

export default Shipping
