import { Link } from 'react-router-dom'
import './InfoPage.css'

function NotFound() {
  return (
    <div className="info info--centered">
      <img src="/seal-the-deal-logo.svg" alt="" className="info__lost-logo" />
      <p className="info__eyebrow">Fel 404</p>
      <h1 className="info__title">Denna säl har <em>simmat iväg.</em></h1>
      <p className="info__lead" style={{ textAlign: 'center', maxWidth: '480px' }}>
        Sidan du letade efter finns inte — antingen för att den aldrig existerade,
        eller för att sälen i fråga tog en spontan semester till Grönland.
        Vi beklagar olägenheten. Sälen gör det inte.
      </p>
      <Link to="/" className="info__cta">Ta mig härifrån →</Link>
    </div>
  )
}

export default NotFound
