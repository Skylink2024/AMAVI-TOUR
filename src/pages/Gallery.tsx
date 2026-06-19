import { PageShell } from '../components/PageShell'
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useGallery } from '../hooks/useContent'

interface GalleryItem {
  id: string
  image_url?: string
  video_url?: string
  alt?: string
  type: 'photo' | 'video'
  title: string
  isSpan?: boolean
}

export default function GalleryPage() {
  const { data: dbItems = [] } = useGallery()
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  
  // Use ONLY database items - no fallback
  const galleryItems: GalleryItem[] = dbItems

  return (
    <PageShell
      eyebrow="Memories"
      title="GALLERY"
      subtitle="Every smile, every spin, every spotlight. Our journey in pictures and film."
    >
      {/* Masonry Grid */}
      {galleryItems.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {galleryItems.map((item) => (
            <MasonryItem
              key={item.id}
              item={item}
              onSelect={setSelectedItem}
              span={item.isSpan}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-20 text-center">
          <div>
            <Play size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-lg text-muted-foreground">No gallery items yet.</p>
            <p className="text-sm text-muted-foreground mt-2">Items added in the admin dashboard will appear here.</p>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedItem && (
        <Lightbox
          item={selectedItem}
          items={galleryItems}
          onClose={() => setSelectedItem(null)}
          onNext={() => {
            const currentIdx = galleryItems.findIndex((i) => i.id === selectedItem.id)
            const nextIdx = (currentIdx + 1) % galleryItems.length
            setSelectedItem(galleryItems[nextIdx])
          }}
          onPrev={() => {
            const currentIdx = galleryItems.findIndex((i) => i.id === selectedItem.id)
            const prevIdx = (currentIdx - 1 + galleryItems.length) % galleryItems.length
            setSelectedItem(galleryItems[prevIdx])
          }}
        />
      )}
    </PageShell>
  )
}

function MasonryItem({
  item,
  onSelect,
  span,
}: {
  item: GalleryItem
  onSelect: (item: GalleryItem) => void
  span?: boolean
}) {
  const imageSource = item.image_url
  
  return (
    <div
      className={`group relative overflow-hidden cursor-pointer ${span ? 'col-span-2 row-span-2 md:col-span-1 md:row-span-1' : ''} lg:first:col-span-2 lg:first:row-span-2`}
      onClick={() => onSelect(item)}
    >
      {imageSource ? (
        <img
          src={imageSource}
          alt={item.alt || item.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      ) : (
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <div className="text-center">
            <Play size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">{item.title}</p>
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />

      {/* Video Indicator */}
      {item.type === 'video' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full glass flex items-center justify-center group-hover:scale-110 transition-transform opacity-0 group-hover:opacity-100">
            <Play size={20} className="text-primary fill-primary ml-1" />
          </div>
        </div>
      )}

      {/* Title on hover */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white text-sm font-display">{item.title}</p>
        {item.type === 'video' && (
          <p className="text-primary text-xs uppercase tracking-widest">Video</p>
        )}
      </div>
    </div>
  )
}

interface LightboxProps {
  item: GalleryItem
  items: GalleryItem[]
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

function Lightbox({ item, items, onClose, onNext, onPrev }: LightboxProps) {
  const currentIdx = items.findIndex((i) => i.id === item.id)
  const displaySrc = item.image_url

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="max-w-5xl w-full max-h-[90vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close"
        >
          <X size={24} className="text-white" />
        </button>

        {/* Image/Video Container */}
        <div className="w-full h-[70vh] bg-black/50 flex items-center justify-center overflow-hidden">
          {item.type === 'photo' ? (
            <img
              src={displaySrc}
              alt={item.alt || item.title}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <video
              src={item.video_url}
              controls
              autoPlay
              className="max-w-full max-h-full object-contain"
              style={{ backgroundColor: '#000' }}
            />
          )}
        </div>

        {/* Info & Navigation */}
        <div className="bg-card border-t border-border p-6 flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-display text-2xl mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground">
              {currentIdx + 1} of {items.length} • {item.type === 'video' ? 'Video' : 'Photo'}
            </p>
          </div>

          <div className="flex gap-4 items-center">
            <button
              onClick={onPrev}
              className="p-2 hover:bg-primary/20 rounded transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={20} className="text-primary" />
            </button>
            <button
              onClick={onNext}
              className="p-2 hover:bg-primary/20 rounded transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={20} className="text-primary" />
            </button>
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="bg-background border-t border-border p-4 overflow-x-auto">
          <div className="flex gap-2">
            {items.map((thumbnail, idx) => (
              <button
                key={thumbnail.id}
                onClick={() => {
                  const targetItem = items[idx]
                  // Trigger navigation to the clicked item
                  const targetIdx = items.findIndex((i) => i.id === item.id)
                  const clickedIdx = idx
                  const diff = clickedIdx - targetIdx
                  if (diff > 0) {
                    for (let i = 0; i < diff; i++) onNext()
                  } else {
                    for (let i = 0; i < Math.abs(diff); i++) onPrev()
                  }
                }}
                className={`w-16 h-16 flex-shrink-0 overflow-hidden transition-all ${
                  thumbnail.id === item.id
                    ? 'border-2 border-primary'
                    : 'border border-border/50 hover:border-primary/50 opacity-60 hover:opacity-100'
                }`}
              >
                {thumbnail.image_url ? (
                  <img
                    src={thumbnail.image_url}
                    alt={thumbnail.alt || thumbnail.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <Play size={12} className="text-muted-foreground" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
