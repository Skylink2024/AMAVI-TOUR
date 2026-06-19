import type {
  About,
  Course,
  Dance,
  Event,
  GalleryItem,
  Guest,
  HeroSection,
  Hotel,
  Material,
  TeamMember,
} from '../types/content'
import { aboutAmavi, images, contact } from './amaviContent'

const now = new Date().toISOString()

function withId<T extends object>(item: T, id: string): T & { id: string; created_at: string; updated_at: string } {
  return { ...item, id, created_at: now, updated_at: now }
}

export const amaviSeedHero = {
  eyebrow: aboutAmavi.eyebrow,
  title: aboutAmavi.title,
  subtitle: aboutAmavi.subtitle,
  image_url: images.heroMain,
  cta_text: 'Reservar',
  cta_link: '/reservar',
}

export const amaviFallbackHero = withId(amaviSeedHero, 'default-hero') as HeroSection

export const amaviFallbackDances: Dance[] = [
  withId(
    {
      name: 'Namibe — Deserto & Mar',
      description: 'Paisagens únicas onde as dunas encontram o Atlântico.',
      image_url: images.heroNamibe,
      price: 0,
    },
    'default-dance-1',
  ),
  withId(
    {
      name: 'Huambo — Terras Altas',
      description: 'Natureza, clima ameno e hospitalidade no coração de Angola.',
      image_url: images.heroHuambo,
      price: 0,
    },
    'default-dance-2',
  ),
  withId(
    {
      name: 'Pedras de Kandumbo',
      description: 'Formações rochosas e património natural de Huambo.',
      image_url: images.kandumbo,
      price: 3000,
    },
    'default-dance-3',
  ),
] as Dance[]

export const amaviFallbackEvents: Event[] = [
  withId(
    {
      title: 'Praia Otchimba',
      description: 'Experiência de praia em Namibe, sob consumo.',
      date: '2026-01-01',
      time: '10:00',
      location: 'Namibe',
      image_url: images.otchimba,
      price: 0,
      capacity: 50,
    },
    'default-event-1',
  ),
  withId(
    {
      title: 'Tour Pedras de Kandumbo',
      description: 'Visita guiada às formações rochosas — 3.000 KZ/pessoa.',
      date: '2026-01-01',
      time: '09:00',
      location: 'Huambo',
      image_url: images.kandumbo,
      price: 3000,
      capacity: 30,
    },
    'default-event-2',
  ),
] as Event[]

export const amaviFallbackCourses: Course[] = [
  withId(
    {
      title: 'Pacote Namibe — Fim de Semana',
      description: 'Casa 2 + experiências na costa e no deserto.',
      image_url: images.casa2Exterior,
      price: 35000,
      duration_weeks: 1,
      level: 'beginner' as const,
    },
    'default-course-1',
  ),
  withId(
    {
      title: 'Pacote Huambo — Natureza',
      description: 'A Residencies + Pedras de Kandumbo.',
      image_url: images.residenciesLodge,
      price: 40000,
      duration_weeks: 1,
      level: 'beginner' as const,
    },
    'default-course-2',
  ),
] as Course[]

export const amaviFallbackGallery: GalleryItem[] = [
  withId(
    {
      title: 'Namibe — Costa',
      image_url: images.heroNamibe,
      type: 'image' as const,
    },
    'default-gallery-1',
  ),
  withId(
    {
      title: 'Casa 2',
      image_url: images.casa2Room,
      type: 'image' as const,
    },
    'default-gallery-2',
  ),
  withId(
    {
      title: 'A Residencies',
      image_url: images.residenciesNature,
      type: 'image' as const,
    },
    'default-gallery-3',
  ),
] as GalleryItem[]

export const amaviFallbackHotels: Hotel[] = [
  withId(
    {
      name: 'Casa 2 — Quarto Casal',
      description: 'Alojamento em Namibe. 35.000 KZ/noite.',
      address: 'Namibe, Angola',
      price_per_night: 35000,
      image_url: images.casa2Room,
      link: '/casa-2',
    },
    'default-hotel-1',
  ),
  withId(
    {
      name: 'Bara Bara — Guest House',
      description: 'Guest house em Namibe. 60.000 KZ/noite.',
      address: 'Namibe, Angola',
      price_per_night: 60000,
      image_url: images.baraBara,
      link: '/namibe',
    },
    'default-hotel-2',
  ),
  withId(
    {
      name: 'A Residencies — Suite Casal',
      description: 'Suite em Huambo. 40.000 KZ/noite.',
      address: 'Huambo, Angola',
      price_per_night: 40000,
      image_url: images.residenciesLodge,
      link: '/a-residencies',
    },
    'default-hotel-3',
  ),
] as Hotel[]

export const amaviFallbackTeam: TeamMember[] = [
  withId(
    {
      name: 'Rayza Fortes',
      role: 'Diretora-Geral',
      image_url: images.brandIdentity,
      bio: 'Liderança da AMAVI em turismo e hospitalidade em Angola.',
    },
    'default-team-1',
  ),
] as TeamMember[]

export const amaviFallbackAbout: About = withId(
  {
    title: 'AMAVI — Turismo & Hospitalidade',
    description: `${aboutAmavi.description}\n\nContacto: ${contact.phone} · ${contact.email}`,
    image_url: images.brandIdentity,
  },
  'about-1',
) as About

export const amaviFallbackMaterials: Material[] = []
export const amaviFallbackGuests: Guest[] = []
