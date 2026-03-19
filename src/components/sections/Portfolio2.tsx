import { ExternalLink } from "lucide-react";
import posthog from "posthog-js";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  AppleCardsCarousel,
  CardData,
} from "@/components/ui/apple-cards-carousel";

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
      <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line">
        {description}
      </p>
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-white/10 text-white">
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
          onClick={() =>
            posthog.capture("project_link_click", { project: title, url: link })
          }
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300"
          style={{ background: "linear-gradient(135deg, #2708a0, #653ad2)" }}
        >
          Consulter le site live
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  );
}

const cards: CardData[] = [
  {
    id: "calea",
    category: "React · Tailwind · GSAP · SEO",
    title: "Caléa, Resort Provençal",
    image: "/images/calea/video-calea.mov",
    gallery: [
      "/images/calea/video-calea.mov",
      "/images/calea/screen/screen2.png",
      "/images/calea/screen/screen4.png",
    ],
    content: (
      <ProjectContent
        description={
          "Site vitrine luxury pour un resort sur la Côte d'Azur. Conçu pour convertir un visiteur en réservation, pas juste en impression.\n\nProjet pris en charge de A à Z : direction artistique, architecture technique, stratégie SEO. L'objectif était de créer une expérience web à la hauteur d'un positionnement premium, immersive dès les premières secondes, performante pour les moteurs de recherche.\n\nDirection artistique. Palette vert profond et crème pierre provençale, minimaliste par choix, pour laisser toute la place aux visuels grand format. Entrée par une arche vidéo au chargement, timeline narrative au scroll, galerie parallax horizontale, transitions chromatiques entre sections. Un rendu cinématique pensé pour transmettre l'atmosphère avant même que le visiteur lise une ligne.\n\nPerformance & SEO. Architecture sémantique soignée, balises uniques par page, maillage interne structuré, contenu multilingue pour capter le trafic international. Temps de chargement optimisé via Vite et lazy loading."
        }
        tags={[
          "React",
          "Vite",
          "Tailwind CSS",
          "GSAP",
          "Leaflet",
          "react-helmet-async",
        ]}
        link="https://calea-blush.vercel.app/"
        title="Caléa, Resort Provençal"
      />
    ),
  },
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
        description={
          "LucasFit est une étude de cas autour d'un brief simple : construire un site qui transmet de l'énergie et pousse à l'action sans passer par une longue lecture.\n\nLe site a été développé sur Webflow avec un parti pris graphique assumé : sections en biais, mise en page qui sort de la grille, contraste noir, blanc et rouge vif. La tension visuelle est voulue : elle invite au mouvement plutôt qu'à la lecture passive.\n\nSEO intégré dès la conception : structure sémantique, balises title et meta optimisées, hiérarchie de contenus orientée coaching sportif."
        }
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
        description={
          "ADN Paris accompagne les personnes LGBT dans leur insertion sociale à travers des cours de danse, des ateliers et des événements communautaires à Paris.\n\nProjet pris en charge de A à Z : maquette sur Figma, développement WordPress sur-mesure, SEO on-page. Le design a été construit autour d'une palette chaleureuse et d'une mise en page claire, pour que le site soit accessible et accueillant dès le premier regard, en cohérence avec les valeurs de l'association.\n\nConçu pour rendre l'association visible auprès des personnes qui cherchent ce type d'accompagnement à Paris, dès la mise en ligne."
        }
        tags={["WordPress", "Figma", "UI Design", "SEO"]}
      />
    ),
  },
];

export function Portfolio2() {
  return (
    <section id="realisations" className="relative py-32 overflow-hidden">
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[400px] rounded-full opacity-[0.06] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, #653ad2, transparent 70%)",
        }}
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
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-poppins font-light leading-tight mb-4">
              Des sites qui{" "}
              <AuroraText
                colors={["#ffffff", "#a78bfa", "#653ad2", "#8b5cf6", "#ffffff"]}
              >
                parlent d'eux-mêmes
              </AuroraText>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Cliquez sur un projet pour découvrir les détails.
            </p>
          </div>
        </BlurFade>

        <AppleCardsCarousel cards={cards} />
      </div>
    </section>
  );
}
