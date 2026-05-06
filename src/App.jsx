import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<div>Hem</div>} />
        <Route path="/salar" element={<div>Sälbutiken</div>} />
        <Route path="/salar/:id" element={<div>Säl-detalj</div>} />
        <Route path="/varukorg" element={<div>Varukorg</div>} />
        <Route path="/kassa" element={<div>Kassa</div>} />
        <Route path="/bekraftelse" element={<div>Bekräftelse</div>} />
        <Route path="/favoriter" element={<div>Favoriter</div>} />
        <Route path="/login" element={<div>Logga in</div>} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App