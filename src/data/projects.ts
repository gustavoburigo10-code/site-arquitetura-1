export type Category =
  | 'residencial'
  | 'comercial'
  | 'corporativo'
  | 'interiores'
  | 'especial'

export type Project = {
  slug: string
  title: string
  /** Título provisório — ainda não confirmado com o escritório */
  provisionalTitle?: boolean
  category: Category
  location?: string
  cover: string
  gallery: string[]
  summary: string
}

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

/** Fotografias provisórias (Unsplash) — a substituir pelas imagens reais dos projetos. */
export const PHOTOS = {
  housePool: img('photo-1628012209120-d9db7abf7eab', 2400),
  whiteBuilding: img('photo-1748063578185-3d68121b11ff'),
  patio: img('photo-1600596542815-ffad4c1539a9'),
  whiteHouse: img('photo-1721815693498-cc28507c0ba2'),
  modernHouse: img('photo-1580587771525-78b9dba3b914'),
  livingMarble: img('photo-1564078516393-cf04bd966897'),
  lobby: img('photo-1497366754035-f200968a6e72'),
  restaurant: img('photo-1613274554329-70f997f5789f'),
  staircase: img('photo-1495321308589-43affb814eee'),
  concreteCurve: img('photo-1559763194-521eef49b386'),
  drafting: img('photo-1598368195835-91e67f80c9d7'),
  handsLayout: img('photo-1503387837-b154d5074bd2'),
  blueprint: img('photo-1603901622056-0a5bee231395'),
  plansRuler: img('photo-1581674662583-5e89b374fae6'),
  architectsDuo: img('photo-1582057811341-a22d524c6a4c'),
  concreteBlocks: img('photo-1569258592171-357ea26da4df'),
  kitchen: img('photo-1649083048597-d7b4f1e8a386'),
  bedroom: img('photo-1633944095397-878622ebc01c'),
  livingFireplace: img('photo-1606744824163-985d376605aa'),
  concreteStairs: img('photo-1565768502473-c5dc73b7eb33'),
  studio: img('photo-1556761175-4b46a572b786'),
  minimalInterior: img('photo-1618221195710-dd6b41faaea6'),
  lobbySeating: img('photo-1559136555-9303baea8ebd'),
  meeting: img('photo-1541746972996-4e0b0f43e02a'),
} as const

export const categories: { value: Category; label: string }[] = [
  { value: 'residencial', label: 'Residenciais' },
  { value: 'comercial', label: 'Comerciais' },
  { value: 'corporativo', label: 'Corporativo' },
  { value: 'interiores', label: 'Design de Interiores' },
  { value: 'especial', label: 'Especiais' },
]

const DESC = (title: string) =>
  `[Descrição provisória] ${title} — texto a ser substituído pela descrição oficial do projeto, fornecida pelo escritório: programa, área, materiais, referências e resultado construído.`

/**
 * Portfólio provisório.
 * SIX e Casa Kennedy são nomes citados no PRD (identificáveis no Instagram) e
 * devem ser confirmados com o escritório. Demais entradas são identificadas
 * como provisórias e servem para estruturar a galeria.
 */
export const projects: Project[] = [
  {
    slug: 'six',
    title: 'SIX',
    category: 'comercial',
    cover: PHOTOS.whiteBuilding,
    gallery: [PHOTOS.whiteBuilding, PHOTOS.lobby, PHOTOS.restaurant, PHOTOS.concreteCurve],
    summary: DESC('SIX'),
  },
  {
    slug: 'casa-kennedy',
    title: 'Casa Kennedy',
    category: 'residencial',
    cover: PHOTOS.patio,
    gallery: [PHOTOS.patio, PHOTOS.modernHouse, PHOTOS.livingMarble, PHOTOS.livingFireplace],
    summary: DESC('Casa Kennedy'),
  },
  {
    slug: 'residencia-01',
    title: 'Residência 01',
    provisionalTitle: true,
    category: 'residencial',
    cover: PHOTOS.whiteHouse,
    gallery: [PHOTOS.whiteHouse, PHOTOS.housePool, PHOTOS.bedroom, PHOTOS.kitchen],
    summary: DESC('Residência 01'),
  },
  {
    slug: 'residencia-02',
    title: 'Residência 02',
    provisionalTitle: true,
    category: 'residencial',
    cover: PHOTOS.modernHouse,
    gallery: [PHOTOS.modernHouse, PHOTOS.livingFireplace, PHOTOS.minimalInterior, PHOTOS.staircase],
    summary: DESC('Residência 02'),
  },
  {
    slug: 'corporativo-01',
    title: 'Corporativo 01',
    provisionalTitle: true,
    category: 'corporativo',
    cover: PHOTOS.lobby,
    gallery: [PHOTOS.lobbySeating, PHOTOS.lobby, PHOTOS.studio, PHOTOS.concreteCurve],
    summary: DESC('Corporativo 01'),
  },
  {
    slug: 'comercial-01',
    title: 'Comercial 01',
    provisionalTitle: true,
    category: 'comercial',
    cover: PHOTOS.restaurant,
    gallery: [PHOTOS.restaurant, PHOTOS.minimalInterior, PHOTOS.livingMarble, PHOTOS.concreteBlocks],
    summary: DESC('Comercial 01'),
  },
  {
    slug: 'interiores-01',
    title: 'Interiores 01',
    provisionalTitle: true,
    category: 'interiores',
    cover: PHOTOS.livingMarble,
    gallery: [PHOTOS.livingMarble, PHOTOS.kitchen, PHOTOS.bedroom, PHOTOS.livingFireplace],
    summary: DESC('Interiores 01'),
  },
  {
    slug: 'especial-01',
    title: 'Projeto Especial 01',
    provisionalTitle: true,
    category: 'especial',
    cover: PHOTOS.staircase,
    gallery: [PHOTOS.staircase, PHOTOS.concreteStairs, PHOTOS.concreteCurve, PHOTOS.concreteBlocks],
    summary: DESC('Projeto Especial 01'),
  },
]

export const featuredSlugs = ['six', 'casa-kennedy', 'interiores-01']

export const getProject = (slug?: string) => projects.find((p) => p.slug === slug)

export const categoryLabel = (value: Category) =>
  categories.find((c) => c.value === value)?.label ?? ''
