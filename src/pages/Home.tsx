import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import Manifesto from '../components/Manifesto'
import FeaturedProjects from '../components/FeaturedProjects'
import Process from '../components/Process'
import Architect from '../components/Architect'
import Contact from '../components/Contact'

/** Página inicial — seções 01, 03, 04, 05 e 06 do PRD. */
export default function Home() {
  const location = useLocation()

  // Navegação por seção a partir de outras páginas: rola até a âncora após montar.
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null
    const target = state?.scrollTo
    if (!target) return
    const timer = setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
    }, 160)
    return () => clearTimeout(timer)
  }, [location.state])

  return (
    <>
      <Hero />
      <Manifesto />
      <FeaturedProjects />
      <Process />
      <Architect />
      <Contact />
    </>
  )
}
