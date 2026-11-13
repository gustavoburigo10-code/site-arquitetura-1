import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { contact, navLinks } from '../data/site'
import { useSectionNav } from '../lib/navigation'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const go = useSectionNav()
  const contatoLink = navLinks.find((item) => item.section === 'contato')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  // Topo de todas as páginas é escuro (hero, capa do projeto, cabeçalho do portfólio)
  const transparent = !scrolled || open

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-700 ${
          transparent
            ? 'bg-transparent text-cream'
            : 'border-b border-graphite/10 bg-cream/95 text-graphite backdrop-blur-md'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
      >
        <div className="mx-auto flex h-[68px] max-w-[1500px] items-center justify-between px-6 md:h-[88px] md:px-10 lg:px-16">
          <Link to="/" className="group flex flex-col leading-none" aria-label="MARCELLO MOREIRA ARQUITETURA — início">
            <span className="font-display text-[15px] uppercase tracking-[0.22em] md:text-[17px]">
              Marcello Moreira
            </span>
            {' '}
            <span className="label mt-1.5 opacity-70 transition-opacity group-hover:opacity-100">
              Arquitetura
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {navLinks.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => go(item)}
                className="label link-line hover:opacity-100 opacity-80"
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                if (contatoLink) go(contatoLink)
              }}
              className={`label border px-6 py-3 transition-colors duration-500 ${
                transparent
                  ? 'border-cream/50 hover:bg-cream hover:text-graphite'
                  : 'border-graphite/40 hover:bg-graphite hover:text-cream'
              }`}
            >
              Vamos conversar
            </button>
          </nav>

          <button
            type="button"
            className="label lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          >
            {open ? 'Fechar' : 'Menu'}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="fixed inset-0 z-40 bg-graphite text-cream lg:hidden"
          >
            <div className="flex h-full flex-col justify-between px-6 pb-10 pt-28">
              <motion.nav
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } } }}
                className="flex flex-col"
              >
                {navLinks.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    <button
                      type="button"
                      onClick={() => go(item)}
                      className="block w-full border-b border-cream/12 py-5 text-left font-display text-[2.3rem] font-light leading-none"
                    >
                      {item.label}
                    </button>
                  </motion.div>
                ))}
              </motion.nav>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
                className="space-y-3"
              >
                <a
                  className="label-lg block text-beige"
                  href={contact.whatsapp.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp ↗
                </a>
                <a
                  className="label-lg block text-beige"
                  href={contact.instagram.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram ↗
                </a>
                <p className="label text-sand">{contact.address.value}</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
