import ParallaxImage from './ParallaxImage'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { architect } from '../data/content'

/** Seção 05 — O arquiteto. */
export default function Architect() {
  return (
    <section
      id="arquiteto"
      className="mx-auto max-w-[1500px] px-6 py-24 md:px-10 md:py-32 lg:px-16"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <ParallaxImage
            src="/marcello-moreira.png"
            alt="Marcello Moreira — retrato do arquiteto"
            className="aspect-[3/4] w-full"
            reveal
          />
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
          <SectionHeading label={architect.label} title={architect.title} size="lg" />

          <Reveal delay={0.1}>
            <p className="label mt-6 text-sand-ink">{architect.role}</p>
            <p className="mt-6 max-w-xl text-[15px] leading-[1.95] text-brown/90">
              {architect.paragraph}
            </p>
            <p className="mt-8 max-w-lg border-l border-sand/50 pl-4 text-xs italic leading-relaxed text-sand-ink">
              {architect.note}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
