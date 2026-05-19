import {
  ExternalLink,
  Target,
  MousePointerClick,
  Edit3,
  Zap,
  Calendar,
  Paintbrush,
  Sparkles,
} from "lucide-react"; 
import posthog from "posthog-js";
import { RollButton } from "@/components/ui/RollButton";
import { CompareGallery } from "@/components/ui/CompareGallery";
import { ReactNode } from "react";

export interface CardData {
  id: string;
  category: string;
  title: string;
  background?: string;
  image?: string;
  gallery?: string[];
  content: ReactNode;
}

export function ProjectContent({
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
      <p className="text-white text-sm leading-relaxed whitespace-pre-line">
        {description}
      </p>
      {(context || result) && (
        <div className="grid sm:grid-cols-2 gap-5">
          {context && (
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Contexte
              </h4>
              <p className="text-white text-sm leading-relaxed">{context}</p>
            </div>
          )}
          {result && (
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
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
            className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white"
          >
            {tag}
          </span>
        ))}
      </div>
      {link && (
        <RollButton
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            posthog.capture("project_link_click", { project: title, url: link })
          }
          className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300"
          style={{ background: "linear-gradient(135deg, #2708a0, #653ad2)" }}
        >
          Consulter le site live <ExternalLink className="w-3.5 h-3.5" />
        </RollButton>
      )}
    </div>
  );
}

export const projects: CardData[] = [
  {
    id: "withstellie",
    category: "React · TypeScript · GSAP · Sanity · i18n · SEO",
    title: "WithStellie.co, Chrystel Bruce",
    image: "/images/withstellie/ws.mov",
    gallery: [
      "/images/withstellie/withstellie1.png",
      "/images/withstellie/withstellie3.png",
      "/images/withstellie/withstellie7.png",
      "/images/withstellie/withstellie10.png",
      "/images/withstellie/withstellie11.png",
      "/images/withstellie/withstellie12.png",
    ],
    content: (
      <div className="space-y-12">
        {/* Hook */}
        <div className="relative">
          <p className="text-white text-lg sm:text-xl font-light leading-relaxed">
            Chrystel accompagne ses clients à se réinventer en profondeur. Elle
            avait besoin d'une présence en ligne à la hauteur de la
            transformation qu'elle propose.
          </p>
          <p className="text-white text-lg sm:text-xl font-light leading-relaxed">
            Les objectifs du chantier : traduire
            son univers organique et chaleureux, terracotta, crème et rouille,
            en une expérience visuelle immersive et premium, structurer un
            funnel de conversion fluide de la découverte à la réservation,
            intégrer un système de gestion de contenu pour une autonomie totale,
            déployer un SEO bilingue FR/EN dès le code, et poser une direction
            artistique cohérente du loader à la dernière section, sans jamais
            trahir l'identité qu'elle avait déjà construite.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "React",
              "TypeScript",
              "GSAP",
              "Sanity CMS",
              "Vite",
              "i18n",
              "Tailwind CSS",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Before / After comparisons */}
        <CompareGallery
          tabs={[
            {
              id: "design",
              label: "Design",
              title: "Refonte visuelle complète",
              icon: <Paintbrush className="w-5 h-5" />,
              left: "/images/withstellie/compare/design/left.png",
              right: "/images/withstellie/compare/design/right.png",
              leftLabel: "Avant",
              rightLabel: "Après",
              description:
                "Côté ergonomie, les offres sont désormais présentées à l'horizontale sur desktop. Une véritable emphase est mise sur l'offre de milieu de gamme afin d'instaurer une meilleure hiérarchie visuelle et de faciliter la comparaison pour l'utilisateur."
            },
            {
              id: "sanity",
              label: "Contenu autonome",
              title: "Gestion de contenu autonome",
              icon: <Edit3 className="w-5 h-5" />,
              left: "/images/withstellie/compare/sanity/right.png",
              right: "/images/withstellie/compare/sanity/left.png",
              leftLabel: "Gestion de contenu",
              rightLabel: "Site",
              description:
                "Stellie gère 100% de son contenu seule depuis le système de gestion de contenu Sanity : textes, images, offres et témoignages dans les deux langues, sans toucher à une ligne de code.",
            },
            {
              id: "logo",
              label: "Logo",
              title: "Nouvelle identité de marque",
              icon: <Sparkles className="w-5 h-5" />,
              left: "/images/withstellie/compare/logo/left.png",
              right: "/images/withstellie/compare/logo/right.png",
              leftLabel: "Avant",
              rightLabel: "Après",
              description:
                "Refonte complète de l'identité de marque. Le nouveau logo reflète le positionnement premium de WithStellie.co.",
            },
            {
              id: "closing",
              label: "Conversion",
              title: "Prise de rendez-vous intégrée",
              icon: <Calendar className="w-5 h-5" />,
              left: "/images/withstellie/compare/closing/left.png",
              right: "/images/withstellie/compare/closing/right.png",
              leftLabel: "Avant",
              rightLabel: "Après",
              description:
                "Intégration Cal.com directement dans l'univers visuel du site. Le passage de « je suis intéressée » à « j'ai un créneau réservé » se fait en quelques secondes, sans friction.",
            },
          ]}
        />
        {/* Grid Bento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#0E0F11] border border-white/[0.05] p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/5 rounded-lg text-white">
                <Edit3 className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                Gestion de contenu autonome
              </h4>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Stellie gère 100% de son contenu seule depuis Sanity CMS : textes,
              images, offres et témoignages dans les deux langues, sans toucher
              à une ligne de code. Une autonomie totale, pensée dès l'architecture,
              pour que le site reste vivant longtemps après la livraison.
            </p>
          </div>

          <div className="bg-[#0E0F11] border border-white/[0.05] p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/5 rounded-lg text-white">
                <MousePointerClick className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                Design & Expérience Visuelle
              </h4>
            </div>
            <p className="text-white text-sm leading-relaxed mb-4">
              Refonte complète de l'identité visuelle : en partant de la palette organique terracotta et crème existante, nous avons intégré une typographie à fort contraste, des sections plein écran immersives et une image de marque premium. L'objectif : passer d'un site générique à une expérience de marque cohérente et mémorable. Chaque transition au scroll est orchestrée avec GSAP, la librairie d'animation privilégiée par les plus grands studios créatifs. Le résultat : une navigation qui immerge les visiteurs dans la méthode de Chrystel et dans son histoire.</p>
          </div>

          <div className="bg-[#0E0F11] border border-white/[0.05] p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/5 rounded-lg text-white">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                SEO & Visibilité
              </h4>
            </div>
            <p className="text-white text-sm leading-relaxed mb-4">
              Chaque page est construite pour être comprise par Google dès le
              premier crawl. Balises title et meta descriptions personnalisées
              par page, données structurées JSON-LD pour renforcer la
              crédibilité du site auprès des moteurs de recherche, URLs propres
              et cohérentes en français et en anglais, structure sémantique HTML
              irréprochable. Le site est indexable dans les deux langues sans
              duplication de contenu.
            </p>
          </div>

          <div className="bg-[#0E0F11] border border-white/[0.05] p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/5 rounded-lg text-white">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                Performances Techniques
              </h4>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Les images sont optimisées et chargées à la demande, les
              animations sont nettoyées proprement en mémoire, et le code est
              découpé par page pour ne charger que ce dont l'utilisateur a
              besoin. Le tout est déployé sur une infrastructure mondiale qui
              garantit un temps de chargement rapide depuis n'importe où. Un
              site lent perd ses visiteurs en moins de 3 secondes, celui-ci ne
              se permet pas cette erreur.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div>
          <RollButton
            href="https://withstellie-co.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              posthog.capture("project_link_click", {
                project: "WithStellie.co",
                url: "https://withstellie-co.vercel.app/",
              })
            }
            className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg shadow-purple-900/20"
            style={{ background: "linear-gradient(135deg, #2708a0, #653ad2)" }}
          >
            Consulter le site live <ExternalLink className="w-4 h-4 ml-2" />
          </RollButton>
        </div>
      </div>
    ),
  },
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
    category: "Design · Webflow · SEO",
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
        tags={["Design", "Webflow", "SEO"]}
        link="https://lucasfit.webflow.io/"
        title="LucasFit"
      />
    ),
  },
  {
    id: "adn-paris",
    category: "WordPress · UI Design · SEO",
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
          "ADN Paris accompagne les personnes LGBT dans leur insertion sociale à travers des cours de danse, des ateliers et des événements communautaires à Paris.\n\nProjet pris en charge de A à Z : direction artistique, développement WordPress sur-mesure, SEO on-page. Le design a été construit autour d'une palette chaleureuse et d'une mise en page claire, pour que le site soit accessible et accueillant dès le premier regard, en cohérence avec les valeurs de l'association.\n\nConçu pour rendre l'association visible auprès des personnes qui cherchent ce type d'accompagnement à Paris, dès la mise en ligne."
        }
        tags={["WordPress", "UI Design", "SEO"]}
      />
    ),
  },
];
