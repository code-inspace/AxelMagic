import { motion } from "framer-motion";
import { Monitor, ShoppingCart, Database, Layers, Zap, Search, Smartphone, TrendingUp } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BlurFade } from "@/components/magicui/blur-fade";

const services = [
  {
    icon: Monitor,
    title: "Site Vitrine",
    description: "Votre carte de visite en ligne. Design sur-mesure, performance maximale, pensé pour convertir les visiteurs en clients.",
    gradient: "from-purple-500/20 to-blue-500/10",
    tags: ["Design UI/UX", "SEO", "Responsive"],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "Une boutique en ligne performante et intuitive. Tunnel d'achat optimisé, intégration paiement, gestion des stocks.",
    gradient: "from-violet-500/20 to-purple-500/10",
    tags: ["Stripe", "Analytics"],
  },
  {
    icon: Database,
    title: "Back Office",
    description: "Interface d'administration sur-mesure pour gérer votre activité. Tableaux de bord, CRM, automatisations.",
    gradient: "from-blue-500/20 to-cyan-500/10",
    tags: ["Admin", "API", "Données"],
  },
  {
    icon: Layers,
    title: "Application Web",
    description: "Application web complexe, SaaS, plateforme métier. Architecture solide, UX soignée, scalabilité.",
    gradient: "from-pink-500/20 to-purple-500/10",
    tags: ["React", "Next.js", "Node.js"],
  },
];


export function Services() {
  return (
    <section id="services" className="relative py-16 lg:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #8b5cf6, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <BlurFade inView delay={0}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/40" />
            <span className="text-xs text-purple-400 tracking-widest uppercase font-medium px-3 py-1 rounded-full border border-purple-500/20">
              Expertises
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/40" />
          </div>
        </BlurFade>

        <BlurFade inView delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-poppins font-light leading-tight mb-4">
              Ce que je{" "}
              <AuroraText colors={["#ffffff", "#a78bfa", "#653ad2", "#8b5cf6", "#ffffff"]}>
                réalise pour vous
              </AuroraText>
            </h2>
            <p className="text-white text-lg max-w-xl mx-auto">
              Du site vitrine à l'application web complexe, une expertise complète au service de votre croissance.
            </p>
          </div>
        </BlurFade>

        {/* Bento-style grid */}
        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {services.map((service, i) => (
            <BlurFade key={service.title} inView delay={0.15 + i * 0.1}>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group relative glass-card border border-white/[0.07] hover:border-purple-500/30 transition-all duration-500 p-7 rounded-2xl overflow-hidden"
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-5 group-hover:bg-purple-500/20 transition-colors duration-300">
                    <service.icon className="w-6 h-6 text-purple-400" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-white leading-relaxed text-sm mb-5">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white"
                      >
                        {tag}
                      </span>
                    ))}
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
