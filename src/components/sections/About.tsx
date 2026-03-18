import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AuroraText } from "@/components/magicui/aurora-text";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { BlurFade } from "@/components/magicui/blur-fade";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { Marquee } from "@/components/magicui/marquee";
import { Briefcase, Zap } from "lucide-react";

const logos = [
  { src: "/images/logo_previous_companies/logo-previous-company1.svg.png", alt: "SNCF Connect" },
  { src: "/images/logo_previous_companies/logo-previous-company4.png", alt: "DGAC" },
  { src: "/images/logo_previous_companies/logo-previous-company5.png", alt: "TotalEnergies" },
  { src: "/images/logo_previous_companies/logo-previous-company2.png", alt: "Osmos" },
];

const stats = [
  { value: 8, suffix: "+", label: "années d'expérience", icon: Briefcase },
  { value: 30, suffix: "j", label: "délai de livraison", icon: Zap },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="apropos" className="relative py-16 lg:py-32 overflow-hidden">
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

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start lg:items-center">
          {/* Left — text */}
          <div className="min-w-0">
            <BlurFade inView delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-poppins font-light leading-tight mb-8">
                J'ai été chef de projet, UX designer et développeur.{" "}
                <AuroraText
                  colors={[
                    "#ffffff",
                    "#a78bfa",
                    "#653ad2",
                    "#8b5cf6",
                    "#ffffff",
                  ]}
                >
                  Maintenant je suis les trois à la fois, pour vous.
                </AuroraText>
              </h2>
            </BlurFade>

            <div className="space-y-6 text-white/65 leading-relaxed">
              <BlurFade inView delay={0.2}>
                <p className="text-base sm:text-lg text-white/75">
                  <span className="text-white font-semibold">
                    SNCF. DGAC. TotalEnergies. Osmos Group.
                  </span>{" "}
                  Des projets exigeants, des budgets serrés, des livraisons
                  non-négociables.
                </p>
                <p className="text-base sm:text-lg text-white/75 mt-4">
                  J'y ai occupé trois rôles au fil du temps : développeur,
                  chef de projet, UX designer. Ce parcours n'est pas un hasard,
                  c'est ce qui me permet aujourd'hui de comprendre l'ensemble de
                  la chaîne, du brief au déploiement, là où la plupart des
                  freelances n'en voient qu'une partie
                </p>
              </BlurFade>

              <BlurFade inView delay={0.3}>
                <p className="text-base sm:text-lg text-white/75">
                  Aujourd'hui, cette lecture complète est ce que j'apporte à
                  chaque projet. Vous ne gérez pas une équipe de prestataires.
                  Vous avez un{" "}
                  <span className="text-white font-semibold">
                    interlocuteur unique
                  </span>{" "}
                  qui voit votre site comme un outil business, pas comme une
                  livrable.
                </p>
              </BlurFade>

              <BlurFade inView delay={0.4}>
                <div className="glass-card border border-purple-500/20 p-5 rounded-2xl">
                  <p className="text-white/80 italic">
                    "Un site mal pensé en amont coûte trois fois plus cher à
                    corriger.{" "}
                    <span className="text-purple-300 font-semibold not-italic">
                      Je le sais parce que j'ai été des deux côtés de la table.
                    </span>
                    "
                  </p>
                </div>
              </BlurFade>
            </div>
          </div>

          {/* Right — stats */}
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
                    <p className="text-white/50 text-sm">{label}</p>
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
                  <p className="font-semibold text-white text-sm lg:text-base">Axel Coudair</p>
                  <p className="text-xs text-white/50 mt-0.5">Développeur & Stratège Web</p>
                  <p className="text-xs text-white/35 leading-relaxed">Basé à Paris, disponible partout en France</p>
                </div>
              </div>
            </BlurFade>
            <BlurFade inView delay={0.7}>
              <div
                className="mt-4 overflow-hidden"
                style={{
                  maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                }}
              >
                <Marquee duration="20s" gap="0px">
                  {logos.map(({ src, alt }) => (
                    <div key={alt} className="px-8">
                      <img
                        src={src}
                        alt={alt}
                        className="h-10 w-auto object-contain opacity-30 grayscale invert"
                      />
                    </div>
                  ))}
                </Marquee>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
