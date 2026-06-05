import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scrollar till toppen varje gång man byter sida
// Lyssnar även på search för att footer-länkar med query-parametrar
// (t.ex. /salar?size=liten) också ska trigga scrollen, trots samma pathname
function ScrollToTop() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, search])

  return null
}

export default ScrollToTop
