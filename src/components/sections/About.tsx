import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AuroraText } from "@/components/magicui/aurora-text";
import { TextReveal } from "@/components/magicui/text-reveal";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { BlurFade } from "@/components/magicui/blur-fade";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { Briefcase, Zap } from "lucide-react";

const stats = [
  { value: 8, suffix: "+", label: "années d'expérience", icon: Briefcase },
  { value: 30, suffix: "j", label: "délai de livraison", icon: Zap },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="apropos" className="relative py-32 overflow-hidden">
      <DotPattern className="opacity-30" cr={0.8} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E0F11] via-transparent to-[#0E0F11] pointer-events-none" />

      {/* Background glow */}
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

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <BlurFade inView delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-poppins font-light leading-tight mb-8">
                Derrière chaque bon site, <AuroraText colors={["#ffffff", "#a78bfa", "#653ad2", "#8b5cf6", "#ffffff"]}>il y a quelqu'un qui comprend vraiment votre métier.</AuroraText>
              </h2>
            </BlurFade>

            <div className="space-y-6 text-white/65 leading-relaxed">
              <BlurFade inView delay={0.2}>
                <p className="text-base sm:text-lg text-white/75">
                  J'ai passé des années à travailler sur des projets digitaux
                  pour de grands groupes : la SNCF, la DGAC, Osmos Group, et en
                  agence de communication chez Cinqmars, dans des secteurs très
                  variés. J'ai été développeur, chef de projets, UX designer.
                  J'ai vu ce qui fonctionne, et ce qui coûte cher sans rapporter
                  grand-chose.
                </p>
                <TextReveal text="" className="text-base sm:text-lg" />
              </BlurFade>

              <BlurFade inView delay={0.3}>
                <p className="text-base sm:text-lg text-white/75">
                  Aujourd'hui, je mets cette expérience au service des{" "}
                  <span className="text-white font-semibold">
                    entrepreneurs, PME et indépendants
                  </span>{" "}
                  qui veulent un site à leur image : efficace, moderne, et pensé
                  pour convertir.
                </p>
              </BlurFade>

              <BlurFade inView delay={0.4}>
                <div className="glass-card border border-purple-500/20 p-5 rounded-2xl">
                  <p className="text-white/80 italic">
                    "Pas de grande agence impersonnelle, pas de freelance qui
                    disparaît après la livraison.{" "}
                    <span className="text-purple-300 font-semibold not-italic">
                      Un vrai partenaire qui s'implique dans votre projet comme
                      si c'était le sien.
                    </span>
                    "
                  </p>
                </div>
              </BlurFade>
            </div>
          </div>

          {/* Right — stats */}
          <div ref={ref}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ value, suffix, label, icon: Icon }, i) => (
                <BlurFade key={label} inView delay={0.2 + i * 0.1}>
                  <div className="glass-card border border-white/[0.07] hover:border-purple-500/30 transition-all duration-300 p-6 rounded-2xl group">
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
                    <p className="text-white/50 text-sm">{label}</p>
                  </div>
                </BlurFade>
              ))}
            </div>
            {/* Photo placeholder */}
            <BlurFade inView delay={0.6}>
              <div className="mt-6 glass-card border border-white/[0.07] p-4 rounded-2xl flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-purple-500/40">
                    <img
                      src="/images/photo-pro 3.jpg"
                      alt="Axel Coudair"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-400 border-2 border-[#0E0F11]" />
                </div>
                <div>
                  <p className="font-semibold text-white">Axel Coudair</p>
                  <p className="text-xs text-white/50">
                    Expert Web & Stratégie Digitale
                  </p>
                </div>
                <div className="ml-auto">
                  <span className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    En ligne
                  </span>
                </div>
              </div>
            </BlurFade>

          </div>
        </div>
      </div>
    </section>
  );
}
