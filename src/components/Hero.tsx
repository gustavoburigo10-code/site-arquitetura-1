import { useEffect, useRef } from 'react'
import { navLinks, site } from '../data/site'
import { PHOTOS } from '../data/projects'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { useSectionNav } from '../lib/navigation'

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null)
  const go = useSectionNav()

  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from('.hero-img', { scale: 1.14, duration: 2.8, ease: 'power2.out' }, 0)
        .from('.hero-line', { yPercent: 112, duration: 1.35, stagger: 0.12 }, 0.3)
        .from('.hero-fade', { y: 28, opacity: 0, duration: 1.1, stagger: 0.14 }, 0.95)

      gsap.to('.hero-img', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
      })

      gsap.to('.scroll-line', {
        scaleY: 0.15,
        transformOrigin: 'top',
        repeat: -1,
        yoyo: true,
        duration: 1.7,
        ease: 'power2.inOut',
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-graphite"
    >
      <img
        className="hero-img absolute inset-0 h-full w-full object-cover will-change-transform"
        src={PHOTOS.housePool}
        alt="Residência contemporânea com piscina ao entardecer — imagem provisória"
        loading="eager"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-graphite/85 via-graphite/25 to-graphite/60" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1500px] flex-col justify-end px-6 pb-12 md:px-10 md:pb-16 lg:px-16">
        <div className="mb-auto pt-28 md:pt-36">
          <p className="hero-fade label-lg text-beige/85">{site.brandSuffix} — Portfólio</p>
        </div>

        <h1 className="font-display text-[clamp(3rem,12.5vw,11rem)] uppercase leading-[0.85] tracking-[0.015em] text-cream">
          <span className="block overflow-hidden pb-[0.04em]">
            <span className="hero-line block">Marcello</span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="hero-line block">Moreira</span>
          </span>
        </h1>

        <div className="mt-7 flex flex-col gap-7 border-t border-cream/25 pt-6 md:mt-9 md:flex-row md:items-center md:justify-between">
          <p className="hero-fade max-w-md text-[15px] leading-relaxed text-beige">
            {site.tagline}
          </p>
          <button
            type="button"
            onClick={() => go(navLinks[1])}
            className="hero-fade btn btn-light self-start md:self-auto"
          >
            Explorar projetos <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 hidden h-14 w-px -translate-x-1/2 bg-cream/20 md:block">
        <div className="scroll-line h-full w-full bg-cream/75" />
      </div>
    </section>
  )
}
