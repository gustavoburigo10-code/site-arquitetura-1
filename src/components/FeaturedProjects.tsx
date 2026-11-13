import { Link } from 'react-router-dom'
import ParallaxImage from './ParallaxImage'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { categoryLabel, featuredSlugs, getProject } from '../data/projects'
import type { Project } from '../data/projects'

const ROWS = [
  {
    aspect: 'aspect-[16/10]',
    imageCls: 'lg:col-span-8 lg:col-start-1',
    textCls: 'lg:col-span-3 lg:col-start-10 lg:self-end lg:pb-4',
  },
  {
    aspect: 'aspect-[4/5]',
    imageCls: 'lg:col-span-5 lg:col-start-7',
    textCls: 'lg:col-span-4 lg:col-start-2 lg:self-center',
  },
  {
    aspect: 'aspect-[21/9]',
    imageCls: 'lg:col-span-11 lg:col-start-2',
    textCls: 'lg:col-span-4 lg:col-start-2',
  },
]

export default function FeaturedProjects() {
  const items = featuredSlugs
    .map((slug) => getProject(slug))
    .filter((p): p is Project => Boolean(p))

  return (
    <section id="destaques" className="mx-auto max-w-[1500px] px-6 pb-24 md:px-10 md:pb-32 lg:px-16">
      <div className="flex flex-col gap-6 border-t border-graphite/15 pt-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading label="Projetos em destaque" title="Seleção do portfólio" />
        <Link to="/portfolio" className="label link-line self-start text-graphite md:self-end">
          Ver portfólio completo <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="mt-14 space-y-20 md:mt-20 md:space-y-28">
        {items.map((project, i) => {
          const row = ROWS[i % ROWS.length]
          return (
            <div
              key={project.slug}
              className="grid grid-cols-1 items-end gap-7 lg:grid-cols-12 lg:gap-10"
            >
              <div className={row.imageCls}>
                <Link to={`/projeto/${project.slug}`} className="group block">
                  <ParallaxImage
                    src={project.cover}
                    alt={`${project.title} — imagem provisória`}
                    className={`${row.aspect} w-full`}
                    zoom
                    reveal
                  />
                </Link>
              </div>

              <Reveal className={row.textCls} delay={0.12}>
                <p className="label mb-4 text-sand-ink">
                  {String(i + 1).padStart(2, '0')} — {categoryLabel(project.category)}
                </p>
                <h3 className="font-display text-[clamp(1.9rem,3.2vw,3rem)] leading-none">
                  <Link to={`/projeto/${project.slug}`} className="transition-colors duration-500 hover:text-brown">
                    {project.title}
                    {project.provisionalTitle && (
                      <sup className="ml-1 align-super text-[0.4em] text-sand-ink">†</sup>
                    )}
                  </Link>
                </h3>
                <Link to={`/projeto/${project.slug}`} className="label link-line mt-6 text-graphite">
                  Ver projeto <span aria-hidden="true">→</span>
                </Link>
              </Reveal>
            </div>
          )
        })}
      </div>
    </section>
  )
}
