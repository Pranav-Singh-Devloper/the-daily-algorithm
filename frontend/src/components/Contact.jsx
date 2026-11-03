import { PERSON } from "@/data/content";
import { MaskedLines, Reveal, SectionHeading } from "@/components/Reveal";

const LINKS = [
  { label: "Email", value: PERSON.email, href: `mailto:${PERSON.email}`, id: "email-link" },
  { label: "Telegram", value: PERSON.phone, href: `tel:${PERSON.phone.replace(/\s/g, "")}`, id: "phone-link" },
  { label: "GitHub", value: "github.com/pranav — link on request", href: PERSON.github, id: "github-profile-link" },
  { label: "LinkedIn", value: "linkedin.com/in/pranav — link on request", href: PERSON.linkedin, id: "linkedin-profile-link" },
];

export default function Contact() {
  const onSubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = f.get("name") || "";
    const email = f.get("email") || "";
    const subject = f.get("subject") || "Internship Inquiry";
    const body = f.get("body") || "";
    const mail = `mailto:${PERSON.email}?subject=${encodeURIComponent(
      `[Letter to the Editor] ${subject}`
    )}&body=${encodeURIComponent(`${body}\n\n— ${name} (${email})`)}`;
    window.location.href = mail;
  };

  const field =
    "w-full bg-transparent border border-[#121212] px-3 py-2.5 font-body text-[15px] placeholder:text-neutral-400 focus:outline-none focus:bg-white transition-colors duration-200";

  return (
    <section id="letters" className="relative z-10 px-4 sm:px-8 py-12 sm:py-20" data-testid="contact-section">
      <div className="max-w-6xl mx-auto">
        <SectionHeading kicker="Correspondence & Inquiries" title="Letters to the Editor" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form */}
          <Reveal className="lg:col-span-7">
            <form onSubmit={onSubmit} className="border-2 border-[#121212] p-5 sm:p-8" data-testid="letter-form">
              <p className="font-mono-np text-[9px] uppercase tracking-widest text-neutral-500 mb-6">
                Telegram Form No. 26 — fill in and press SEND DESPATCH
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <label className="block">
                  <span className="font-kicker font-bold uppercase tracking-[0.2em] text-[10px] block mb-1.5">
                    Sender's Name / Publication
                  </span>
                  <input name="name" required data-testid="letter-name-input" className={field} placeholder="Your name" />
                </label>
                <label className="block">
                  <span className="font-kicker font-bold uppercase tracking-[0.2em] text-[10px] block mb-1.5">
                    Sender's Email Address
                  </span>
                  <input name="email" type="email" required data-testid="letter-email-input" className={field} placeholder="you@company.com" />
                </label>
              </div>
              <label className="block mb-4">
                <span className="font-kicker font-bold uppercase tracking-[0.2em] text-[10px] block mb-1.5">
                  Subject / Internship Inquiry
                </span>
                <input name="subject" data-testid="letter-subject-input" className={field} placeholder="e.g. AI/ML Internship Inquiry" />
              </label>
              <label className="block mb-6">
                <span className="font-kicker font-bold uppercase tracking-[0.2em] text-[10px] block mb-1.5">
                  Telegram Message Body
                </span>
                <textarea name="body" rows={5} required data-testid="letter-body-input" className={`${field} resize-none`} placeholder="Dear Editor, ..." />
              </label>
              <button
                type="submit"
                data-testid="submit-letter-button"
                className="font-kicker font-bold uppercase tracking-[0.25em] text-xs bg-[#121212] text-[#F9F7F1] px-8 py-3.5 hover:bg-transparent hover:text-[#121212] border border-[#121212] transition-colors duration-200 w-full sm:w-auto"
              >
                Send Despatch →
              </button>
            </form>
          </Reveal>

          {/* Quick links */}
          <div className="lg:col-span-5">
            <MaskedLines
              as="h3"
              lines={["The Editor", "is accepting", "correspondence."]}
              className="font-heading font-black text-2xl sm:text-3xl leading-[1.05] tracking-tight"
            />
            <Reveal delay={0.15}>
              <p className="font-body text-[15px] leading-relaxed mt-4 text-neutral-800">
                Recruiting for AI, machine learning or generative AI roles? A letter
                lands directly in the editor's inbox — replies are typically filed
                within one news cycle.
              </p>
            </Reveal>
            <div className="border border-[#121212] mt-6 divide-y divide-[#121212]" data-testid="quick-links">
              {LINKS.map((l, i) => (
                <Reveal key={l.label} delay={0.1 + i * 0.08}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("mailto") || l.href.startsWith("tel") || l.href === "#" ? undefined : "_blank"}
                    rel="noreferrer"
                    data-testid={l.id}
                    className="flex items-center justify-between gap-3 px-4 py-3.5 hover:bg-[#121212] hover:text-[#F9F7F1] transition-colors duration-200 group"
                  >
                    <span className="font-kicker font-bold uppercase tracking-[0.2em] text-[11px]">
                      {l.label}
                    </span>
                    <span className="font-mono-np text-[10px] sm:text-[11px] tracking-wide text-right">
                      {l.value}
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
