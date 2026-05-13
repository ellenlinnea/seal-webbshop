import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider, useCart } from './context/CartContext'
import { FavsProvider, useFavs } from './context/FavsContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import SealList from './pages/SealList'

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
        <Route path="/salar/:id" element={<div>Säl-detalj</div>} />
        <Route path="/varukorg" element={<div>Varukorg</div>} />
        <Route path="/kassa" element={<div>Kassa</div>} />
        <Route path="/bekraftelse" element={<div>Bekräftelse</div>} />
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
