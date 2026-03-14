import { useState, useEffect } from "react";
import { ExternalLink, X } from "lucide-react";
import posthog from "posthog-js";
import { motion, AnimatePresence } from "framer-motion";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BlurFade } from "@/components/magicui/blur-fade";
import { CardData } from "@/components/ui/apple-cards-carousel";

function ProjectContent({
  description,
  context,
  result,
  tags,
  link,
  title,
}: {
  description: string;
  context?: string;
  result?: string;
  tags: string[];
  link?: string;
  title?: string;
}) {
  return (
    <div className="space-y-6">
      <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line">{description}</p>
      {(context || result) && (
        <div className="grid sm:grid-cols-2 gap-5">
          {context && (
            <div>
              <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                Contexte
              </h4>
              <p className="text-white/65 text-sm leading-relaxed">{context}</p>
            </div>
          )}
          {result && (
            <div>
              <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                Résultat
              </h4>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-white/10 text-white"
              >
                <span>📈</span>
                {result}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/60"
          >
            {tag}
          </span>
        ))}
      </div>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => posthog.capture("project_link_click", { project: title, url: link })}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300"
          style={{ background: "linear-gradient(135deg, #2708a0, #653ad2)" }}
        >
          Voir le projet
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  );
}

function CardModal({ card, onClose }: { card: CardData; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none">
        <motion.div
          layoutId={`portfolio-card-${card.id}`}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl pointer-events-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div
            className="h-64 relative overflow-hidden rounded-t-3xl flex-shrink-0 bg-[#141416]"
          >
            {card.image && (
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
            <div className="absolute bottom-6 left-7">
              <p className="text-[10px] text-white/60 uppercase tracking-widest mb-2">
                {card.category}
              </p>
              <h3 className="text-2xl font-poppins font-light text-white leading-tight">
                {card.title}
              </h3>
            </div>
          </div>
          <div className="bg-[#0E0F11] rounded-b-3xl border border-white/[0.07] border-t-0 p-7">
            {card.content}
            {card.gallery && card.gallery.length > 0 && (
              <div className="mt-8">
                <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">
                  Aperçu
                </h4>
                <div className="space-y-3">
                  {card.gallery.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`${card.title} screenshot ${i + 1}`}
                      className="w-full rounded-xl border border-white/[0.07] object-cover"
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}

const cards: CardData[] = [
  {
    id: "lucafit",
    category: "Figma · Webflow · SEO",
    title: "LucasFit",
    image: "/images/Lucassanchez/Preview/lucas fit preview.jpeg",
    gallery: [
      "/images/Lucassanchez/lucafit1.png",
      "/images/Lucassanchez/lucafit2.png",
      "/images/Lucassanchez/lucafit3.png",
      "/images/Lucassanchez/lucafit4.png",
    ],
    content: (
      <ProjectContent
        description={"LucasFit est un projet fictif conçu comme une étude de cas autour de la mise en valeur d'un coach sportif personnel. L'objectif était de construire un site qui transmette de l'énergie et donne envie de passer à l'action.\n\nLe site a été développé sur Webflow avec un parti pris graphique assumé : sections en biais, éléments légèrement inclinés, mise en page qui sort de la grille. Rien n'est parfaitement droit, et c'est voulu : cette tension visuelle invite au mouvement plutôt qu'à la lecture passive.\n\nLe choix du noir, blanc et rouge vif repose sur une logique de contraste fort. Le noir et blanc posent une base sérieuse et percutante. Le rouge vient cibler l'attention sur les éléments clés : appels à l'action, chiffres, titres. C'est une combinaison qui marque et qui reste en tête.\n\nLe SEO a été intégré avec une structure sémantique soignée, des balises title et meta optimisées, et une hiérarchie de contenus orientée vers les recherches liées au coaching sportif."}
        tags={["Figma", "Webflow", "SEO"]}
        link="https://lucasfit.webflow.io/"
        title="LucasFit"
      />
    ),
  },
  {
    id: "adn-paris",
    category: "WordPress · Figma · UI Design · SEO",
    title: "ADN Paris",
    image: "/images/ADN/Preview/adn-preview.jpg",
    gallery: [
      "/images/ADN/hero.png",
      "/images/ADN/content 1.png",
      "/images/ADN/content 2.png",
      "/images/ADN/content3 & footer.png",
    ],
    content: (
      <ProjectContent
        description={"ADN Paris est une association parisienne qui accompagne les personnes LGBT dans leur insertion sociale à travers des cours de danse, des ateliers et des événements communautaires.\n\nJ'ai pris en charge le projet de A à Z : conception de la maquette sur Figma, puis développement sous WordPress. Le design a été construit autour d'une palette chaleureuse et d'une mise en page claire, pour que le site soit accessible et accueillant dès le premier regard, en accord avec les valeurs de l'association.\n\nJ'ai également travaillé le SEO : structure des pages, balises title et meta, hiérarchie des contenus. L'objectif était de rendre l'association visible auprès des personnes qui cherchent ce type d'accompagnement à Paris."}
        tags={["WordPress", "Figma", "UI Design", "SEO"]}
      />
    ),
  },
];

export function Portfolio2() {
  const [activeCard, setActiveCard] = useState<CardData | null>(null);

  return (
    <section id="realisations" className="relative py-32 overflow-hidden">
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[400px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #653ad2, transparent 70%)" }}
      />

      <AnimatePresence>
        {activeCard && (
          <CardModal card={activeCard} onClose={() => setActiveCard(null)} />
        )}
      </AnimatePresence>

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
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-poppins font-light leading-tight mb-4">
              Des sites qui{" "}
              <AuroraText colors={["#ffffff", "#a78bfa", "#653ad2", "#8b5cf6", "#ffffff"]}>
                parlent d'eux-mêmes
              </AuroraText>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Cliquez sur un projet pour découvrir les détails.
            </p>
          </div>
        </BlurFade>

        {/* 2-column grid, full width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cards.map((card, i) => (
            <BlurFade key={card.id} inView delay={0.15 + i * 0.1}>
              <motion.div
                layoutId={`portfolio-card-${card.id}`}
                onClick={() => { setActiveCard(card); posthog.capture("project_open", { project: card.title }); }}
                whileHover={{ scale: activeCard?.id === card.id ? 1 : 1.02, y: activeCard?.id === card.id ? 0 : -4 }}
                transition={{ duration: 0.25 }}
                className="relative w-full h-[420px] rounded-3xl overflow-hidden cursor-pointer select-none"
                style={{
                  opacity: activeCard?.id === card.id ? 0 : 1,
                  pointerEvents: activeCard?.id === card.id ? "none" : "auto",
                }}
              >
                {card.image && (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/75" />
                <div className="absolute bottom-7 left-7 right-7">
                  <p className="text-[10px] text-white/60 uppercase tracking-widest mb-2">
                    {card.category}
                  </p>
                  <h3 className="text-xl font-poppins font-light text-white leading-snug">
                    {card.title}
                  </h3>
                </div>
              </motion.div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
