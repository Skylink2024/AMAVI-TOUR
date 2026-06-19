import { brandGuide } from '../config/brandGuide'

export const contact = {
  phone: '+244 945 527 543',
  whatsapp: '+244 945 527 543',
  email: 'AMAVI@AMAVI.CO.AO',
  website: 'amavi.co.ao',
}

export const images = {
  /** Deserto + mar — Namibe */
  heroNamibe: '/images/namibe-hero-hq.jpg',
  heroNamibeCoast: '/images/namibe-hero-hq.jpg',
  heroNamibeDesert: '/images/namibe-hero-hq.jpg',
  /** Homepage — Pedras Negras / Pungo Andongo (HQ) */
  heroMain: '/images/home-hero-pedras-negras-hq.jpg',
  brandIdentity: '/images/brand-identity.png',
  /** Paisagem de Huambo — terras altas e natureza */
  heroHuambo:
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=2400&q=85',
  heroHuamboGreen:
    'https://images.unsplash.com/photo-1518173946687-aae4e3b49baf?w=2400&q=85',
  casa2Exterior:
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80',
  casa2Room:
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&q=80',
  baraBara:
    'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600&q=80',
  otchimba:
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80',
  residenciesLodge:
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=80',
  residenciesNature:
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
  kandumbo:
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80',
  sunset:
    'https://images.unsplash.com/photo-1495616811223-4d98c987e7c1?w=1600&q=80',
}

export const aboutAmavi = {
  eyebrow: 'Turismo & Hospitalidade em Angola',
  title: 'Descubra Angola connosco',
  subtitle:
    'Do deserto e do mar em Namibe às terras altas de Huambo — a AMAVI abre portas a experiências autênticas, conforto e paisagens que ficam na memória.',
  description:
    'Somos uma empresa angolana de turismo e hotelaria. Criamos experiências memoráveis onde cada destino tem a sua alma — e cada hóspede se sente em casa.',
}

export const destinations = [
  {
    id: 'namibe',
    name: 'Namibe',
    tagline: 'Deserto, mar e história',
    description:
      'Onde as dunas douradas encontram o Atlântico. Praias selvagens, arquitetura colonial e o único deserto costeiro de África.',
    image: images.heroNamibe,
    link: '/namibe',
    accent: brandGuide.properties.casa2.accent,
    properties: ['Casa 2', 'Bara Bara', 'Otchimba Beach Bar'],
    highlights: ['Praias virgens', 'Deserto costeiro', 'Boutique hotel', 'Beach bar exclusivo'],
  },
  {
    id: 'huambo',
    name: 'Huambo',
    tagline: 'Natureza, tranquilidade e conexão',
    description:
      'Terras altas verdes, clima ameno e paisagens que convidam ao descanso. Lodge na natureza e grutas milenares.',
    image: images.heroHuambo,
    link: '/huambo',
    accent: brandGuide.properties.residencies.accent,
    properties: ['A Residencies', 'Pedras de Kandumbo'],
    highlights: ['Lodge na natureza', '17 grutas', 'Golfe & ginásio', 'Impacto social'],
  },
]

export const namibeHub = {
  region: 'Namibe',
  title: 'Namibe',
  subtitle: 'Onde a praia encontra o mar e o deserto encontra o Atlântico',
  intro:
    'Namibe é um dos destinos mais extraordinários de Angola. Costa atlântica selvagem, dunas impressionantes e uma herança arquitetónica única — tudo a poucos minutos uns dos outros.',
  heroImage: images.heroNamibe,
  gallery: [images.heroNamibe, images.otchimba, images.heroNamibeDesert, images.casa2Exterior],
  highlights: [
    { title: 'Praias do Atlântico', desc: 'Águas frescas e areias douradas ao longo da costa namibiana.' },
    { title: 'Deserto costeiro', desc: 'O único deserto do mundo que mergulha directamente no oceano.' },
    { title: 'História viva', desc: 'Casas coloniais preservadas no coração da cidade.' },
    { title: 'Gastronomia & mar', desc: 'Peixe fresco, cocktails e sunsets na praia Otchimba.' },
  ],
  stays: [
    { name: 'Casa 2', type: 'Boutique Hotel', desc: '5 quartos numa casa histórica renovada.', link: '/casa-2', image: images.casa2Exterior },
    { name: 'Bara Bara', type: 'Guest House', desc: 'Privacidade total para famílias e grupos.', link: '/casa-2#bara-bara', image: images.baraBara },
    { name: 'Otchimba', type: 'Beach Bar', desc: 'Praia exclusiva a 7 minutos da cidade.', link: '/casa-2#otchimba', image: images.otchimba },
  ],
  accent: brandGuide.properties.casa2.accent,
}

export const huamboHub = {
  region: 'Huambo',
  title: 'Huambo',
  subtitle: 'Terras altas, natureza exuberante e experiências ao ar livre',
  intro:
    'Huambo oferece um Angola verde e acolhedor. Clima ameno, paisagens de serra e uma hospitalidade genuína — ideal para quem procura desconectar e reconectar com a natureza.',
  heroImage: images.heroHuambo,
  gallery: [images.heroHuambo, images.heroHuamboGreen, images.kandumbo, images.sunset],
  highlights: [
    { title: 'Paisagens verdes', desc: 'Serras, vales e hortas com produtos frescos da terra.' },
    { title: 'Pedras de Kandumbo', desc: '17 grutas naturais num sítio de beleza única.' },
    { title: 'Lodge completo', desc: 'Golfe, ginásio, sala de jogos e fogueira ao pôr do sol.' },
    { title: 'Turismo responsável', desc: 'Projecto com impacto social na comunidade de Kandumbo.' },
  ],
  stays: [
    { name: 'A Residencies', type: 'Lodge & Pousada', desc: 'Quartos espaçosos imersos na natureza.', link: '/a-residencies', image: images.residenciesLodge },
    { name: 'Pedras de Kandumbo', type: 'Ponto Turístico', desc: 'Formações rochosas e grutas exploráveis.', link: '/experiencias#kandumbo', image: images.kandumbo },
  ],
  accent: brandGuide.properties.residencies.accent,
}

export const tourismHighlights = [
  { label: 'Destinos', value: '2', desc: 'Namibe & Huambo' },
  { label: 'Propriedades', value: '5+', desc: 'Hotéis, lodges & praias' },
  { label: 'Experiências', value: '10+', desc: 'Natureza, cultura & mar' },
  { label: 'Regiões', value: 'Sul & Centro', desc: 'Angola autêntica' },
]

export const casa2Content = {
  region: 'Namibe',
  eyebrow: 'Boutique Hotel & Experiências',
  title: 'Casa 2',
  intro:
    'Um boutique hotel confortável e intimista, instalado numa casa histórica cuidadosamente renovada sem alterar a sua arquitetura original. Cinco quartos para uma experiência reservada e personalizada no coração da cidade.',
  properties: [
    {
      id: 'casa2-hotel',
      name: 'Casa 2',
      type: 'Boutique Hotel',
      description:
        'Ambiente acolhedor, elegante e tranquilo. Apenas cinco quartos para hóspedes que procuram descanso, privacidade e conforto.',
      image: images.casa2Exterior,
      features: [
        'Pequeno-almoço incluído',
        'Internet',
        'Lavandaria (serviço adicional)',
        'Pátio externo',
        'Área segura e confortável',
        'Televisão no espaço externo comum',
      ],
      rooms: [
        { name: 'Quarto de Casal', price: '35.000 KZ', unit: '/ diária' },
        { name: 'Quarto de Solteiro', price: '31.500 KZ', unit: '/ diária' },
      ],
    },
    {
      id: 'bara-bara',
      name: 'Bara Bara',
      type: 'Guest House',
      description:
        'Bara Bara by Casa 2 — guest house privada e confortável, ideal para famílias, grupos pequenos ou hóspedes que procuram maior privacidade.',
      image: images.baraBara,
      features: [
        '2 quartos',
        'Sala de estar e jantar',
        'Cozinha equipada',
        'Pátio interno',
        'Pequeno-almoço incluído',
      ],
      rooms: [
        { name: 'Casa completa', price: '60.000 KZ', unit: '/ diária' },
      ],
    },
    {
      id: 'otchimba',
      name: 'Otchimba',
      type: 'Beach Bar & Praia',
      description:
        'Espaço de praia a sete minutos da cidade. Tranquilidade, conforto e experiência reservada à beira-mar.',
      image: images.otchimba,
      features: [
        'Sombrinhas e cadeiras de praia',
        'Serviço de bar, snacks e cocktails',
        'Acesso gratuito para hóspedes Casa 2',
        'Ambiente tranquilo e seguro',
      ],
      rooms: [],
      note: 'Hóspedes da Casa 2 têm acesso gratuito às cadeiras e sombrinhas — paga-se apenas o consumo no bar.',
    },
  ],
}

export const residenciesContent = {
  region: 'Huambo',
  eyebrow: 'Lodge & Nature Experience',
  title: 'A Residencies',
  intro:
    'Uma pousada inserida num ambiente natural, pensada para hóspedes que procuram descanso, conforto e conexão com a natureza. Quartos espaçosos numa experiência acolhedora e tranquila.',
  features: [
    { title: 'Pequeno-almoço incluído', icon: 'coffee' },
    { title: 'Mini campo de golfe', icon: 'flag' },
    { title: 'Sala de jogos', icon: 'gamepad' },
    { title: 'Ginásio', icon: 'dumbbell' },
    { title: 'Horta própria', icon: 'leaf' },
    { title: 'Fogueira ao pôr do sol', icon: 'flame' },
  ],
  pricing: [{ name: 'Suite de Casal', price: '40.000 KZ', unit: '/ diária' }],
  gallery: [images.residenciesLodge, images.residenciesNature, images.sunset],
}

export const experiencesContent = {
  eyebrow: 'Descubra Angola',
  title: 'Pontos Turísticos & Experiências',
  intro:
    'A AMAVI gere espaços naturais e experiências autênticas que revelam a beleza e a cultura de Huambo e Namibe.',
  experiences: [
    {
      id: 'kandumbo',
      name: 'Pedras de Kandumbo',
      region: 'Huambo',
      description:
        'Formações rochosas naturais com 17 grutas descobertas e integradas na experiência turística. Um projeto com forte impacto social na comunidade local de Kandumbo.',
      image: images.kandumbo,
      price: '3.000 KZ',
      unit: '/ pessoa',
      managed: ['Gestão do espaço', 'Organização', 'Limpeza', 'Segurança', 'Experiência dos visitantes'],
      accent: brandGuide.properties.residencies.accent,
    },
    {
      id: 'otchimba-exp',
      name: 'Otchimba Beach Bar',
      region: 'Namibe',
      description:
        'Praia exclusiva com bar, cocktails frescos e ambiente reservado. A experiência perfeita entre o deserto e o mar.',
      image: images.otchimba,
      price: 'Sob consumo',
      unit: '',
      managed: ['Sombrinhas', 'Cadeiras de praia', 'Bar & snacks'],
      accent: brandGuide.properties.casa2.accent,
    },
    {
      id: 'sunset-huambo',
      name: 'Fogueira ao Pôr do Sol',
      region: 'Huambo',
      description:
        'Área de fogueira com vista panorâmica no A Residencies. Produtos frescos da horta própria na cozinha.',
      image: images.sunset,
      price: 'Incluído',
      unit: 'na estadia',
      managed: ['Experiência gastronómica', 'Ambiente natural'],
      accent: brandGuide.properties.residencies.accentLight,
    },
  ],
}

export const sobreContent = {
  title: 'Sobre a AMAVI',
  subtitle: 'Turismo e hospitalidade com alma angolana',
  intro:
    'A AMAVI é uma empresa angolana focada no ramo do turismo e hotelaria, dedicada à criação de experiências memoráveis para os seus hóspedes.',
  values: [
    {
      title: 'Conforto & Qualidade',
      text: 'O nosso foco está no conforto, na qualidade dos nossos espaços e no cuidado com o atendimento.',
    },
    {
      title: 'Ambientes Acolhedores',
      text: 'Criamos ambientes tranquilos e conectados à essência de cada destino — Namibe e Huambo.',
    },
    {
      title: 'Experiência Completa',
      text: 'A experiência de um hóspede vai muito além de um lugar para dormir. Está no cuidado, nos detalhes e na forma como cada pessoa se sente.',
    },
  ],
  director: 'Rayza Fortes — Diretora-Geral',
}

export const guiaTuristicoContent = {
  title: 'Guia Turístico',
  subtitle: 'Tudo o que precisa saber para visitar Namibe e Huambo',
  intro:
    'Planeie a sua viagem com informações práticas sobre os nossos destinos, alojamentos, experiências e dicas locais.',
  regions: [
    {
      name: 'Namibe',
      accent: brandGuide.properties.casa2.accent,
      tips: [
        { title: 'Melhor época', text: 'Maio a Outubro — clima seco e temperaturas amenas à beira-mar.' },
        { title: 'O que levar', text: 'Protetor solar, chapéu, roupa leve e calçado confortável para praia e cidade.' },
        { title: 'Como chegar', text: 'Aeroporto de Namibe (MSZ). Transfer disponível mediante reserva.' },
        { title: 'Não perca', text: 'Praia Otchimba, deserto costeiro, centro histórico e Casa 2.' },
      ],
      stays: ['Casa 2 — Boutique Hotel', 'Bara Bara — Guest House', 'Otchimba Beach Bar'],
      link: '/namibe',
    },
    {
      name: 'Huambo',
      accent: brandGuide.properties.residencies.accent,
      tips: [
        { title: 'Melhor época', text: 'Abril a Setembro — estação seca com dias claros e noites frescas.' },
        { title: 'O que levar', text: 'Casaco leve para a noite, calçado para caminhadas e repelente.' },
        { title: 'Como chegar', text: 'Aeroporto de Huambo (NOV). Contacte-nos para organização de transfer.' },
        { title: 'Não perca', text: 'Pedras de Kandumbo, A Residencies e fogueira ao pôr do sol.' },
      ],
      stays: ['A Residencies — Lodge', 'Pedras de Kandumbo — Ponto turístico'],
      link: '/huambo',
    },
  ],
  faqs: [
    {
      q: 'Como faço uma reserva?',
      a: 'Use o formulário de reservas no website ou contacte-nos via WhatsApp ou email.',
    },
    {
      q: 'O pequeno-almoço está incluído?',
      a: 'Sim, em todas as propriedades AMAVI o pequeno-almoço está incluído na diária.',
    },
    {
      q: 'Os hóspedes da Casa 2 têm acesso à praia Otchimba?',
      a: 'Sim, acesso gratuito às cadeiras e sombrinhas. Paga-se apenas o consumo no bar.',
    },
    {
      q: 'Posso visitar as Pedras de Kandumbo sem ficar alojado?',
      a: 'Sim, visitas a 3.000 KZ por pessoa. A AMAVI gere todo o espaço e a experiência.',
    },
  ],
}
