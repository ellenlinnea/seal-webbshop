import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider, useCart } from './context/CartContext'
import { FavsProvider, useFavs } from './context/FavsContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import SealList from './pages/SealList'
import SealDetail from './pages/SealDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Confirmation from './pages/Confirmation'

function AppContent() {
  const { cartCount } = useCart()
  const { favCount } = useFavs()

  return (
    <>
    {/* Header ligger här hela tiden på alla sidor */}
      <Header cartCount={cartCount} favCount={favCount} /> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/salar" element={<SealList />} />
        <Route path="/salar/:id" element={<SealDetail />} />
        <Route path="/varukorg" element={<Cart />} />
        <Route path="/kassa" element={<Checkout />} />
        <Route path="/bekraftelse/:id" element={<Confirmation />} />
        <Route path="/favoriter" element={<div>Favoriter</div>} />
        <Route path="/login" element={<div>Logga in</div>} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
      <Footer />
      {/* Footer ligger också utanför så den visas på alla sidor */}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <FavsProvider>
          <AppContent />
        </FavsProvider>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
