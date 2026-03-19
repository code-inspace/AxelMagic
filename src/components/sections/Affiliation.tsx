import { motion } from "framer-motion";
import { Gift, Share2, Percent, ArrowRight, Users } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BlurFade } from "@/components/magicui/blur-fade";
import { RollButton } from "@/components/ui/RollButton";

const steps = [
  {
    icon: Share2,
    title: "Partagez mon contact",
    description:
      "Présentez-moi à un entrepreneur, une PME ou un indépendant qui cherche un site web.",
    step: "01",
  },
  {
    icon: Users,
    title: "Il devient client",
    description:
      "On échange, on s'entend, on lance le projet. Votre recommandation est notée.",
    step: "02",
  },
  {
    icon: Gift,
    title: "Vous recevez 10%",
    description:
      "Dès la signature du bon de commande, vous touchez 10% du montant du projet.",
    step: "03",
  },
];

export function Affiliation() {
  return (
    <section id="affiliation" className="relative py-32 overflow-hidden">
      {/* Ambient */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 60% 50%, #653ad2, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <BlurFade inView delay={0}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/40" />
            <span className="text-xs text-purple-400 tracking-widest uppercase font-medium px-3 py-1 rounded-full border border-purple-500/20">
              Programme Partenaires
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/40" />
          </div>
        </BlurFade>

        <div className="glass-card border border-white/[0.07] rounded-3xl overflow-hidden">
          {/* Top gradient bar */}
          <div className="h-1 bg-gradient-to-r from-[#2708a0] via-[#653ad2] to-[#8b5cf6]" />

          <div className="p-10 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div>
                <BlurFade inView delay={0.1}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 mb-6">
                    <Percent className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-semibold text-amber-300">
                      Programme d'affiliation
                    </span>
                  </div>
                </BlurFade>

                <BlurFade inView delay={0.2}>
                  <h2 className="text-4xl sm:text-5xl font-poppins font-light leading-tight mb-6">
                    Présentez-moi des clients,{" "}
                    <AuroraText
                      colors={[
                        "#ffffff",
                        "#fbbf24",
                        "#f59e0b",
                        "#fcd34d",
                        "#ffffff",
                      ]}
                    >
                      recevez 10%.
                    </AuroraText>
                  </h2>
                </BlurFade>

                <BlurFade inView delay={0.3}>
                  <p className="text-white/60 text-lg leading-relaxed mb-8">
                    Vous connaissez un entrepreneur, une PME ou un indépendant
                    qui a besoin d'un site ? Mettez-nous en contact. Si le
                    projet aboutit, je vous reverse{" "}
                    <span className="text-white font-semibold">
                      10% du montant total
                    </span>
                    . Simple, transparent, sans conditions.
                  </p>
                </BlurFade>

                <BlurFade inView delay={0.4}>
                  <RollButton
                    href="https://wa.me/message/NUKO2RPNV3BUF1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-7 py-3.5 rounded-full font-semibold text-white transition-all duration-300"
                    style={{ background: "linear-gradient(135deg, #2708a0, #653ad2)" }}
                  >
                    Je connais quelqu'un <ArrowRight className="w-4 h-4" />
                  </RollButton>
                </BlurFade>
              </div>

              {/* Right — 3 steps */}
              <div className="space-y-4">
                {steps.map((step, i) => (
                  <BlurFade key={step.step} inView delay={0.2 + i * 0.12}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="flex items-start gap-5 p-5 glass rounded-2xl border border-white/[0.07] hover:border-purple-500/20 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                        <step.icon className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <span className="text-xs text-purple-400 font-bold tracking-wider">
                          ÉTAPE {step.step}
                        </span>
                        <h3 className="text-white font-bold mt-0.5 mb-1">
                          {step.title}
                        </h3>
                        <p className="text-white/55 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  </BlurFade>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
