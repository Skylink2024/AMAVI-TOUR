import { Link } from "react-router-dom";
import { Instagram, Youtube, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 mt-24">
      <div className="container mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex flex-col leading-none mb-4">
            <span className="font-display text-xs tracking-[0.3em] text-primary">MR</span>
            <span className="font-display text-3xl tracking-wide">ANGOLA</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Representing Angola beyond borders. Sharing our story. Elevating our people through dance, music and culture.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" className="glass p-3 rounded-full hover:text-primary transition-colors"><Instagram size={18} /></a>
            <a href="#" className="glass p-3 rounded-full hover:text-primary transition-colors"><Youtube size={18} /></a>
            <a href="#" className="glass p-3 rounded-full hover:text-primary transition-colors"><Facebook size={18} /></a>
          </div>
        </div>
        <div>
          <h4 className="text-sm tracking-[0.2em] text-primary mb-4 uppercase">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/events" className="hover:text-primary">Events</Link></li>
            <li><Link to="/courses" className="hover:text-primary">Courses</Link></li>
            <li><Link to="/gallery" className="hover:text-primary">Gallery</Link></li>
            <li><Link to="/materials" className="hover:text-primary">Materials</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm tracking-[0.2em] text-primary mb-4 uppercase">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>mrangola@outlook.com</li>
            <li>+1 (754) 317 9043</li>
            <li>Fort Lauderdale, Florida</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/50 py-6 text-center text-xs text-muted-foreground tracking-widest">
        © {new Date().getFullYear()} MR ANGOLA · CULTURE. IDENTITY. LEGACY.
      </div>
    </footer>
  );
}
