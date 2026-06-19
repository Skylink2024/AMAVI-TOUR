import { SectionTitle } from "./SectionTitle";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useGallery } from "../hooks/useContent";

export function GallerySection() {
  const { data: items = [] } = useGallery();
  
  // Filter items that have either image_url or video_url
  const validItems = items.filter(item => 
    item.image_url || item.video_url
  );

  return (
    <section className="py-28">
      <div className="container mx-auto px-6">
        <SectionTitle
          eyebrow="Memories"
          title="GALLERY & FILMS"
          subtitle="Relive the moments. Watch the videos, browse the photos."
        />

        {validItems.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {validItems.slice(0, 6).map((item, i) => (
                <Link
                  key={item.id}
                  to="/gallery"
                  className={`group relative overflow-hidden cursor-pointer ${
                    i === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square"
                  }`}
                >
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <div className="text-center">
                        <Play size={32} className="text-muted-foreground mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">{item.title}</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 dark:bg-white/10 group-hover:bg-black/10 dark:group-hover:bg-white/5 transition-colors" />
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full glass flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play size={24} className="text-primary fill-primary ml-1" />
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 via-black/20 to-transparent dark:from-black/80 dark:via-black/30">
                    <p className="text-xs tracking-[0.2em] uppercase text-primary">
                      {item.type === "video" ? "video" : "photo"}
                    </p>
                    <p className="text-sm text-foreground mt-1">{item.title}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/gallery"
                className="text-primary text-sm tracking-[0.3em] uppercase hover:opacity-80"
              >
                View full gallery →
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Play size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No gallery items yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}