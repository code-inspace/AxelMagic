import { motion } from "framer-motion";
import { Search, Zap, Target, TrendingUp, Code, Eye } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BlurFade } from "@/components/magicui/blur-fade";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { MorphingText } from "@/components/magicui/morphing-text";

const pillars = [
  {
    icon: Search,
    title: "SEO On-page & Technique",
    description:
      "Vos pages sont structurées pour apparaître sur les requêtes de vos clients potentiels. Balises, maillage interne, données structurées, rien n'est laissé au hasard.",
    metric: "3×",
    metricLabel: "plus de trafic organique",
  },
  {
    icon: Zap,
    title: "Performance & Core Web Vitals",
    description:
      "Un site lent fait fuir. Je m'assure que le vôtre charge en un éclair. Score Lighthouse optimisé, images compressées, code allégé.",
    metric: "98",
    metricLabel: "score Lighthouse moyen",
  },
  {
    icon: Target,
    title: "UX orientée conversion",
    description:
      "Chaque élément est placé pour guider naturellement l'utilisateur vers l'action que vous attendez de lui : appel, devis, achat.",
    metric: "+65%",
    metricLabel: "taux de conversion",
  },
  {
    icon: TrendingUp,
    title: "Évolutif & Maintenable",
    description:
      "Votre site grandit avec vous. Technologies modernes, code propre, documentation. Vous restez maître de votre outil.",
    metric: "∞",
    metricLabel: "évolutivité",
  },
];

export function SeoSection() {
  return (
    <section id="seo" className="relative py-32 overflow-hidden">
      {/* Decorative elements */}
      <div
        className="absolute top-1/2 right-0 w-[400px] h-[600px] -translate-y-1/2 opacity-[0.07] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at right, #653ad2, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <BlurFade inView delay={0}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/40" />
            <span className="text-xs text-purple-400 tracking-widest uppercase font-medium px-3 py-1 rounded-full border border-purple-500/20">
              Performance
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/40" />
          </div>
        </BlurFade>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <BlurFade inView delay={0.1}>
            <div>
              <h2 className="text-4xl sm:text-5xl font-poppins font-light leading-tight mb-6">
                Je ne fais pas que des sites{" "}
                <AuroraText colors={["#ffffff", "#a78bfa", "#653ad2", "#8b5cf6", "#ffffff"]}>
                  beaux.
                </AuroraText>
              </h2>

              <div className="space-y-4 text-white/65 text-lg leading-relaxed">
                <p>
                  <span className="text-white font-semibold">Un site invisible, c'est un site inutile.</span>
                </p>
                <p>
                  Un design soigné, c'est le minimum. Ce qui fait vraiment la différence, c'est un site que{" "}
                  <span className="text-purple-300">Google trouve</span>, que vos visiteurs comprennent, et qui les{" "}
                  <span className="text-purple-300">pousse à agir</span>.
                </p>
              </div>

              {/* Morphing text */}
              <div className="mt-8 p-5 glass-card border border-purple-500/20 rounded-2xl">
                <p className="text-xs text-white/40 mb-2 uppercase tracking-wider">Ce que je fais concrètement</p>
                <div className="text-xl font-bold text-white">
                  <MorphingText
                    texts={[
                      "Optimiser votre SEO",
                      "Booster vos conversions",
                      "Accélérer votre site",
                      "Structurer vos pages",
                      "Attirer vos clients",
                    ]}
                  />
                </div>
              </div>
            </div>
          </BlurFade>

          {/* Visual — site performance mockup */}
          <BlurFade inView delay={0.3}>
            <div className="glass-card border border-white/[0.07] rounded-2xl overflow-hidden p-6">
              {/* Fake browser bar */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/[0.07]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/60" />
                  <div className="w-3 h-3 rounded-full bg-green-400/60" />
                </div>
                <div className="flex-1 mx-3 h-7 rounded-lg glass border border-white/10 flex items-center px-3">
                  <span className="text-xs text-white/30">votre-site.fr</span>
                </div>
              </div>

              {/* Performance scores */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: "Performance", score: 98, color: "#22c55e" },
                  { label: "SEO", score: 100, color: "#a78bfa" },
                  { label: "Accessibilité", score: 95, color: "#60a5fa" },
                  { label: "Meilleures pratiques", score: 100, color: "#f59e0b" },
                ].map(({ label, score, color }) => (
                  <div key={label} className="glass p-3 rounded-xl border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-white/50">{label}</span>
                      <span className="text-sm font-bold" style={{ color }}>{score}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Load time */}
              <div
                className="flex items-center justify-between p-4 rounded-xl"
                style={{ background: "linear-gradient(135deg, #22c55e10, #22c55e05)" }}
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-white/70">Temps de chargement</span>
                </div>
                <span className="font-bold text-green-400">
                  &lt; 1.2s
                </span>
              </div>
            </div>
          </BlurFade>
        </div>

        {/* 4 pillars grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {pillars.map((pillar, i) => (
            <BlurFade key={pillar.title} inView delay={0.1 + i * 0.1}>
              <motion.div
                whileHover={{ y: -3 }}
                className="glass-card border border-white/[0.07] hover:border-purple-500/25 transition-all duration-400 p-6 rounded-2xl group"
              >
                <div className="flex items-start gap-5">
                  <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 group-hover:bg-purple-500/20 transition-colors duration-300">
                    <pillar.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-2">{pillar.title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed">{pillar.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xl font-black aurora-text">{pillar.metric}</div>
                    <div className="text-xs text-white/30 mt-0.5 max-w-[80px] text-right">{pillar.metricLabel}</div>
                  </div>
                </div>
              </motion.div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
