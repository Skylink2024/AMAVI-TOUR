// Types for content management
export interface HeroSection {
  id: string;
  /** Small uppercase line above the title (e.g. Culture · Identity · Legacy) */
  eyebrow: string;
  title: string;
  subtitle: string;
  image_url: string;
  cta_text: string;
  cta_link: string;
  created_at: string;
  updated_at: string;
}

export interface Dance {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image_url: string;
  price: number;
  capacity: number;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image_url: string;
  price: number;
  duration_weeks: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  video_url?: string;
  type: 'image' | 'video';
  created_at: string;
  updated_at: string;
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  address: string;
  price_per_night: number;
  image_url: string;
  link: string;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image_url: string;
  bio: string;
  created_at: string;
  updated_at: string;
}

export interface About {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface AboutTeamMember {
  id: string;
  name: string;
  role: string;
  image_url: string;
  bio: string;
  about_section?: string;
  created_at: string;
  updated_at: string;
}

export interface Material {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  link: string;
  created_at: string;
  updated_at: string;
}

export interface Guest {
  id: string;
  name: string;
  role: string;
  image_url: string;
  initials: string;
  created_at: string;
  updated_at: string;
}
