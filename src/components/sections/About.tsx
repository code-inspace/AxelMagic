import { useRef } from "react";
import { useInView } from "framer-motion";
import { AuroraText } from "@/components/magicui/aurora-text";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Briefcase, Clock, ArrowRight } from "lucide-react";

const stats = [
  { value: 8, suffix: "+", label: "années d'expérience", icon: Briefcase },
  { value: 2, suffix: "+", label: "ans sur la mission DGAC", icon: Clock },
];

const techStack = [
  {
    label: "Front",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Shadcn/ui",
      "Material UI",
    ],
  },
  {
    label: "Back",
    items: [
      "Node.js",
      "Express",
      "API REST",
      "PostgreSQL",
      "MongoDB",
      "ElasticSearch",
    ],
  },
  { label: "CMS", items: ["Sanity", "Strapi", "Contentful"] },
  { label: "Tests", items: ["Jest", "Vitest", "Playwright", "Cypress"] },
  { label: "Infra", items: ["Docker", "AWS", "Azure", "CI/CD"] },
  { label: "Design", items: ["Figma", "Adobe XD"] },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="apropos" className="relative py-16 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E0F11] via-transparent to-[#0E0F11] pointer-events-none" />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, #653ad2, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <BlurFade inView delay={0}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/40" />
            <span className="text-xs text-purple-400 tracking-widest uppercase font-medium px-3 py-1 rounded-full border border-purple-500/20">
              À propos
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/40" />
          </div>
        </BlurFade>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left */}
          <div className="min-w-0">
            <BlurFade inView delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-poppins font-light leading-tight mb-8">
                Développeur frontend et full stack{" "}
                <AuroraText
                  colors={[
                    "#ffffff",
                    "#a78bfa",
                    "#653ad2",
                    "#8b5cf6",
                    "#ffffff",
                  ]}
                >
                  JavaScript senior.
                </AuroraText>
              </h2>
            </BlurFade>

            <div className="space-y-6 leading-relaxed">
              <BlurFade inView delay={0.2}>
                <p className="text-base sm:text-lg text-white">
                  J'interviens aussi bien sur du front pur que sur des
                  architectures full stack, en autonomie ou intégré dans une
                  équipe produit et tech.
                </p>
              </BlurFade>

              <BlurFade inView delay={0.3}>
                <p className="text-base sm:text-lg text-white">
                  Parmi mes références :{" "}
                  <span className="text-white font-semibold">
                    SNCF Connect, TotalEnergies, DGAC et Osmos Group,
                  </span>{" "}
                  des environnements exigeants dans le transport, l'énergie et
                  l'aviation civile. À la DGAC notamment, plus de 2 ans de
                  mission sur du développement end-to-end React / Node.js, avec
                  mise en place de pipelines CI/CD et de tests automatisés.
                </p>
              </BlurFade>

              <BlurFade inView delay={0.4}>
                <div className="glass-card border border-purple-500/20 p-5 rounded-2xl">
                  <p className="text-white italic">
                    Un ancien Product Owner qui code. Ça se traduit par une
                    attention constante à la qualité, à la maintenabilité, à la
                    performance, et surtout à la{" "}
                    <span className="text-purple-300 font-semibold not-italic">
                      compréhension du besoin métier derrière chaque
                      fonctionnalité.
                    </span>
                  </p>
                </div>
              </BlurFade>

              <BlurFade inView delay={0.5}>
                <div className="space-y-3">
                  {techStack.map(({ label, items }) => (
                    <div key={label} className="flex items-start gap-3">
                      <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider w-12 shrink-0 pt-0.5">
                        {label}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {items.map((item) => (
                          <span
                            key={item}
                            className="px-2 py-0.5 rounded-md text-xs font-medium bg-white/5 border border-white/10 text-white"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </BlurFade>
            </div>
          </div>

          {/* Right */}
          <div ref={ref} className="min-w-0 overflow-hidden">
            <div
              className="grid grid-cols-2 gap-4"
              style={{ gridAutoRows: "1fr" }}
            >
              {stats.map(({ value, suffix, label, icon: Icon }, i) => (
                <BlurFade
                  key={label}
                  inView
                  delay={0.2 + i * 0.1}
                  className="h-full"
                >
                  <div className="glass-card border border-white/[0.07] hover:border-purple-500/30 transition-all duration-300 p-4 lg:p-6 rounded-2xl group h-full">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-4xl font-black mb-1">
                      <span className="aurora-text">
                        {isInView ? (
                          <NumberTicker
                            value={value}
                            delay={i * 0.15}
                            className="aurora-text"
                          />
                        ) : (
                          "0"
                        )}
                        {suffix}
                      </span>
                    </div>
                    <p className="text-white text-sm">{label}</p>
                  </div>
                </BlurFade>
              ))}
            </div>

            {/* Photo card */}
            <BlurFade inView delay={0.6}>
              <div className="mt-4 glass-card border border-white/[0.07] rounded-2xl overflow-hidden flex lg:flex-col">
                <div className="w-24 lg:w-full flex-shrink-0 lg:aspect-square overflow-hidden self-stretch">
                  <img
                    src="/images/photo-pro 3.jpg"
                    alt="Axel Coudair"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="px-4 py-4 flex flex-col justify-center min-w-0">
                  <p className="font-semibold text-white text-sm lg:text-base">
                    Axel Coudair
                  </p>
                  <p className="text-xs text-white mt-0.5">
                    Développeur Full Stack senior
                  </p>
                  <p className="text-xs text-white leading-relaxed">
                    Basé à Paris · remote
                  </p>
                </div>
              </div>
            </BlurFade>

            {/* CTA card */}
            <BlurFade inView delay={0.7}>
              <div className="mt-4 glass-card border border-purple-500/20 p-5 rounded-2xl flex items-center justify-between gap-4">
                <p className="text-white text-sm leading-relaxed">
                  Une mission à me soumettre ?{" "}
                  <span className="text-purple-300 font-semibold">
                    On en parle.
                  </span>
                </p>
                <a
                  href="#contact"
                  className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all duration-300"
                  style={{ background: "linear-gradient(135deg, #2708a0, #653ad2)" }}
                >
                  Me contacter
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
