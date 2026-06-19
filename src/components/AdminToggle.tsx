import { useAdmin } from "@/context/AdminContext";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function AdminToggle() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // Now we know we're on client, safe to use hook
  return <AdminToggleContent />;
}

function AdminToggleContent() {
  const { isAdmin, user } = useAdmin();

  // Only show admin button if user is logged in
  if (!user) {
    return null;
  }

  return (
    <Link
      to="/admin/dashboard"
      className="fixed left-6 bottom-6 z-40 w-12 h-12 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform shadow-elegant hover:shadow-gold group"
      aria-label="Go to admin dashboard"
      title="Go to admin dashboard"
    >
      <Settings size={18} className={isAdmin ? "text-primary" : "text-muted-foreground"} />
      <span className="absolute left-0 top-full mt-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        Admin Panel
      </span>
    </Link>
  );
}
