import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { contact } from '../data/site'
import { contactSection } from '../data/content'

type FormValues = { name: string; email: string; phone: string; message: string }
type FormErrors = Partial<Record<keyof FormValues, string>>

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const EMPTY: FormValues = { name: '', email: '', phone: '', message: '' }

export default function Contact() {
  const [values, setValues] = useState<FormValues>(EMPTY)
  const [errors, setErrors] = useState<FormErrors>({})
  const [sent, setSent] = useState(false)

  const handleChange =
    (key: keyof FormValues) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [key]: e.target.value }))
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const next: FormErrors = {}
    if (!values.name.trim()) next.name = 'Informe seu nome.'
    if (!EMAIL_RE.test(values.email.trim())) next.email = 'Informe um e-mail válido.'
    if (values.message.trim().length < 10) next.message = 'Conte um pouco mais sobre o projeto.'
    setErrors(next)
    if (Object.keys(next).length === 0) setSent(true)
  }

  const channels = [contact.whatsapp, contact.instagram, contact.email, contact.address]

  return (
    <section id="contato" className="bg-graphite text-cream">
      <div className="mx-auto max-w-[1500px] px-6 py-24 md:px-10 md:py-32 lg:px-16">
        <SectionHeading
          label={contactSection.label}
          title={contactSection.title}
          tone="light"
          size="lg"
          className="max-w-4xl"
        />

        <div className="mt-14 grid grid-cols-1 gap-12 md:mt-20 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="max-w-md text-sm leading-[1.9] text-beige/85">
              {contactSection.intro}
            </p>

            <ul className="mt-10 border-t border-cream/15">
              {channels.map((channel) => {
                const body = (
                  <span className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <span className="label text-sand">{channel.label}</span>
                    <span className="text-sm text-beige/90">
                      {channel.value}
                      {channel.provisional && (
                        <span className="ml-2 text-[10px] uppercase tracking-[0.2em] text-sand/80">
                          provisório
                        </span>
                      )}
                    </span>
                  </span>
                )
                return (
                  <li key={channel.label} className="border-b border-cream/15 py-4">
                    {channel.href ? (
                      <a
                        href={channel.href}
                        target="_blank"
                        rel="noreferrer"
                        className="block transition-opacity duration-300 hover:opacity-70"
                      >
                        {body}
                      </a>
                    ) : (
                      body
                    )}
                  </li>
                )
              })}
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.12}>
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="space-y-7"
                >
                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                    <div>
                      <label className="label mb-1 block text-sand" htmlFor="name">
                        Nome*
                      </label>
                      <input
                        id="name"
                        className={`field ${errors.name ? 'field-error' : ''}`}
                        value={values.name}
                        onChange={handleChange('name')}
                        placeholder="Seu nome"
                        autoComplete="name"
                      />
                      {errors.name && <p className="mt-2 text-xs text-[#c98d7b]">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="label mb-1 block text-sand" htmlFor="email">
                        E-mail*
                      </label>
                      <input
                        id="email"
                        type="email"
                        className={`field ${errors.email ? 'field-error' : ''}`}
                        value={values.email}
                        onChange={handleChange('email')}
                        placeholder="voce@email.com"
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p className="mt-2 text-xs text-[#c98d7b]">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="label mb-1 block text-sand" htmlFor="phone">
                      Telefone / WhatsApp
                    </label>
                    <input
                      id="phone"
                      className="field"
                      value={values.phone}
                      onChange={handleChange('phone')}
                      placeholder="(00) 00000-0000"
                      autoComplete="tel"
                    />
                  </div>

                  <div>
                    <label className="label mb-1 block text-sand" htmlFor="message">
                      Sobre o projeto*
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className={`field resize-none ${errors.message ? 'field-error' : ''}`}
                      value={values.message}
                      onChange={handleChange('message')}
                      placeholder="Terreno, programa, prazo…"
                    />
                    {errors.message && (
                      <p className="mt-2 text-xs text-[#c98d7b]">{errors.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
                    <button type="submit" className="btn btn-light">
                      Enviar mensagem <span aria-hidden="true">→</span>
                    </button>
                    <p className="text-xs leading-relaxed text-sand/80">
                      Formulário demonstrativo — serviço de e-mail ainda não conectado.
                    </p>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="border border-cream/25 p-8 md:p-10"
                >
                  <p className="label text-sand">Mensagem registrada</p>
                  <p className="mt-5 font-display text-[1.9rem] leading-tight">
                    Obrigado, {values.name.split(' ')[0]}.
                  </p>
                  <p className="mt-4 max-w-md text-sm leading-[1.9] text-beige/85">
                    Esta versão do site ainda não envia e-mails. Enquanto a integração não é
                    concluída, fale diretamente pelo WhatsApp ou pelo Instagram — os canais ao
                    lado.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setValues(EMPTY)
                      setSent(false)
                    }}
                    className="label link-line mt-8 text-beige"
                  >
                    Enviar outra mensagem
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
