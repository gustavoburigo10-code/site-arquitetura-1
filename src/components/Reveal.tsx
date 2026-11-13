import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Atraso em segundos */
  delay?: number
  /** Deslocamento vertical inicial (px) */
  y?: number
}

/** Revelação elegante ao rolar (GSAP + ScrollTrigger). */
export default function Reveal({ children, className, delay = 0, y = 42 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.from(el, {
        y,
        opacity: 0,
        duration: 1.15,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    }, el)

    return () => ctx.revert()
  }, [delay, y])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
