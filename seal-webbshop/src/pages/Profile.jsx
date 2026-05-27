import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useMyOrders } from '../hooks/useOrders'
import './Profile.css'

function Profile() {
  const { user, logout } = useAuth()

  // Hämtar alla ordrar för den inloggade användaren via backenden
  const { orders, loading, error } = useMyOrders()

  return (
    <div className="profile">
      {/* Profil-header med användarinfo */}
      <div className="profile__header">
        <div>
          <p className="profile__eyebrow">Mitt konto</p>
          <h1 className="profile__title">Hej, <em>{user.name.split(' ')[0]}!</em></h1>
          <p className="profile__email">{user.email}</p>
        </div>
        <button className="profile__logout" onClick={logout}>Logga ut</button>
      </div>

      {/* Orderhistorik */}
      <div className="profile__section">
        <h2 className="profile__section-title">Orderhistorik</h2>

        {loading && <p className="profile__loading">Hämtar dina ordrar...</p>}
        {error && <p className="profile__error">{error}</p>}

        {!loading && !error && orders.length === 0 && (
          <div className="profile__empty">
            <p>Du har inte gjort några köp än.</p>
            <Link to="/salar" className="profile__empty-btn">Utforska sälar →</Link>
          </div>
        )}

        {/* Listar varje order som ett kort */}
        {orders.map(order => (
          <div key={order._id} className="profile__order">
            <div className="profile__order-header">
              <div>
                <p className="profile__order-id">Order #{order._id}</p>
                <p className="profile__order-date">
                  {new Date(order.createdAt).toLocaleDateString('sv-SE', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </p>
              </div>
              <span className="profile__order-total">{order.total.toLocaleString('sv-SE')} kr</span>
            </div>

            {/* Sälarna som ingick i ordern */}
            <div className="profile__order-items">
              {order.items.map(item => (
                <div key={item._id} className="profile__order-item">
                  <img src={item.image} alt={item.name} className="profile__order-img" />
                  <div>
                    <p className="profile__order-name">{item.name}</p>
                    <p className="profile__order-meta">{item.personality} · {item.age} år</p>
                  </div>
                  <span className="profile__order-price">{item.price.toLocaleString('sv-SE')} kr</span>
                </div>
              ))}
            </div>

            {/* Leveransadress */}
            <div className="profile__order-address">
              <span className="profile__order-address-label">Levererades till</span>
              <span>{order.customer.address}, {order.customer.zip} {order.customer.city}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile
