import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Calendar, Tag } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BlurFade } from "@/components/magicui/blur-fade";

const projects = [
  {
    id: 1,
    name: "Lucafit",
    client: "Lucas Ménard, Coach sportif",
    date: "Décembre 2024",
    description:
      "Site vitrine et plateforme de coaching en ligne pour un coach sportif parisien. Refonte complète de l'identité visuelle, création d'un parcours utilisateur pensé pour convertir les visiteurs en clients, avec intégration Calendly et tunnel de réservation.",
    context:
      "Lucas avait un site WordPress vieillissant qui ne reflétait plus son positionnement premium. Il perdait des clients au profit de concurrents mieux positionnés en ligne.",
    tags: ["Développement web", "UI Design", "UX Design", "SEO"],
    link: "#",
    color: "from-orange-500/20 to-red-500/10",
    accent: "#f97316",
    result: "+180% de prise de RDV en ligne",
  },
  {
    id: 2,
    name: "ADN Paris",
    client: "ADN Paris, Agence immobilière",
    date: "Octobre 2024",
    description:
      "Site vitrine haut de gamme pour une agence immobilière parisienne spécialisée dans le prestige. Design épuré et luxueux, système de filtres avancés pour les biens, intégration CRM et lead generation optimisée.",
    context:
      "ADN Paris souhaitait se différencier des grands portails immobiliers avec une identité forte et un site qui reflète le caractère exclusif de leurs biens.",
    tags: ["Développement web", "UI Design", "UX Design", "Stratégie digitale"],
    link: "#",
    color: "from-blue-500/20 to-indigo-500/10",
    accent: "#6366f1",
    result: "+240% de leads qualifiés",
  },
];

export function Portfolio() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);

  const tagColors: Record<string, string> = {
    "Développement web": "bg-purple-500/20 text-purple-300 border-purple-500/30",
    "UI Design": "bg-pink-500/20 text-pink-300 border-pink-500/30",
    "UX Design": "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "SEO": "bg-green-500/20 text-green-300 border-green-500/30",
    "Stratégie digitale": "bg-amber-500/20 text-amber-300 border-amber-500/30",
  };

  return (
    <section id="realisations" className="relative py-32 overflow-hidden">
      {/* Ambient */}
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[400px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #653ad2, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <BlurFade inView delay={0}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/40" />
            <span className="text-xs text-purple-400 tracking-widest uppercase font-medium px-3 py-1 rounded-full border border-purple-500/20">
              Réalisations
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/40" />
          </div>
        </BlurFade>

        <BlurFade inView delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-poppins font-light leading-tight mb-4">
              Des sites qui{" "}
              <AuroraText colors={["#ffffff", "#a78bfa", "#653ad2", "#8b5cf6", "#ffffff"]}>
                parlent d'eux-mêmes
              </AuroraText>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Chaque projet est unique. Voici deux exemples concrets de ce que je peux réaliser.
            </p>
          </div>
        </BlurFade>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <BlurFade key={project.id} inView delay={0.2 + i * 0.15}>
              <motion.div
                layoutId={`project-${project.id}`}
                onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
                className="group glass-card border border-white/[0.07] hover:border-purple-500/25 transition-all duration-500 rounded-2xl overflow-hidden cursor-pointer"
                whileHover={{ y: -2 }}
              >
                {/* Top bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${project.color.replace("/20", "").replace("/10", "")}`}
                  style={{ background: `linear-gradient(to right, ${project.accent}80, transparent)` }}
                />

                <div className="p-7">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                    {/* Project number */}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shrink-0"
                      style={{ background: `${project.accent}20`, border: `1px solid ${project.accent}30`, color: project.accent }}
                    >
                      0{project.id}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="text-2xl font-bold text-white">{project.name}</h3>
                          <p className="text-white/50 text-sm mt-1">{project.client}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1.5 text-xs text-white/40">
                            <Calendar className="w-3.5 h-3.5" />
                            {project.date}
                          </span>
                          <motion.div
                            animate={{ rotate: activeProject === project.id ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center"
                          >
                            <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </motion.div>
                        </div>
                      </div>

                      <p className="text-white/60 text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${tagColors[tag] || "bg-white/5 text-white/60 border-white/10"}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {activeProject === project.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 border-t border-white/[0.07] mt-6 grid sm:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-2">Contexte</h4>
                            <p className="text-white/65 text-sm leading-relaxed">{project.context}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-2">Résultat</h4>
                            <div
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
                              style={{ background: `${project.accent}20`, color: project.accent }}
                            >
                              <span>📈</span>
                              {project.result}
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                          <a
                            href={project.link}
                            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300"
                            style={{ background: `linear-gradient(135deg, #2708a0, #653ad2)` }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            Voir le projet
                            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
