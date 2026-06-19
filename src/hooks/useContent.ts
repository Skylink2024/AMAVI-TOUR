import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  supabase,
  uploadFile,
  STORAGE_BUCKETS,
  fileExtensionForUpload,
} from "../lib/supabase";
import { withTimeout } from "../lib/adminConfig";
import {
  HeroSection,
  Dance,
  Event,
  Course,
  GalleryItem,
  Hotel,
  TeamMember,
  About,
  Material,
  Guest,
} from "../types/content";
import {
  defaultCourses,
  defaultDances,
  defaultEvents,
  defaultGalleryItems,
  defaultHeroSection,
  defaultHotels,
  defaultTeamMembers,
  fallbackHeroSection,
} from "../data/defaultContent";
import {
  amaviFallbackAbout,
  amaviFallbackCourses,
  amaviFallbackDances,
  amaviFallbackEvents,
  amaviFallbackGallery,
  amaviFallbackGuests,
  amaviFallbackHero,
  amaviFallbackHotels,
  amaviFallbackMaterials,
  amaviFallbackTeam,
  amaviSeedHero,
  amaviFallbackDances as amaviSeedDances,
  amaviFallbackEvents as amaviSeedEvents,
  amaviFallbackCourses as amaviSeedCourses,
  amaviFallbackGallery as amaviSeedGallery,
  amaviFallbackHotels as amaviSeedHotels,
  amaviFallbackTeam as amaviSeedTeam,
} from "../data/amaviSeedContent";

async function safeFetchList<T>(
  query: () => Promise<{ data: T[] | null; error: unknown }>,
  fallback: T[],
): Promise<T[]> {
  try {
    const { data, error } = await withTimeout(query(), 3500);
    if (error) throw error;
    const list = data ?? [];
    return list.length > 0 ? list : fallback;
  } catch (err) {
    console.warn("[AMAVI] A usar conteúdo local:", err);
    return fallback;
  }
}

async function safeFetchOne<T>(
  query: () => Promise<{ data: T | null; error: unknown }>,
  fallback: T,
  merge?: (row: T) => T,
): Promise<T> {
  try {
    const { data, error } = await withTimeout(query(), 3500);
    if (error) throw error;
    if (!data) return fallback;
    return merge ? merge(data) : data;
  } catch (err) {
    console.warn("[AMAVI] A usar conteúdo local:", err);
    return fallback;
  }
}

const FALLBACK_ID_PREFIX = "default-";
const CONTENT_QUERY_KEYS = [
  "heroSection",
  "about",
  "dances",
  "events",
  "courses",
  "gallery",
  "hotels",
  "teamMembers",
  "materials",
];

function isFallbackId(id?: string) {
  return !id || id.startsWith(FALLBACK_ID_PREFIX);
}

function removeAdminFields<T extends { id?: string; created_at?: string; updated_at?: string }>(
  item: T,
) {
  const { id: _id, created_at: _createdAt, updated_at: _updatedAt, ...content } = item;
  return content;
}

async function seedTableIfEmpty<T extends object>(table: string, rows: T[]) {
  const { count, error: countError } = await supabase
    .from(table)
    .select("id", { count: "exact", head: true });

  if (countError) {
    throw countError;
  }

  if ((count ?? 0) > 0 || rows.length === 0) return;

  const { error } = await supabase.from(table).insert(rows);
  if (error) {
    throw error;
  }
}

async function saveRow<T extends { id?: string; created_at?: string; updated_at?: string }>(
  table: string,
  row: T,
) {
  const content = removeAdminFields(row);

  if (isFallbackId(row.id)) {
    const { data, error } = await supabase
      .from(table)
      .insert([content as never])
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  const { data, error } = await supabase
    .from(table)
    .update(content as never)
    .eq("id", row.id)
    .select()
    .single();

  if (error) throw error;
  if (!data) throw new Error(`No ${table} row was updated. Please refresh the admin dashboard.`);
  return data;
}

async function saveHeroSection(section: Partial<HeroSection>) {
  const content = removeAdminFields(section);

  if (!isFallbackId(section.id)) {
    const { data, error } = await supabase
      .from("hero_sections")
      .update(content as never)
      .eq("id", section.id)
      .select()
      .single();

    if (error) throw error;
    if (data) return data;
  }

  const { data: existingHero, error: findError } = await supabase
    .from("hero_sections")
    .select("id")
    .limit(1)
    .maybeSingle();

  if (findError) throw findError;

  if (existingHero?.id) {
    const { data, error } = await supabase
      .from("hero_sections")
      .update(content as never)
      .eq("id", existingHero.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  const { data, error } = await supabase
    .from("hero_sections")
    .insert([content as never])
    .select()
    .single();
  if (error) throw error;
  return data;
}

function invalidateContentQueries(queryClient: ReturnType<typeof useQueryClient>) {
  CONTENT_QUERY_KEYS.forEach((queryKey) => queryClient.invalidateQueries({ queryKey: [queryKey] }));
}

export function useSeedDefaultContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const strip = <T extends { id?: string; created_at?: string; updated_at?: string }>(rows: T[]) =>
        rows.map((r) => {
          const { id: _i, created_at: _c, updated_at: _u, ...rest } = r;
          return rest;
        });

      await seedTableIfEmpty("hero_sections", [amaviSeedHero]);
      await seedTableIfEmpty("dances", strip(amaviSeedDances));
      await seedTableIfEmpty("events", strip(amaviSeedEvents));
      await seedTableIfEmpty("courses", strip(amaviSeedCourses));
      await seedTableIfEmpty("gallery_items", strip(amaviSeedGallery));
      await seedTableIfEmpty("hotels", strip(amaviSeedHotels));
      await seedTableIfEmpty("team_members", strip(amaviSeedTeam));
    },
    onSuccess: () => {
      invalidateContentQueries(queryClient);
    },
  });
}

// Hero Section
export function useHeroSection() {
  return useQuery({
    queryKey: ["heroSection"],
    queryFn: async () => {
      return safeFetchOne(
        () => supabase.from("hero_sections").select("*").maybeSingle(),
        amaviFallbackHero,
        (row) => {
          const base = amaviFallbackHero;
          const partial = row as Partial<HeroSection>;
          return {
            ...base,
            ...partial,
            eyebrow: partial.eyebrow?.trim() ? partial.eyebrow : base.eyebrow,
          } as HeroSection;
        },
      );
    },
  });
}

export function useUpdateHeroSection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (section: Partial<HeroSection>) => saveHeroSection(section),
    onSuccess: () => {
      invalidateContentQueries(queryClient);
    },
  });
}

export function useUploadHeroImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (file: File) => {
      const ext = fileExtensionForUpload(file);
      const path = `hero-${Date.now()}.${ext}`;
      const url = await uploadFile(STORAGE_BUCKETS.HERO_IMAGES, path, file);
      await saveHeroSection({ image_url: url });
      return url;
    },
    onSuccess: () => {
      invalidateContentQueries(queryClient);
    },
  });
}

// Dances
export function useDances() {
  return useQuery({
    queryKey: ["dances"],
    queryFn: async () =>
      safeFetchList(
        () =>
          supabase
            .from("dances")
            .select("*")
            .order("created_at", { ascending: false }) as Promise<{
            data: Dance[] | null;
            error: unknown;
          }>,
        amaviFallbackDances,
      ),
  });
}

export function useCreateDance() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dance: Omit<Dance, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase.from("dances").insert([dance]).select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      invalidateContentQueries(queryClient);
    },
  });
}

export function useUpdateDance() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dance: Partial<Dance>) => {
      return saveRow("dances", dance);
    },
    onSuccess: () => {
      invalidateContentQueries(queryClient);
    },
  });
}

export function useDeleteDance() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("dances").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      invalidateContentQueries(queryClient);
    },
  });
}

export function useUploadDanceImage() {
  return useMutation({
    mutationFn: async (file: File) => {
      const ext = fileExtensionForUpload(file);
      return uploadFile(STORAGE_BUCKETS.DANCE_IMAGES, `dance-${Date.now()}.${ext}`, file);
    },
  });
}

// Events
export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () =>
      safeFetchList(
        () =>
          supabase
            .from("events")
            .select("*")
            .order("date", { ascending: false }) as Promise<{
            data: Event[] | null;
            error: unknown;
          }>,
        amaviFallbackEvents,
      ),
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (event: Omit<Event, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase.from("events").insert([event]).select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      invalidateContentQueries(queryClient);
    },
  });
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (event: Partial<Event>) => {
      return saveRow("events", event);
    },
    onSuccess: () => {
      invalidateContentQueries(queryClient);
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      invalidateContentQueries(queryClient);
    },
  });
}

export function useUploadEventImage() {
  return useMutation({
    mutationFn: async (file: File) => {
      const ext = fileExtensionForUpload(file);
      return uploadFile(STORAGE_BUCKETS.EVENT_IMAGES, `event-${Date.now()}.${ext}`, file);
    },
  });
}

// Courses
export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () =>
      safeFetchList(
        () =>
          supabase
            .from("courses")
            .select("*")
            .order("created_at", { ascending: false }) as Promise<{
            data: Course[] | null;
            error: unknown;
          }>,
        amaviFallbackCourses,
      ),
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (course: Omit<Course, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase.from("courses").insert([course]).select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      invalidateContentQueries(queryClient);
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (course: Partial<Course>) => {
      return saveRow("courses", course);
    },
    onSuccess: () => {
      invalidateContentQueries(queryClient);
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("courses").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      invalidateContentQueries(queryClient);
    },
  });
}

export function useUploadCourseImage() {
  return useMutation({
    mutationFn: async (file: File) => {
      const ext = fileExtensionForUpload(file);
      return uploadFile(STORAGE_BUCKETS.COURSE_IMAGES, `course-${Date.now()}.${ext}`, file);
    },
  });
}

// Gallery
export function useGallery() {
  return useQuery({
    queryKey: ["gallery"],
    queryFn: async () =>
      safeFetchList(
        () =>
          supabase
            .from("gallery_items")
            .select("*")
            .order("created_at", { ascending: false }) as Promise<{
            data: GalleryItem[] | null;
            error: unknown;
          }>,
        amaviFallbackGallery,
      ),
  });
}

export function useCreateGalleryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (item: Omit<GalleryItem, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase.from("gallery_items").insert([item]).select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      invalidateContentQueries(queryClient);
    },
  });
}

export function useDeleteGalleryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("gallery_items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      invalidateContentQueries(queryClient);
    },
  });
}

export function useUploadGalleryImage() {
  return useMutation({
    mutationFn: async (file: File) => {
      const ext = fileExtensionForUpload(file);
      const path = `gallery-image-${Date.now()}.${ext}`;
      const url = await uploadFile(STORAGE_BUCKETS.GALLERY, path, file);
      return url;
    },
  });
}

export function useUploadGalleryVideo() {
  return useMutation({
    mutationFn: async (file: File) => {
      const ext = file.name.split(".").pop()?.toLowerCase() || "mp4";
      const path = `gallery-video-${Date.now()}.${ext}`;
      const url = await uploadFile(STORAGE_BUCKETS.VIDEOS, path, file);
      return url;
    },
  });
}

// Hotels
export function useHotels() {
  return useQuery({
    queryKey: ["hotels"],
    queryFn: async () =>
      safeFetchList(
        () =>
          supabase
            .from("hotels")
            .select("*")
            .order("created_at", { ascending: false }) as Promise<{
            data: Hotel[] | null;
            error: unknown;
          }>,
        amaviFallbackHotels,
      ),
  });
}

export function useCreateHotel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (hotel: Omit<Hotel, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase.from("hotels").insert([hotel]).select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      invalidateContentQueries(queryClient);
    },
  });
}

export function useUpdateHotel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (hotel: Partial<Hotel>) => {
      return saveRow("hotels", hotel);
    },
    onSuccess: () => {
      invalidateContentQueries(queryClient);
    },
  });
}

export function useDeleteHotel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("hotels").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      invalidateContentQueries(queryClient);
    },
  });
}

export function useUploadHotelImage() {
  return useMutation({
    mutationFn: async (file: File) => {
      const ext = fileExtensionForUpload(file);
      return uploadFile(STORAGE_BUCKETS.HOTEL_IMAGES, `hotel-${Date.now()}.${ext}`, file);
    },
  });
}

// Team Members
export function useTeamMembers() {
  return useQuery({
    queryKey: ["teamMembers"],
    queryFn: async () =>
      safeFetchList(
        () =>
          supabase
            .from("team_members")
            .select("*")
            .order("created_at", { ascending: false }) as Promise<{
            data: TeamMember[] | null;
            error: unknown;
          }>,
        amaviFallbackTeam,
      ),
  });
}

export function useCreateTeamMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (member: Omit<TeamMember, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase.from("team_members").insert([member]).select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      invalidateContentQueries(queryClient);
    },
  });
}

export function useDeleteTeamMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("team_members").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      invalidateContentQueries(queryClient);
    },
  });
}

export function useUpdateTeamMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (member: Partial<TeamMember>) => {
      return saveRow("team_members", member);
    },
    onSuccess: () => {
      invalidateContentQueries(queryClient);
    },
  });
}

export function useUploadTeamMemberImage() {
  return useMutation({
    mutationFn: async (file: File) => {
      const ext = fileExtensionForUpload(file);
      return uploadFile(STORAGE_BUCKETS.TEAM_IMAGES, `team-${Date.now()}.${ext}`, file);
    },
  });
}

// About Section
export function useAbout() {
  return useQuery({
    queryKey: ["about"],
    queryFn: async () =>
      safeFetchOne(
        () => supabase.from("about").select("*").maybeSingle(),
        amaviFallbackAbout,
      ),
  });
}

export function useUpdateAbout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (about: About) => {
      const content = removeAdminFields(about);
      const { data, error } = await supabase
        .from("about")
        .upsert([{ ...content, id: about.id || "about-1" } as never])
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      invalidateContentQueries(queryClient);
    },
  });
}

export function useUploadAboutImage() {
  return useMutation({
    mutationFn: async (file: File) => {
      const ext = fileExtensionForUpload(file);
      const filename = `about-${Date.now()}.${ext}`;
      const url = await uploadFile(STORAGE_BUCKETS.ABOUT_IMAGES, filename, file);
      return url;
    },
  });
}

// Materials
export function useMaterials() {
  return useQuery({
    queryKey: ["materials"],
    queryFn: async () =>
      safeFetchList(
        () =>
          supabase
            .from("materials")
            .select("*")
            .order("created_at", { ascending: false }) as Promise<{
            data: Material[] | null;
            error: unknown;
          }>,
        amaviFallbackMaterials,
      ),
  });
}

export function useCreateMaterial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (material: Omit<Material, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase.from("materials").insert([material]).select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      invalidateContentQueries(queryClient);
    },
  });
}

export function useUpdateMaterial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (material: Partial<Material>) => {
      return saveRow("materials", material);
    },
    onSuccess: () => {
      invalidateContentQueries(queryClient);
    },
  });
}

export function useDeleteMaterial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("materials").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      invalidateContentQueries(queryClient);
    },
  });
}

export function useUploadMaterialImage() {
  return useMutation({
    mutationFn: async (file: File) => {
      const ext = fileExtensionForUpload(file);
      return uploadFile(STORAGE_BUCKETS.MATERIAL_IMAGES, `material-${Date.now()}.${ext}`, file);
    },
  });
}

// Guests
export function useGuests() {
  return useQuery({
    queryKey: ["guests"],
    queryFn: async () =>
      safeFetchList(
        () =>
          supabase
            .from("guests")
            .select("*")
            .order("created_at", { ascending: false }) as Promise<{
            data: Guest[] | null;
            error: unknown;
          }>,
        amaviFallbackGuests,
      ),
  });
}

export function useCreateGuest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (guest: Omit<Guest, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase.from("guests").insert([guest]).select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      invalidateContentQueries(queryClient);
    },
  });
}

export function useUpdateGuest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (guest: Partial<Guest>) => {
      return saveRow("guests", guest);
    },
    onSuccess: () => {
      invalidateContentQueries(queryClient);
    },
  });
}

export function useDeleteGuest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("guests").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      invalidateContentQueries(queryClient);
    },
  });
}

export function useUploadGuestImage() {
  return useMutation({
    mutationFn: async (file: File) => {
      const ext = fileExtensionForUpload(file);
      return uploadFile(STORAGE_BUCKETS.GUEST_IMAGES, `guest-${Date.now()}.${ext}`, file);
    },
  });
}
