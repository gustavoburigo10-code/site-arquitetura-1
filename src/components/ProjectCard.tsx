import { Link } from 'react-router-dom'
import ParallaxImage from './ParallaxImage'
import { categoryLabel } from '../data/projects'
import type { Project } from '../data/projects'

type ProjectCardProps = {
  project: Project
  /** Proporção da imagem */
  ratio?: string
}

/** Cartão editorial de projeto: capa com zoom sutil + metadados. */
export default function ProjectCard({ project, ratio = 'aspect-[4/5]' }: ProjectCardProps) {
  return (
    <Link to={`/projeto/${project.slug}`} className="group block">
      <ParallaxImage
        src={project.cover}
        alt={`${project.title} — imagem provisória`}
        className={ratio}
        zoom
        reveal
      />
      <div className="mt-5 flex items-baseline justify-between gap-5 border-t border-graphite/15 pt-4">
        <h3 className="font-display text-[1.55rem] leading-none transition-colors duration-500 group-hover:text-brown">
          {project.title}
          {project.provisionalTitle && (
            <sup className="ml-1 align-super text-[0.45em] text-sand" title="Título provisório">
              †
            </sup>
          )}
        </h3>
        <span className="label whitespace-nowrap text-sand">{categoryLabel(project.category)}</span>
      </div>
      <p className="label mt-2 text-brown/55">
        {project.location ?? 'Localização a confirmar'}
      </p>
    </Link>
  )
}
