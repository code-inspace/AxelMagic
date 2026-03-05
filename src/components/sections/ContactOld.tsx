import { motion } from "framer-motion";
import { Phone, MessageCircle, Calendar, ArrowRight, Clock } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BlurFade } from "@/components/magicui/blur-fade";

const actions = [
  {
    icon: Calendar,
    title: "Audit gratuit de votre site",
    description:
      "Je passe votre site au crible : UX, SEO, performance, conversion. Vous recevez un rapport complet et des recommandations actionnables, gratuitement.",
    cta: "Demander mon audit",
    href: "#",
    badge: "Gratuit",
    badgeColor: "bg-green-500/20 text-green-300 border-green-500/30",
    gradient: "from-purple-500/15 to-blue-500/5",
    primary: true,
  },
  {
    icon: Phone,
    title: "Call découverte",
    description:
      "30 minutes pour parler de votre projet. On cadre ensemble vos besoins, vos objectifs, votre budget. Sans engagement.",
    cta: "Réserver un call",
    href: "#",
    badge: "30 min",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    gradient: "from-blue-500/10 to-purple-500/5",
    primary: false,
  },
  {
    icon: MessageCircle,
    title: "Message WhatsApp",
    description:
      "Une question rapide ? Un projet à me décrire ? Écrivez-moi directement sur WhatsApp. Je réponds dans la journée.",
    cta: "Écrire sur WhatsApp",
    href: "https://wa.me/message/NUKO2RPNV3BUF1",
    badge: "Réponse rapide",
    badgeColor: "bg-green-500/20 text-green-300 border-green-500/30",
    gradient: "from-green-500/10 to-teal-500/5",
    primary: false,
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Big glow */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 60%, #653ad2, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <BlurFade inView delay={0}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/40" />
            <span className="text-xs text-purple-400 tracking-widest uppercase font-medium px-3 py-1 rounded-full border border-purple-500/20">
              Contact
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/40" />
          </div>
        </BlurFade>

        <BlurFade inView delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-poppins font-light leading-tight mb-4">
              Prêt à lancer votre{" "}
              <AuroraText colors={["#ffffff", "#a78bfa", "#653ad2", "#8b5cf6", "#ffffff"]}>
                projet web ?
              </AuroraText>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Choisissez la façon dont vous souhaitez commencer. Pas de commercial, pas de devis impersonnel, on parle directement.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Clock className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">Réponse garantie sous 24h</span>
            </div>
          </div>
        </BlurFade>

        <div className="grid md:grid-cols-3 gap-5">
          {actions.map((action, i) => (
            <BlurFade key={action.title} inView delay={0.15 + i * 0.1}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`group relative glass-card border transition-all duration-400 rounded-2xl overflow-hidden flex flex-col h-full ${
                  action.primary
                    ? "border-purple-500/30 hover:border-purple-500/50"
                    : "border-white/[0.07] hover:border-purple-500/20"
                }`}
              >
                {/* Hover gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Primary badge */}
                {action.primary && (
                  <div className="absolute top-4 right-4">
                    <span className="text-xs font-bold text-purple-300 bg-purple-500/20 border border-purple-500/30 px-2 py-0.5 rounded-full">
                      Recommandé
                    </span>
                  </div>
                )}

                <div className="relative z-10 p-7 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-5 group-hover:bg-purple-500/20 transition-colors duration-300">
                    <action.icon className="w-6 h-6 text-purple-400" />
                  </div>

                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border mb-3 w-fit ${action.badgeColor}`}>
                    {action.badge}
                  </span>

                  <h3 className="text-lg font-bold text-white mb-3">{action.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed flex-1">{action.description}</p>

                  <a
                    href={action.href}
                    target={action.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className={`mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      action.primary
                        ? "text-white glow-primary-sm"
                        : "glass border border-white/10 text-white hover:border-purple-500/30"
                    }`}
                    style={action.primary ? { background: "linear-gradient(135deg, #2708a0, #653ad2)" } : {}}
                  >
                    {action.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            </BlurFade>
          ))}
        </div>

        {/* Urgency note */}
        <BlurFade inView delay={0.5}>
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass border border-amber-500/20">
              <span className="text-amber-400 text-sm">⚡</span>
              <span className="text-sm text-white/60">
                Plus que{" "}
                <span className="text-amber-300 font-bold">2 places disponibles</span>{" "}
                ce mois-ci, les projets sérieux passent vite.
              </span>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
