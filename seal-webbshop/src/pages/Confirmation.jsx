import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getOrder } from '../hooks/useOrders'
import './Confirmation.css'

function Confirmation() {
  // Hämtar order-id från URL:en
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  // Hämtar den sparade ordern från databasen baserat på id
  useEffect(() => {
    getOrder(id)
      .then(data => {
        setOrder(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) return <p className="confirmation__loading">Hämtar orderbekräftelse...</p>
  if (!order) return <p className="confirmation__loading">Ordern hittades inte.</p>

  return (
    <div className="confirmation">
      <div className="confirmation__top">
        <p className="confirmation__eyebrow">Ordernummer #{order.id}</p>
        <h1 className="confirmation__title">Tack för ditt <em>köp!</em></h1>
        <p className="confirmation__sub">
          En bekräftelse har skickats till <strong>{order.customer.email}</strong>.<br />
          Din säl är på väg — inpackad i våtdräkt och med fisk för två dagar.
        </p>
      </div>

      {/* Visar vilka sälar som ingick i ordern */}
      <div className="confirmation__items">
        {order.items.map(item => (
          <div key={item.id} className="confirmation__item">
            <img src={item.image} alt={item.name} className="confirmation__item-img" />
            <div className="confirmation__item-info">
              <h3 className="confirmation__item-name">{item.name}</h3>
              <p className="confirmation__item-meta">{item.personality} · {item.age} år</p>
            </div>
            <span className="confirmation__item-price">{item.price.toLocaleString('sv-SE')} kr</span>
          </div>
        ))}
      </div>

      {/* Leveransinfo och totalpris */}
      <div className="confirmation__summary">
        <div className="confirmation__address">
          <p className="confirmation__summary-label">Levereras till</p>
          <p>{order.customer.name}</p>
          <p>{order.customer.address}</p>
          <p>{order.customer.zip} {order.customer.city}</p>
        </div>
        <div className="confirmation__total">
          <p className="confirmation__summary-label">Totalt betalt</p>
          <p className="confirmation__total-amount">{order.total.toLocaleString('sv-SE')} kr</p>
        </div>
      </div>

      <div className="confirmation__actions">
        <Link to="/" className="confirmation__home-btn">Tillbaka till startsidan</Link>
        <Link to="/salar" className="confirmation__more-link">Hitta fler sälar →</Link>
      </div>
    </div>
  )
}

export default Confirmation
