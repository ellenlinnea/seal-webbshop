import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider, useCart } from './context/CartContext'
import { FavsProvider, useFavs } from './context/FavsContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import SealList from './pages/SealList'
import SealDetail from './pages/SealDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Confirmation from './pages/Confirmation'
import Favs from './pages/Favs'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import About from './pages/About'
import Contact from './pages/Contact'
import SealCare from './pages/SealCare'
import Shipping from './pages/Shipping'
import Returns from './pages/Returns'

function AppContent() {
  const { cartCount } = useCart()
  const { favCount } = useFavs()
  const { user, logout } = useAuth()

  return (
    <>
    {/* Header ligger här hela tiden på alla sidor */}
      <Header cartCount={cartCount} favCount={favCount} user={user} onLogout={logout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/salar" element={<SealList />} />
        <Route path="/salar/:id" element={<SealDetail />} />
        <Route path="/varukorg" element={<Cart />} />
        <Route path="/kassa" element={<Checkout />} />
        <Route path="/bekraftelse/:id" element={<Confirmation />} />
        <Route path="/favoriter" element={<Favs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/om-oss" element={<About />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="/salvard" element={<SealCare />} />
        <Route path="/frakt" element={<Shipping />} />
        <Route path="/returer" element={<Returns />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      {/* Footer ligger också utanför så den visas på alla sidor */}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <FavsProvider>
            <AppContent />
          </FavsProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
