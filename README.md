# Marcello Moreira — Arquitetura

Site institucional / portfólio de escritório de arquitetura.
React + TypeScript + Vite + Tailwind CSS v4 + GSAP (ScrollTrigger) + Framer Motion.

## Rodar o projeto

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + build de produção
npm run lint     # oxlint
```

## Estrutura

```
src/
├── App.tsx                 # HashRouter + transição entre páginas
├── index.css               # Tailwind + paleta + tipografia + componentes base
├── lib/
│   ├── gsap.ts             # registro do ScrollTrigger + prefers-reduced-motion
│   └── navigation.ts       # navegação por rota/âncora reutilizável
├── data/
│   ├── site.ts             # marca, menu, canais de contato
│   ├── projects.ts         # portfólio (projetos, categorias, fotos)
│   └── content.ts          # manifesto, bastidores, arquiteto, contato
├── components/             # Hero, Manifesto, FeaturedProjects, Process, Architect,
│                           # Contact, Nav, Footer, ProjectCard, Lightbox,
│                           # ParallaxImage, Reveal, SectionHeading
└── pages/                  # Home, Portfolio, ProjectPage
```

### Rotas

| Rota                | Conteúdo                                    |
| ------------------- | ------------------------------------------- |
| `#/`                | Home: hero, manifesto, destaques, bastidores, arquiteto, contato |
| `#/portfolio`       | Portfólio com filtros por categoria         |
| `#/projeto/:slug`   | Página individual com galeria + lightbox    |

### Identidade visual

- **Paleta:** Grafite `#201F1D` · Marrom `#493B30` · Areia `#A38A70` · Bege `#D6C9B8` · Off-white `#F4F1EB`
- **Tipografia:** Cormorant Garamond (títulos editorial) + Inter (textos e micro-labels)
- Tokens em `src/index.css` → bloco `@theme` (cores, fontes, easing)

### Animações

- **GSAP + ScrollTrigger:** parallax nas fotografias, revelação por máscara, zoom de entrada, animação das manchetes palavra a palavra, timeline do hero.
- **Framer Motion:** menu overlay, transição entre páginas, lightbox, filtros do portfólio (`layoutId`), formulário.
- Parallax desligado abaixo de 768px; tudo desligado com `prefers-reduced-motion`.

---

## ⚠️ Conteúdo provisório (obrigatório substituir antes de publicar)

O PRD proíbe inventar trabalhos, resultados ou informações. Por isso, todo o
conteúdo abaixo é **identificado como provisório** na própria interface:

| Item | Onde alterar |
| ---- | ------------ |
| Fotografias de projetos (banco de imagens) | `src/data/projects.ts` → `PHOTOS`; `src/data/content.ts` |
| Retrato do arquiteto (real, extraído do print enviado) | `public/marcello-moreira.png` |
| Títulos de projetos (`Residência 01`, `Corporativo 01`, `†`) | `src/data/projects.ts` → `projects` |
| Nomes **SIX** e **Casa Kennedy** (a confirmar com o escritório) | idem |
| Descrições de projeto (`[Descrição provisória]`) | `src/data/projects.ts` → `DESC()` |
| WhatsApp, Instagram, e-mail e endereço | `src/data/site.ts` → `contact` |
| Textos de manifesto, bastidores, arquiteto e contato | `src/data/content.ts` |
| Formulário (demonstrativo — sem servidor de e-mail) | `src/components/Contact.tsx` |

Ao substituir uma foto: troque a URL em `PHOTOS`/`content.ts` por uma imagem
real do escritório (ideal: WebP/AVIF, ~1600–2400px de largura, `loading="lazy"`
já tratado pelos componentes).

### Arquivos sobras do template (podem ser excluídos)

`src/App.css`, `src/assets/react.svg`, `src/assets/vite.svg`, `src/assets/hero.ts`,
`public/icons.svg` — não são utilizados pelo site.
