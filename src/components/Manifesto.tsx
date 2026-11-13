import { navLinks } from '../data/site'
import { manifesto } from '../data/content'
import { useSectionNav } from '../lib/navigation'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Manifesto() {
  const go = useSectionNav()

  return (
    <section className="mx-auto max-w-[1500px] px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-9">
          <SectionHeading label={manifesto.label} title={manifesto.statement} size="md" />
        </div>

        <Reveal className="lg:col-span-5 lg:col-start-7" delay={0.1}>
          <p className="text-[15px] leading-[1.9] text-brown/90">{manifesto.paragraph}</p>
          <button
            type="button"
            onClick={() => go(navLinks[1])}
            className="label link-line mt-8 text-graphite"
          >
            {manifesto.linkLabel} <span aria-hidden="true">→</span>
          </button>
        </Reveal>
      </div>
    </section>
  )
}
