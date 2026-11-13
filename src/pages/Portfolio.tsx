import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import SectionHeading from '../components/SectionHeading'
import { categories, projects } from '../data/projects'
import type { Category } from '../data/projects'
import { provisionalNotice } from '../data/content'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type Filter = 'todos' | Category

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  ...categories,
]

/** Seção 02 — Portfólio: filtros por categoria e grade editorial assimétrica. */
export default function Portfolio() {
  const [filter, setFilter] = useState<Filter>('todos')

  const visible = useMemo(
    () => (filter === 'todos' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )

  return (
    <div className="bg-cream">
      <header className="bg-graphite px-6 pb-16 pt-32 text-cream md:px-10 md:pb-20 md:pt-44 lg:px-16">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeading label="Portfólio" title="Trabalhos do escritório" tone="light" size="lg" />
          <p className="mt-8 max-w-xl text-sm leading-[1.9] text-beige/85">
            Projetos residenciais, comerciais, corporativos, de interiores e especiais.
            Cada trabalho abre em uma página individual com galeria, ambientes e detalhes.
          </p>
          <p className="label mt-8 text-sand/85">† títulos provisórios — a confirmar com o escritório</p>
        </div>
      </header>

      <section className="mx-auto max-w-[1500px] px-6 py-14 md:px-10 md:py-20 lg:px-16">
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4 border-b border-graphite/15 pb-6">
          {FILTERS.map((f) => {
            const active = f.value === filter
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                className={`label relative pb-2 transition-colors duration-500 ${
                  active ? 'text-graphite' : 'text-sand hover:text-graphite'
                }`}
              >
                {f.label}
                {active && (
                  <motion.span
                    layoutId="filter-underline"
                    className="absolute inset-x-0 bottom-0 h-px bg-graphite"
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                )}
              </button>
            )
          })}
          <span className="label ml-auto text-brown/50">
            {String(visible.length).padStart(2, '0')} projetos
          </span>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-12">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.55, ease: EASE, delay: Math.min(i * 0.05, 0.3) }}
                className={
                  // Composição assimétrica: colunas de larguras alternadas
                  i % 4 === 0
                    ? 'lg:col-span-7'
                    : i % 4 === 1
                      ? 'lg:col-span-5 lg:mt-16'
                      : i % 4 === 2
                        ? 'lg:col-span-5'
                        : 'lg:col-span-7 lg:mt-16'
                }
              >
                <ProjectCard project={project} ratio={i % 4 === 0 ? 'aspect-[16/11]' : 'aspect-[4/5]'} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {visible.length === 0 && (
          <p className="py-20 text-center text-sm text-brown/70">
            Nenhum projeto nesta categoria por enquanto.
          </p>
        )}

        <p className="mt-20 border-t border-graphite/15 pt-6 text-xs italic leading-relaxed text-sand">
          {provisionalNotice}
        </p>
      </section>
    </div>
  )
}
