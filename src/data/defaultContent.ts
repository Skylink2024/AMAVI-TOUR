import heroImg from "../assets/hero-mr-angola.png";
import kizomba from "../assets/dance-kizomba.jpg";
import samba from "../assets/dance-samba.jpg";
import tarraxinha from "../assets/dance-tarraxinha.jpg";
import semba from "../assets/dance-semba.jpg";
import eventNight from "../assets/event-night.jpg";
import eventClass from "../assets/event-class.jpg";
import eventFestival from "../assets/event-festival.jpg";
import teamImg from "../assets/team-mrangola.png";
import type {
  Course,
  Dance,
  Event,
  GalleryItem,
  HeroSection,
  Hotel,
  TeamMember,
} from "../types/content";

const now = new Date().toISOString();

type ContentTimestamps = "created_at" | "updated_at";
export type SeedHeroSection = Omit<HeroSection, "id" | ContentTimestamps>;
export type SeedDance = Omit<Dance, "id" | ContentTimestamps>;
export type SeedEvent = Omit<Event, "id" | ContentTimestamps>;
export type SeedCourse = Omit<Course, "id" | ContentTimestamps>;
export type SeedGalleryItem = Omit<GalleryItem, "id" | ContentTimestamps>;
export type SeedHotel = Omit<Hotel, "id" | ContentTimestamps>;
export type SeedTeamMember = Omit<TeamMember, "id" | ContentTimestamps>;

function withAdminFields<T extends object>(
  item: T,
  id: string,
): T & { id: string; created_at: string; updated_at: string } {
  return { ...item, id, created_at: now, updated_at: now };
}

export const defaultHeroSection: SeedHeroSection = {
  eyebrow: "Culture · Identity · Legacy",
  title: "MR ANGOLA",
  subtitle:
    "Representing Angola beyond borders. Sharing our story. Elevating our people through rhythm, movement and soul.",
  image_url: heroImg,
  cta_text: "Discover the story",
  cta_link: "#events",
};

export const defaultDances: SeedDance[] = [
  {
    name: "Kizomba",
    description: "The romantic heartbeat of Angola — slow, intimate, soulful.",
    image_url: kizomba,
    price: 149,
  },
  {
    name: "Semba",
    description: "The joyful father of samba. Celebration in every step.",
    image_url: semba,
    price: 229,
  },
  {
    name: "Tarraxinha",
    description: "Sensual, grounded, hypnotic. The art of subtle motion.",
    image_url: tarraxinha,
    price: 189,
  },
  {
    name: "Samba",
    description: "Vibrant tradition carried across continents.",
    image_url: samba,
    price: 149,
  },
];

export const defaultEvents: SeedEvent[] = [
  {
    title: "Kizomba Night NYC",
    description: "A night of Kizomba, Semba, connection, and live Angolan rhythm in New York.",
    date: "2026-06-14",
    time: "20:00",
    location: "New York, NY",
    image_url: eventNight,
    price: 45,
    capacity: 150,
  },
  {
    title: "Angola Festival Miami",
    description: "Celebrate Angolan music, food, dance, and community in Miami.",
    date: "2026-07-22",
    time: "18:00",
    location: "Miami, FL",
    image_url: eventFestival,
    price: 75,
    capacity: 200,
  },
  {
    title: "Semba Masterclass LA",
    description: "Learn Semba technique, musicality, and culture directly from Mr Angola.",
    date: "2026-08-09",
    time: "14:00",
    location: "Los Angeles, CA",
    image_url: eventClass,
    price: 55,
    capacity: 100,
  },
  {
    title: "Tarraxinha Night ATL",
    description: "An intimate Tarraxinha social and workshop for dancers in Atlanta.",
    date: "2026-09-12",
    time: "21:00",
    location: "Atlanta, GA",
    image_url: eventNight,
    price: 50,
    capacity: 120,
  },
  {
    title: "Angola Independence Day",
    description: "Honor Angola Independence Day with music, dance, fashion, and culture.",
    date: "2026-11-11",
    time: "19:00",
    location: "Washington, DC",
    image_url: eventFestival,
    price: 65,
    capacity: 180,
  },
  {
    title: "New Year Gala",
    description:
      "A luxury New Year celebration with Angolan dance, dinner, and live entertainment.",
    date: "2026-12-31",
    time: "22:00",
    location: "Las Vegas, NV",
    image_url: eventClass,
    price: 120,
    capacity: 250,
  },
];

export const defaultCourses: SeedCourse[] = [
  {
    title: "Kizomba Foundation",
    description: "Master the fundamentals of Kizomba, the sensual partner dance from Angola.",
    image_url: kizomba,
    price: 149,
    duration_weeks: 4,
    level: "beginner",
  },
  {
    title: "Semba Mastery",
    description:
      "Deepen your understanding of Semba with advanced techniques and cultural insights.",
    image_url: semba,
    price: 229,
    duration_weeks: 6,
    level: "intermediate",
  },
  {
    title: "Tarraxinha Intensive",
    description: "Intensive program for experienced dancers looking to master Tarraxinha.",
    image_url: tarraxinha,
    price: 189,
    duration_weeks: 3,
    level: "advanced",
  },
  {
    title: "Samba Foundation",
    description: "Explore the energy and joy of Samba with this inclusive course.",
    image_url: samba,
    price: 149,
    duration_weeks: 4,
    level: "beginner",
  },
];

export const defaultGalleryItems: SeedGalleryItem[] = [
  { title: "Festival Highlights 2025", image_url: eventFestival, video_url: "", type: "video" },
  { title: "Semba Night", image_url: semba, video_url: "", type: "image" },
  { title: "Backstage Class", image_url: eventClass, video_url: "", type: "video" },
  { title: "Carnaval Energy", image_url: samba, video_url: "", type: "image" },
  { title: "Intimate Sessions", image_url: tarraxinha, video_url: "", type: "image" },
  { title: "Lisbon Tour", image_url: eventNight, video_url: "", type: "video" },
];

export const defaultHotels: SeedHotel[] = [
  {
    name: "The Standard High Line",
    description: "Experience luxury overlooking Manhattan's High Line park.",
    address: "New York, NY",
    price_per_night: 320,
    image_url: eventFestival,
    link: "https://www.standardhotels.com/new-york/properties/high-line",
  },
  {
    name: "Fontainebleau Miami Beach",
    description: "Iconic beachfront luxury resort with world-class amenities.",
    address: "Miami, FL",
    price_per_night: 280,
    image_url: eventNight,
    link: "https://www.fontainebleau.com/miami-beach/",
  },
  {
    name: "The Hollywood Roosevelt",
    description: "Historic Hollywood glamour meets modern comfort.",
    address: "Los Angeles, CA",
    price_per_night: 240,
    image_url: eventClass,
    link: "https://www.thehollywoodroosevelt.com/",
  },
];

export const defaultTeamMembers: SeedTeamMember[] = [
  {
    name: "Mr Angola",
    role: "Founder & Lead Instructor",
    image_url: teamImg,
    bio: "Founder of Angola Rhythms Live and lead instructor sharing Angolan culture worldwide.",
  },
  {
    name: "Sofia M.",
    role: "Choreographer",
    image_url: teamImg,
    bio: "Choreographer creating stage-ready movement for classes, shows, and festivals.",
  },
  {
    name: "Carlos D.",
    role: "Event Director",
    image_url: teamImg,
    bio: "Event director coordinating live experiences, workshops, and cultural nights.",
  },
  {
    name: "Joana L.",
    role: "Brand & Culture",
    image_url: teamImg,
    bio: "Brand and culture lead helping tell Angola's story with care and style.",
  },
];

export const fallbackHeroSection = withAdminFields(defaultHeroSection, "default-hero");
export const fallbackDances = defaultDances.map((dance, index) =>
  withAdminFields(dance, `default-dance-${index + 1}`),
);
export const fallbackEvents = defaultEvents.map((event, index) =>
  withAdminFields(event, `default-event-${index + 1}`),
);
export const fallbackCourses = defaultCourses.map((course, index) =>
  withAdminFields(course, `default-course-${index + 1}`),
);
export const fallbackGalleryItems = defaultGalleryItems.map((item, index) =>
  withAdminFields(item, `default-gallery-${index + 1}`),
);
export const fallbackHotels = defaultHotels.map((hotel, index) =>
  withAdminFields(hotel, `default-hotel-${index + 1}`),
);
export const fallbackTeamMembers = defaultTeamMembers.map((member, index) =>
  withAdminFields(member, `default-team-${index + 1}`),
);