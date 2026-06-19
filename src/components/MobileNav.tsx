import { NavLink } from "react-router-dom";
import { Home, BookOpen, Ticket, Image, Hotel } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/courses", label: "Courses", icon: BookOpen },
  { to: "/events", label: "Events", icon: Ticket },
  { to: "/gallery", label: "Gallery", icon: Image },
  { to: "/hotels", label: "Hotels", icon: Hotel },
];

export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-4 left-4 right-4 z-40 glass rounded-full p-2 shadow-elegant">
      <ul className="flex items-center justify-around">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <li key={it.to}>
              <NavLink
                to={it.to}
                className={({ isActive }) =>
                  `flex items-center justify-center w-11 h-11 rounded-full transition-colors ${
                    isActive
                      ? "bg-gradient-gold text-primary-foreground shadow-gold"
                      : "text-muted-foreground hover:text-primary"
                  }`
                }
                aria-label={it.label}
              >
                <Icon size={18} />
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
