/** Conteúdo editorial provisório — revisar e aprovar com o escritório. */

export const manifesto = {
  label: 'O escritório',
  statement:
    'Arquitetura que traduz investimento, identidade e experiência em matéria, luz e proporção.',
  paragraph:
    'Cada projeto parte da leitura do lugar, do programa e das pessoas que irão habitá-lo. Do estudo preliminar ao acompanhamento de obra, o processo é conduzido com rigor técnico e sensibilidade estética — do primeiro desenho ao último detalhe construtivo.',
  linkLabel: 'Ver portfólio',
}

export type ProcessStep = {
  index: string
  title: string
  text: string
  photo: string
}

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`

export const processSteps: ProcessStep[] = [
  {
    index: '01',
    title: 'Estudos e desenhos',
    text: 'Levantamento, partido e estudos preliminares. O projeto nasce do desenho e da análise crítica do terreno, da orientação solar e do programa.',
    photo: img('photo-1598368195835-91e67f80c9d7'),
  },
  {
    index: '02',
    title: 'Escolha de materiais',
    text: 'Paleta material definida junto ao cliente: texturas, acabamentos e desempenho ao longo do tempo, sempre a serviço da arquitetura.',
    photo: img('photo-1569258592171-357ea26da4df'),
  },
  {
    index: '03',
    title: 'Desenvolvimento dos projetos',
    text: 'Projeto executivo, detalhamento e compatibilização das disciplinas — documentação completa para orçamento e execução.',
    photo: img('photo-1603901622056-0a5bee231395'),
  },
  {
    index: '04',
    title: 'Acompanhamento de obras',
    text: 'Presença em obra, revisão de execução e ajustes para que o desenho se torne construção com fidelidade.',
    photo: img('photo-1503387837-b154d5074bd2'),
  },
  {
    index: '05',
    title: 'Registros de execução',
    text: 'Registro fotográfico do processo — do início da obra ao acabamento — para garantir qualidade e rastreabilidade de cada etapa.',
    photo: img('photo-1581674662583-5e89b374fae6'),
  },
]

export const architect = {
  label: 'O arquiteto',
  title: 'Marcello Moreira',
  role: 'Arquiteto responsável',
  paragraph:
    'Marcello Moreira conduz o trabalho do escritório com uma abordagem que combina rigor técnico, sensibilidade material e leitura cuidadosa de cada contexto — do estudo preliminar ao acompanhamento de obra, garantindo coerência entre o que é desenhado e o que é construído.',
  note: 'Texto e retrato provisórios — a substituir pela biografia e pelas fotografias oficiais do escritório.',
}

export const contactSection = {
  label: 'Contato',
  title: 'Vamos conversar sobre seu próximo projeto?',
  intro:
    'Conte um pouco sobre o seu terreno, o programa e o prazo. O escritório retorna com os próximos passos.',
}

export const provisionalNotice =
  'Conteúdo provisório: fotografias, títulos de projetos e dados institucionais são temporários e devem ser substituídos por materiais confirmados pelo escritório.'
