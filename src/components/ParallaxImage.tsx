import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'

type ParallaxImageProps = {
  src: string
  alt: string
  /** Classes do contêiner (definem proporção/altura) */
  className?: string
  /** Classes extras na imagem */
  imgClassName?: string
  /** Carregamento prioritário (hero) */
  priority?: boolean
  /** Revelação com máscara ao entrar no viewport */
  reveal?: boolean
  /** Zoom sutil ao passar o cursor (imagens de portfólio) */
  zoom?: boolean
}

/**
 * Fotografia cinematográfica com parallax no scroll e
 * revelação por máscara — o conjunto pede no PRD.
 */
export default function ParallaxImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  priority = false,
  reveal = false,
  zoom = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  const handleEnter = () => {
    if (!zoom || prefersReducedMotion() || !imgRef.current) return
    gsap.to(imgRef.current, { scale: 1.055, duration: 1.1, ease: 'power3.out', overwrite: 'auto' })
  }

  const handleLeave = () => {
    if (!zoom || prefersReducedMotion() || !imgRef.current) return
    gsap.to(imgRef.current, { scale: 1, duration: 1.1, ease: 'power3.out', overwrite: 'auto' })
  }

  useEffect(() => {
    const container = containerRef.current
    const img = imgRef.current
    if (!container || !img) return

    const reduced = prefersReducedMotion()
    if (reduced) return

    const ctx = gsap.context(() => {
      if (reveal) {
        gsap.fromTo(
          container,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.5,
            ease: 'power4.out',
            scrollTrigger: { trigger: container, start: 'top 88%', once: true },
          },
        )
        gsap.from(img, {
          scale: 1.18,
          duration: 1.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: container, start: 'top 88%', once: true },
        })
      }
    }, container)

    // Parallax desativado no mobile (desempenho) e com movimento reduzido
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      gsap.fromTo(
        img,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    })

    return () => {
      mm.revert()
      ctx.revert()
    }
  }, [reveal, src])

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`relative overflow-hidden bg-beige ${className}`}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`absolute left-0 top-[-7%] h-[114%] w-full object-cover will-change-transform ${imgClassName}`}
      />
    </div>
  )
}
