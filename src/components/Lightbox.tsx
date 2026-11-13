import { useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type LightboxProps = {
  images: string[]
  index: number
  caption?: string
  onIndexChange: (i: number) => void
  onClose: () => void
}

/** Galeria interativa em tela cheia — setas, contador e teclado. */
export default function Lightbox({ images, index, caption, onIndexChange, onClose }: LightboxProps) {
  const total = images.length

  const go = useCallback(
    (dir: 1 | -1) => {
      if (total === 0) return
      onIndexChange((index + dir + total) % total)
    },
    [index, total, onIndexChange],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [go, onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="fixed inset-0 z-[70] flex flex-col bg-graphite/97 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Galeria de fotografias"
    >
      <div className="flex items-center justify-between px-5 py-5 md:px-10">
        <p className="label text-beige">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>
        <button type="button" onClick={onClose} className="label text-cream hover:text-beige" aria-label="Fechar galeria">
          Fechar ✕
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 md:px-16">
        <button
          type="button"
          onClick={() => go(-1)}
          className="absolute left-2 z-10 p-4 text-cream/70 transition-colors hover:text-cream md:left-5"
          aria-label="Imagem anterior"
        >
          ←
        </button>

        <AnimatePresence mode="wait">
          <motion.img
            key={`${index}-${images[index]}`}
            src={images[index]}
            alt={`${caption ?? 'Projeto'} — imagem ${index + 1} de ${total}`}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="max-h-full max-w-full object-contain"
          />
        </AnimatePresence>

        <button
          type="button"
          onClick={() => go(1)}
          className="absolute right-2 z-10 p-4 text-cream/70 transition-colors hover:text-cream md:right-5"
          aria-label="Próxima imagem"
        >
          →
        </button>
      </div>

      <div className="flex items-center justify-between gap-6 px-5 py-5 md:px-10">
        <p className="truncate text-xs text-beige/70">{caption}</p>
        <div className="hidden gap-2 sm:flex">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onIndexChange(i)}
              aria-label={`Ir para imagem ${i + 1}`}
              className={`h-px w-7 transition-colors duration-300 ${
                i === index ? 'bg-cream' : 'bg-cream/30 hover:bg-cream/60'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
