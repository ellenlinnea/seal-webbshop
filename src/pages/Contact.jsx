import './InfoPage.css'

function Contact() {
  return (
    <div className="info">
      <p className="info__eyebrow">Kontakt</p>
      <h1 className="info__title">Vi finns vid <em>piret.</em></h1>
      <p className="info__lead">
        Vi uppskattar att du hör av dig. Vi uppskattar det lite mindre om det är angående
        sälnummer tre — den frågan är internt stängd. I övrigt är vi tillgängliga
        på nedanstående tider, förutsatt att ingen säl håller på att simma iväg.
      </p>

      <div className="info__box">
        <p className="info__box-title">Kundtjänst</p>
        <div className="info__box-rows">
          <div className="info__box-row">
            <span className="info__box-label">E-post</span>
            <span className="info__box-value">salar@sealthedeal.se</span>
          </div>
          <div className="info__box-row">
            <span className="info__box-label">Telefon</span>
            <span className="info__box-value">0524 – ett nummer vi håller på att skaffa</span>
          </div>
          <div className="info__box-row">
            <span className="info__box-label">Fysiskt</span>
            <span className="info__box-value">Piret utanför Grebbestad, vänster om båten</span>
          </div>
        </div>
      </div>

      <div className="info__box">
        <p className="info__box-title">Öppettider</p>
        <div className="info__box-rows">
          <div className="info__box-row">
            <span className="info__box-label">Måndag – fredag</span>
            <span className="info__box-value">06:00 – 08:00 (sälfrukost)</span>
          </div>
          <div className="info__box-row">
            <span className="info__box-label">Lördag</span>
            <span className="info__box-value">Stängt, Björn-Erik paddlar</span>
          </div>
          <div className="info__box-row">
            <span className="info__box-label">Söndag</span>
            <span className="info__box-value">Stängt, sälarna vilar</span>
          </div>
          <div className="info__box-row">
            <span className="info__box-label">Midsommar</span>
            <span className="info__box-value">Absolut inte</span>
          </div>
        </div>
      </div>

      <div className="info__section">
        <h2 className="info__section-title">Väntetid på svar</h2>
        <p className="info__section-text">
          Vi svarar på e-post inom 1–3 arbetsdagar. Om ditt ärende är brådskande
          ber vi dig att definiera om vad "brådskande" innebär i relation till sälar —
          det hjälper oss båda. Vid akuta sälärenden: stå vid piret och ropa "Björn-Erik".
        </p>
      </div>
    </div>
  )
}

export default Contact
