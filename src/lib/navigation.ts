import { useLocation, useNavigate } from 'react-router-dom'
import type { NavItem } from '../data/site'

/**
 * Navegação inteligente: itens de rota mudam de página,
 * itens de seção levam à home e rolam suavemente até a âncora.
 */
export function useSectionNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (item: NavItem) => {
    if (item.section) {
      if (location.pathname === '/') {
        const el = document.getElementById(item.section)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          return
        }
      }
      navigate('/', { state: { scrollTo: item.section } })
    } else {
      navigate(item.to)
    }
  }
}
