import { useEffect, useState } from "react";

export function LiquidCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) setEnabled(true);
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div
        className="pointer-events-none fixed z-[200] w-8 h-8 rounded-full bg-primary/30 blur-xl mix-blend-screen transition-transform duration-100"
        style={{ left: pos.x - 16, top: pos.y - 16 }}
      />
      <div
        className="pointer-events-none fixed z-[200] w-2 h-2 rounded-full bg-primary"
        style={{ left: pos.x - 4, top: pos.y - 4 }}
      />
    </>
  );
}
