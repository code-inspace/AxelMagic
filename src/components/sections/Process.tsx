import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MessageSquare,
  Paintbrush,
  Code,
  FileText,
  CheckCircle,
  HeartHandshake,
} from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BlurFade } from "@/components/magicui/blur-fade";
import { NumberTicker } from "@/components/magicui/number-ticker";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Découverte",
    description:
      "On commence par un échange approfondi pour comprendre votre activité, vos objectifs et vos clients. ",
    duration: "Semaine 1",
    color: "#8b5cf6",
  },
  {
    number: "02",
    icon: Paintbrush,
    title: "Maquette",
    description:
      "Je vous soumets un design complet sur Figma. On affine ensemble jusqu'à ce que ce soit parfait. Vous validez avant le démarrage du développement.",
    duration: "Semaine 1-2",
    color: "#a78bfa",
  },
  {
    number: "03",
    icon: Code,
    title: "Développement",
    description:
      "Chaque projet est différent ma stack aussi. Je code votre site avec les technologies adaptées à ses spécificités.\nFront : Next.js, React, Vite, Tailwind, Webflow\nBack : Prisma, Neon, Supabase, Payload CMS\nToujours dans un seul objectif : un site rapide, optimisé et évolutif.",
    duration: "Semaine 2-3",
    color: "#7c3aed",
  },
  {
    number: "04",
    icon: FileText,
    title: "Contenu & SEO",
    description:
      "On intègre vos textes et vos visuels, on structure les pages pour le référencement. Votre site est préparé pour être trouvé sur Google.",
    duration: "Semaine 3",
    color: "#6d28d9",
  },
  {
    number: "05",
    icon: CheckCircle,
    title: "Tests & Livraison",
    description:
      "Vérifications complètes sur tous les appareils, puis mise en ligne. Votre site est prêt à travailler pour vous.",
    duration: "Semaine 4",
    color: "#5b21b6",
  },
  {
    number: "06",
    icon: HeartHandshake,
    title: "Accompagnement",
    description:
      "Je reste disponible après la livraison. Vous n'êtes pas seul. Suivi, ajustements, évolutions, un vrai partenariat sur le long terme.",
    duration: "En continu",
    color: "#4c1d95",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="relative py-32 overflow-hidden">
      {/* Decorative glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] opacity-[0.06] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, #653ad2, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <BlurFade inView delay={0}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/40" />
            <span className="text-xs text-purple-400 tracking-widest uppercase font-medium px-3 py-1 rounded-full border border-purple-500/20">
              Méthode
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/40" />
          </div>
        </BlurFade>

        <BlurFade inView delay={0.1}>
          <div className="text-center mb-4">
            <h2 className="text-4xl sm:text-5xl font-poppins font-light leading-tight mb-4">
              Votre site en ligne en{" "}
              <AuroraText
                colors={["#ffffff", "#a78bfa", "#653ad2", "#8b5cf6", "#ffffff"]}
              >
                30 jours.
              </AuroraText>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Un processus éprouvé, une méthode claire. Vous savez où en est
              votre projet à chaque étape.
            </p>
          </div>
        </BlurFade>

        {/* Countdown badge */}
        <BlurFade inView delay={0.2}>
          <div className="flex justify-center mb-16">
            <div
              ref={ref}
              className="glass-card border border-purple-500/30 px-6 py-3 rounded-2xl flex items-center gap-4"
            >
              <div className="text-center">
                <div className="text-3xl font-black aurora-text">
                  {isInView ? (
                    <NumberTicker
                      value={30}
                      delay={0}
                      className="aurora-text"
                    />
                  ) : (
                    "0"
                  )}
                </div>
                <div className="text-xs text-white/40">jours</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="text-sm font-semibold text-white">
                  Site clé en main
                </p>
                <p className="text-xs text-white/40">
                  Design · Dev · SEO · Livraison
                </p>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {steps.map((step, i) => (
            <BlurFade
              key={step.number}
              inView
              delay={0.1 + i * 0.08}
              className="h-full"
            >
              <motion.div
                whileHover={{ y: -4 }}
                className="group relative glass-card border border-white/[0.07] hover:border-purple-500/25 transition-all duration-400 p-6 rounded-2xl overflow-hidden h-full"
              >
                {/* Step number background */}
                <div
                  className="absolute top-4 right-4 text-6xl font-black opacity-5 leading-none"
                  style={{ color: step.color }}
                >
                  {step.number}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${step.color}20`,
                        border: `1px solid ${step.color}30`,
                      }}
                    >
                      <step.icon
                        className="w-5 h-5"
                        style={{ color: step.color }}
                      />
                    </div>
                    <span className="text-xs text-white/30 font-medium">
                      {step.duration}
                    </span>
                  </div>

                  <span
                    className="text-xs font-bold tracking-wider mb-2 block"
                    style={{ color: step.color }}
                  >
                    ÉTAPE {step.number}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed whitespace-pre-line">
                    {step.description}
                  </p>
                </div>

                {/* Bottom gradient line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(to right, ${step.color}, transparent)`,
                  }}
                />
              </motion.div>
            </BlurFade>
          ))}
        </div>

        {/* CTA */}
        <BlurFade inView delay={0.6}>
          <div className="mt-12 text-center">
            <p className="text-white/50 mb-6">Prêt à lancer votre projet ?</p>
            <button
              data-cal-namespace="30min"
              data-cal-link="axel-coudair-hhelf2/30min"
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #2708a0, #653ad2)",
              }}
            >
              Réserver mon appel découverte →
            </button>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
