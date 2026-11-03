import { TODAY_LINE } from "@/utils/date";

export default function Footer() {
  const toTop = (e) => {
    e.preventDefault();
    if (window.__lenis) window.__lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="relative z-10 px-4 sm:px-8 pb-10 pt-8" data-testid="footer">
      <div className="max-w-6xl mx-auto border-t-4 border-[#121212] border-double pt-6">
        <div className="rule-double mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="font-masthead font-bold uppercase tracking-[0.2em] text-sm">
            The Daily Algorithm
          </p>
          <p className="font-mono-np text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-600">
            © 2026 · All stories filed from the ML desk · {TODAY_LINE}
          </p>
          <a
            href="#top"
            onClick={toTop}
            data-testid="back-to-top-link"
            className="font-kicker font-bold uppercase tracking-[0.25em] text-[10px] border border-[#121212] px-4 py-2 hover:bg-[#121212] hover:text-[#F9F7F1] transition-colors duration-200"
          >
            ↑ Return to Front Page
          </a>
        </div>
        <p className="text-center font-body italic text-xs text-neutral-500 mt-6">
          Printed entirely in the browser · Set in Cinzel Decorative, Playfair Display & Newsreader ·
          Delivered by paper aero-plane, zero emissions.
        </p>
      </div>
    </footer>
  );
}
