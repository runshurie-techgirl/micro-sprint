import { useEffect, useRef, useState } from "react";
import { Award, Download, Globe2, Home, ListChecks, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export type MenuItemId = "home" | "how" | "vault" | "download" | "privacy" | "sdg";
const items: { id: MenuItemId; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "how", label: "How It Works", icon: ListChecks },
  { id: "vault", label: "Reference Vault", icon: Award },
  { id: "download", label: "Download Certificate", icon: Download },
  { id: "privacy", label: "Privacy Shield", icon: ShieldCheck },
  { id: "sdg", label: "UN SDGs 8, 10 & 17", icon: Globe2 },
];

export function SiteMenu({ active, onSelect }: { active: MenuItemId; onSelect: (id: MenuItemId) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onDown = (e: PointerEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("keydown", onKey); document.addEventListener("pointerdown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onDown); };
  }, [open]);
  return <div ref={ref} className="site-menu">
    <button type="button" className="dots-button" aria-label="Open menu" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(o => !o)}>
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><circle cx="12" cy="5" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="19" r="2" /></svg>
    </button>
    <div className={cn("menu-backdrop", open && "is-open")} aria-hidden="true" onClick={() => setOpen(false)} />
    <div role="menu" aria-label="More" className={cn("menu-panel", open && "is-open")}>
      {items.map(item => <button key={item.id} role="menuitem" type="button" tabIndex={open ? 0 : -1} className={cn("menu-item", active === item.id && "is-active")} onClick={() => { setOpen(false); onSelect(item.id); }}><item.icon size={18} />{item.label}</button>)}
    </div>
  </div>;
}
