import ParallaxImage from './ParallaxImage'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { processSteps } from '../data/content'

export default function Process() {
  return (
    <section id="bastidores" className="bg-graphite text-cream">
      <div className="mx-auto max-w-[1500px] px-6 py-24 md:px-10 md:py-32 lg:px-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              label="Bastidores e execução"
              title="Do desenho à obra"
              tone="light"
            />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9 lg:self-end" delay={0.1}>
            <p className="text-sm leading-[1.9] text-beige/80">
              O processo por trás de cada projeto: estudos, escolha de materiais,
              detalhamento executivo e acompanhamento próximo de obra — etapas
              registradas em desenho e fotografia.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-12 md:gap-6">
          <ParallaxImage
            src={processSteps[0].photo}
            alt="Estudo preliminar em prancheta — imagem provisória"
            className="aspect-[16/10] md:col-span-6"
            reveal
          />
          <ParallaxImage
            src={processSteps[1].photo}
            alt="Escolha de materiais e texturas — imagem provisória"
            className="aspect-[3/4] md:col-span-3 md:mt-16"
            reveal
          />
          <ParallaxImage
            src={processSteps[4].photo}
            alt="Detalhamento executivo — imagem provisória"
            className="aspect-[3/4] md:col-span-3 md:mt-6"
            reveal
          />
        </div>

        <div className="mt-16 border-t border-cream/15 md:mt-24">
          {processSteps.map((step) => (
            <Reveal
              key={step.index}
              className="grid grid-cols-1 gap-3 border-b border-cream/15 py-8 md:grid-cols-12 md:gap-8 md:py-10"
            >
              <span className="label text-sand md:col-span-1">{step.index}</span>
              <h3 className="font-display text-[1.7rem] leading-none md:col-span-4 md:text-[2rem]">
                {step.title}
              </h3>
              <p className="text-sm leading-[1.9] text-beige/80 md:col-span-6 md:col-start-7">
                {step.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
