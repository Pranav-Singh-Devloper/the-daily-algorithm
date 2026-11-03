import { TODAY_LINE } from "@/utils/date";
import { TICKER_ITEMS, NAV_LINKS } from "@/data/content";

const scrollTo = (id) => (e) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -12 });
  else el.scrollIntoView({ behavior: "smooth" });
};

const NavLink = ({ id, label }) => (
  <a
    href={`#${id}`}
    data-testid={`nav-link-${id}`}
    onClick={scrollTo(id)}
    className="font-kicker font-bold uppercase tracking-[0.22em] text-[11px] sm:text-xs text-neutral-800 hover:bg-azure hover:text-[#F9F7F1] transition-colors duration-200 px-2 py-1"
  >
    {label}
  </a>
);

export default function Masthead() {
  return (
    <header className="relative z-10 px-4 sm:px-8 pt-5" data-testid="masthead">
      {/* Dateline */}
      <div className="flex items-center justify-between border-b border-[#121212] pb-2 font-mono-np text-[9px] sm:text-[11px] uppercase tracking-widest text-neutral-700">
        <span>Vol. I · No. 1</span>
        <span className="hidden sm:inline">{TODAY_LINE}</span>
        <span>Price: One Offer</span>
      </div>
      <div className="sm:hidden text-center font-mono-np text-[9px] uppercase tracking-widest text-neutral-600 pt-1">
        {TODAY_LINE}
      </div>

      {/* Masthead */}
      <h1
        data-testid="masthead-title"
        className="font-masthead font-black text-center uppercase leading-none tracking-tight text-[11vw] sm:text-7xl lg:text-8xl mt-4 sm:mt-6"
      >
        The Daily Algorithm
      </h1>
      <div className="flex items-center justify-center gap-3 mt-3 sm:mt-4">
        <span className="hidden sm:block h-px w-24 bg-azure" />
        <p className="font-kicker font-bold uppercase tracking-[0.28em] text-[10px] sm:text-xs text-azure text-center">
          Est. 2026 — Special Internship Edition — The AI/ML Desk
        </p>
        <span className="hidden sm:block h-px w-24 bg-azure" />
      </div>

      {/* Nav */}
      <nav className="mt-4 border-y-2 border-[#121212] py-2 flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
        {NAV_LINKS.map((l) => (
          <NavLink key={l.id} {...l} />
        ))}
      </nav>

      {/* Ticker */}
      <div
        className="mt-0 border-b border-[#121212] overflow-hidden bg-azure text-[#F9F7F1]"
        data-testid="news-ticker"
      >
        <div className="np-ticker-track py-1.5">
          {[0, 1].map((copy) => (
            <span
              key={copy}
              aria-hidden={copy === 1}
              className="font-kicker font-bold uppercase tracking-[0.25em] text-[10px] sm:text-xs"
            >
              {TICKER_ITEMS.map((t, i) => (
                <span key={i} className="mx-6">
                  {t} <span className="mx-2 opacity-60">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
