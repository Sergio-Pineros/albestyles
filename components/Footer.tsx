import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-[clamp(1.25rem,4vw,4.5rem)] py-10">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <img
            src="/media/logo-mark-white.png"
            alt=""
            width={80}
            height={80}
            className="h-16 w-16 object-contain"
          />
          <p className="mt-4 max-w-xs text-sm text-mute">
            {site.name} at {site.shop}. North Loop, Minneapolis.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 font-mono text-[11px] tracking-[0.2em] uppercase">
          <a href={site.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={site.facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href={`mailto:${site.email}`}>Email</a>
          <a href={site.phoneHref}>Call</a>
          <a href={site.bookUrl}>Book</a>
        </div>
        <p className="font-mono text-[10px] tracking-[0.18em] text-mute uppercase">
          © 2026 {site.name}
        </p>
      </div>
    </footer>
  );
}
