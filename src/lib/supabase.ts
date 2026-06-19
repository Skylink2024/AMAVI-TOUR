import { createClient } from "@supabase/supabase-js";

const DEFAULT_SUPABASE_PROJECT_REF = "csehfqhxcfbylosowlrp";
const DEFAULT_SUPABASE_URL = `https://${DEFAULT_SUPABASE_PROJECT_REF}.supabase.co`;
const DEFAULT_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzZWhmcWh4Y2ZieWxvc293bHJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1NDQ0MzksImV4cCI6MjA5NDEyMDQzOX0.He5zKwpjAVMrOo7o4i8OoE0KxTS-JeOzirqSdxAtQp0";

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL).replace(
  /\/+$/,
  "",
);
const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  DEFAULT_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export function getSupabaseConnectionErrorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);

  if (/failed to fetch|networkerror|err_name_not_resolved/i.test(message)) {
    return `Cannot reach Supabase at ${SUPABASE_URL}. Check that VITE_SUPABASE_URL uses your real Supabase Project URL and that VITE_SUPABASE_PUBLISHABLE_KEY comes from the same project.`;
  }

  return "Invalid email or password";
}

// Storage bucket names
export const STORAGE_BUCKETS = {
  HERO_IMAGES: "hero-images",
  ABOUT_IMAGES: "about-images",
  GALLERY: "gallery-images",
  VIDEOS: "videos",
  COURSE_IMAGES: "course-images",
  EVENT_IMAGES: "event-images",
  HOTEL_IMAGES: "hotel-images",
  DANCE_IMAGES: "dance-images",
  MATERIAL_IMAGES: "material-images",
  TEAM_IMAGES: "team-images",
  GUEST_IMAGES: "guest-images",
};

/** Stable extension for storage paths (jpg, png, webp, …). */
export function fileExtensionForUpload(file: File): string {
  const fromName = file.name.split(".").pop()?.toLowerCase();
  if (
    fromName &&
    fromName.length <= 5 &&
    /^[a-z0-9]+$/.test(fromName) &&
    fromName !== file.name.toLowerCase()
  ) {
    return fromName;
  }
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  if (file.type === "image/gif") return "gif";
  if (file.type === "image/jpeg" || file.type === "image/jpg") return "jpg";
  return "jpg";
}

// Helper to upload files
export async function uploadFile(bucket: string, path: string, file: File): Promise<string> {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
    upsert: true,
  });

  if (error) throw error;

  const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(data.path);

  return publicUrl.publicUrl;
}

// Helper to delete files
export async function deleteFile(bucket: string, path: string): Promise<void> {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw error;
}

// Helper to get public URL
export function getPublicUrl(bucket: string, path: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}