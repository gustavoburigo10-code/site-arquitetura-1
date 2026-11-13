import { Fragment, useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'

type SectionHeadingProps = {
  label?: string
  title: string
  /** Classes do contêiner */
  className?: string
  /** Cor do micro-rótulo */
  tone?: 'dark' | 'light'
  size?: 'md' | 'lg'
}

const SIZES = {
  md: 'text-[clamp(2.1rem,4.4vw,3.6rem)]',
  lg: 'text-[clamp(2.6rem,6vw,5.2rem)]',
}

/** Cabeçalho de seção com animação palavra a palavra. */
export default function SectionHeading({
  label,
  title,
  className = '',
  tone = 'dark',
  size = 'md',
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const words = root.querySelectorAll<HTMLElement>('.word-inner')
      gsap.from(words, {
        yPercent: 115,
        duration: 1.1,
        stagger: 0.055,
        ease: 'power4.out',
        scrollTrigger: { trigger: root, start: 'top 87%', once: true },
      })
    }, root)

    return () => ctx.revert()
  }, [title])

  const words = title.split(' ')

  return (
    <div ref={ref} className={className}>
      {label && (
        <div
          className={`label mb-6 flex items-center gap-4 ${
            tone === 'light' ? 'text-beige' : 'text-sand'
          }`}
        >
          <span className="inline-block h-px w-10 bg-current opacity-60" />
          {label}
        </div>
      )}
      <h2 className={SIZES[size]}>
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <span className="word-inner inline-block">{word}</span>
            </span>{' '}
          </Fragment>
        ))}
      </h2>
    </div>
  )
}
