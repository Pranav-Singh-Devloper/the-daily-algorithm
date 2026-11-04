import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 26, className = "", testid }) => (
  <motion.div
    data-testid={testid}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.8, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

export const MaskedLines = ({
  lines,
  as: Tag = "h1",
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.13,
}) => (
  <Tag className={className}>
    {lines.map((l, i) => (
      <motion.span
        key={i}
        className="block overflow-hidden pb-[0.08em] -mb-[0.08em]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.span
          className={`block ${lineClassName}`}
          variants={{
            hidden: { y: "112%" },
            visible: {
              y: "0%",
              transition: { duration: 0.95, delay: delay + i * stagger, ease: EASE },
            },
          }}
        >
          {l}
        </motion.span>
      </motion.span>
    ))}
  </Tag>
);

export const SectionHeading = ({ kicker, title, rule = true }) => (
  <div className="mb-8 sm:mb-12">
    <Reveal>
      <span className="font-kicker text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-rubric">
        {kicker}
      </span>
    </Reveal>
    <MaskedLines
      as="h2"
      lines={[title]}
      className="font-heading font-black uppercase text-2xl sm:text-4xl lg:text-5xl tracking-tight mt-2"
      stagger={0.05}
    />
    {rule && <div className="mt-4 h-[2px] bg-ink" />}
  </div>
);
