import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import ParallaxImage from '../components/ParallaxImage'
import Reveal from '../components/Reveal'
import Lightbox from '../components/Lightbox'
import { categoryLabel, getProject, projects } from '../data/projects'
import { provisionalNotice } from '../data/content'

const RATIOS = ['aspect-[4/5]', 'aspect-[16/10]', 'aspect-[4/5]', 'aspect-[16/10]']

/** Página individual do projeto — galeria, ambientes, detalhes e navegação. */
export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = getProject(slug)
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!project) return <Navigate to="/portfolio" replace />

  const index = projects.findIndex((p) => p.slug === project.slug)
  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  return (
    <div className="bg-cream">
      <header className="relative">
        <ParallaxImage
          src={project.cover}
          alt={`${project.title} — imagem provisória`}
          className="h-[72svh] min-h-[440px] w-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite/85 via-graphite/20 to-graphite/55" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-10 md:px-10 md:pb-14 lg:px-16">
          <div className="mx-auto max-w-[1500px]">
            <Link to="/portfolio" className="label link-line text-beige">
              ← Voltar ao portfólio
            </Link>
            <h1 className="mt-6 font-display text-[clamp(2.6rem,8vw,6.5rem)] uppercase leading-[0.9] tracking-[0.01em] text-cream">
              {project.title}
              {project.provisionalTitle && (
                <sup className="ml-2 align-super text-[0.32em] text-sand">†</sup>
              )}
            </h1>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[1500px] px-6 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="grid grid-cols-1 gap-10 border-b border-graphite/15 pb-14 lg:grid-cols-12 lg:gap-16">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            <div>
              <p className="label text-sand">Categoria</p>
              <p className="mt-3 text-sm text-graphite">{categoryLabel(project.category)}</p>
            </div>
            <div>
              <p className="label text-sand">Localização</p>
              <p className="mt-3 text-sm text-graphite">{project.location ?? 'A confirmar'}</p>
            </div>
            <div>
              <p className="label text-sand">Status</p>
              <p className="mt-3 text-sm text-graphite">Dados a confirmar</p>
            </div>
          </div>

          <Reveal className="lg:col-span-6 lg:col-start-7">
            <p className="text-[15px] leading-[1.95] text-brown/90">{project.summary}</p>
            <p className="mt-5 text-xs italic text-sand">
              Descrição provisória — a substituir pelo texto oficial do escritório.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 flex items-baseline justify-between gap-6">
          <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.8rem)]">Galeria</h2>
          <p className="label text-sand">
            {String(project.gallery.length).padStart(2, '0')} imagens — clique para ampliar
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {project.gallery.map((src, i) => (
            <div key={src + i} className={i % 3 === 1 ? 'md:mt-14' : ''}>
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="group block w-full cursor-zoom-in text-left"
                aria-label={`Ampliar imagem ${i + 1} de ${project.gallery.length}`}
              >
                <ParallaxImage
                  src={src}
                  alt={`${project.title} — ambiente ${i + 1} (imagem provisória)`}
                  className={`w-full ${RATIOS[i % RATIOS.length]}`}
                  zoom
                  reveal
                />
                <span className="label mt-3 block text-brown/60 transition-colors duration-500 group-hover:text-graphite">
                  Ambiente {String(i + 1).padStart(2, '0')}
                </span>
              </button>
            </div>
          ))}
        </div>

        <p className="mt-16 border-t border-graphite/15 pt-6 text-xs italic leading-relaxed text-sand">
          {provisionalNotice}
        </p>
      </section>

      <nav className="mx-auto grid max-w-[1500px] grid-cols-1 gap-px border-t border-graphite/15 px-6 md:grid-cols-2 md:px-10 lg:px-16">
        <Link
          to={`/projeto/${prev.slug}`}
          className="group py-10 transition-colors duration-500 md:pr-8"
        >
          <p className="label text-sand">Projeto anterior</p>
          <p className="mt-3 font-display text-[1.9rem] leading-none transition-colors duration-500 group-hover:text-brown">
            {prev.title}
          </p>
        </Link>
        <Link
          to={`/projeto/${next.slug}`}
          className="group border-t border-graphite/15 py-10 text-left md:border-l md:border-t-0 md:pl-8 md:text-right"
        >
          <p className="label text-sand">Próximo projeto</p>
          <p className="mt-3 font-display text-[1.9rem] leading-none transition-colors duration-500 group-hover:text-brown">
            {next.title}
          </p>
        </Link>
      </nav>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            images={project.gallery}
            index={lightbox}
            caption={`${project.title} — imagem provisória`}
            onIndexChange={setLightbox}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
