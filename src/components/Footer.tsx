import { Link } from 'react-router-dom'
import { contact, navLinks, site } from '../data/site'
import { useSectionNav } from '../lib/navigation'
import { provisionalNotice } from '../data/content'

export default function Footer() {
  const go = useSectionNav()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-graphite text-cream">
      <div className="mx-auto max-w-[1500px] px-6 pt-20 md:px-10 md:pt-28 lg:px-16">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="font-display text-[clamp(2rem,5vw,3.6rem)] uppercase leading-none tracking-[0.06em]">
              {site.displayName}
            </p>
            <p className="label mt-4 text-sand">{site.brandSuffix}</p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-beige/75">{site.tagline}</p>
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="label link-line self-start text-beige md:self-end"
          >
            Voltar ao topo ↑
          </button>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 border-t border-cream/15 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="label mb-6 text-sand">Navegação</p>
            <ul className="space-y-3">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => go(item)}
                    className="text-sm text-beige/85 transition-colors duration-300 hover:text-cream"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label mb-6 text-sand">Contato</p>
            <ul className="space-y-3 text-sm text-beige/85">
              <li>
                <a
                  href={contact.whatsapp.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors duration-300 hover:text-cream"
                >
                  {contact.whatsapp.label} ↗ <span className="text-sand">(provisório)</span>
                </a>
              </li>
              <li>
                <a
                  href={contact.instagram.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors duration-300 hover:text-cream"
                >
                  {contact.instagram.label} ↗ <span className="text-sand">(provisório)</span>
                </a>
              </li>
              <li className="text-beige/70">{contact.email.value}</li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="label mb-6 text-sand">Escritório</p>
            <p className="text-sm leading-relaxed text-beige/85">{contact.address.value}</p>
            <p className="mt-4 text-xs leading-relaxed text-sand">{provisionalNotice}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-cream/15 py-8 text-xs text-beige/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.displayName} — {site.brandSuffix}
          </p>
          <p>
            Site institucional ·{' '}
            <Link to="/portfolio" className="underline underline-offset-4 hover:text-cream">
              Portfólio
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
