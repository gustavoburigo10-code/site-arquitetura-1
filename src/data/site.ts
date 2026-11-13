/**
 * Identidade, navegação e canais de contato.
 * ATENÇÃO: dados de contato marcados como `provisional` devem ser substituídos
 * pelas informações confirmadas pelo escritório antes da publicação.
 */

export const site = {
  name: 'Marcello Moreira',
  displayName: 'MARCELLO MOREIRA',
  brandSuffix: 'ARQUITETURA',
  tagline: 'Arquitetura como investimento, identidade e experiência.',
  title: 'Marcello Moreira — Arquitetura',
} as const

export type NavItem = {
  label: string
  /** Rota (react-router) */
  to: string
  /** Id de seção — navega para a home e rola suavemente */
  section?: string
}

export const navLinks: NavItem[] = [
  { label: 'Início', to: '/' },
  { label: 'Portfólio', to: '/portfolio' },
  { label: 'Bastidores', to: '/', section: 'bastidores' },
  { label: 'Contato', to: '/', section: 'contato' },
]

export type Channel = {
  label: string
  value: string
  href?: string
  provisional?: boolean
}

export const contact: { whatsapp: Channel; instagram: Channel; email: Channel; address: Channel } = {
  whatsapp: {
    label: 'WhatsApp',
    value: '+55 (00) 00000-0000',
    href: 'https://wa.me/',
    provisional: true,
  },
  instagram: {
    label: 'Instagram',
    value: '@ (perfil a confirmar)',
    href: 'https://www.instagram.com/',
    provisional: true,
  },
  email: {
    label: 'E-mail',
    value: 'e-mail do escritório (a confirmar)',
    provisional: true,
  },
  address: {
    label: 'Endereço',
    value: 'Endereço do escritório — a confirmar',
    provisional: true,
  },
}
