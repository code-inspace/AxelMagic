import { ExternalLink } from "lucide-react";
import posthog from "posthog-js";
import { RollButton } from "@/components/ui/RollButton";
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
      "/images/withstellie/ws.mov",
      "/images/withstellie/cover.png",
    ],
    content: (
      <ProjectContent
        description={`Chrystel accompagne des femmes et des personnes queer à se réinventer en profondeur. Son ancienne présence en ligne ne rendait pas justice à la puissance de sa méthode. Le site existait, mais il ne convertissait pas, ne rassurait pas, et n'inspirait pas confiance au premier regard.
L'objectif était clair : construire une expérience digitale à la hauteur de la transformation qu'elle propose. Plus premium, plus crédible, plus mémorable, et visible sur Google dans les deux langues.
Nouveau design immersif et cinématique, refonte complète du copywriting FR/EN, intégration d'un CMS pour une autonomie totale, SEO structuré dès le code, booking en ligne sans friction, et une direction artistique cohérente du loader à la dernière section. Chaque décision a été prise avec un seul critère : est-ce que ça donne envie de travailler avec elle ?
Le résultat est un site qui capte, qui rassure et qui convertit.

SEO & Visibilité
Chaque page est construite pour être comprise par Google dès le premier crawl. Balises title et meta descriptions personnalisées par page, données structurées JSON-LD pour renforcer la crédibilité du site auprès des moteurs de recherche, URLs propres et cohérentes en français et en anglais, structure sémantique HTML irréprochable. Le site est indexable dans les deux langues sans duplication de contenu, ce qui multiplie la surface de visibilité organique.

Design & Expérience Visuelle
Le site s'ouvre sur un loader animé qui installe l'ambiance avant même que le contenu apparaisse. Palette organique terracotta, crème et rouille, typographie à fort contraste, sections plein écran immersives. Chaque transition au scroll est orchestrée avec GSAP, la librairie d'animation de référence utilisée par les plus grands studios créatifs. Le résultat : une navigation qui ressemble à un voyage, pas à une consultation de catalogue.

Headless CMS, Sanity
Stellie gère 100% de son contenu seule, sans toucher à une ligne de code. Textes, images, offres, témoignages : tout se modifie depuis une interface simple et intuitive, comme un Google Docs pensé pour un site web. Le site est bilingue FR/EN, et chaque modification se répercute instantanément dans les deux langues. Plus besoin de passer par un développeur pour mettre à jour une phrase ou changer une photo.

Performances Techniques
Les images sont optimisées et chargées à la demande, les animations sont nettoyées proprement en mémoire, et le code est découpé par page pour ne charger que ce dont l'utilisateur a besoin. Le tout est déployé sur une infrastructure mondiale qui garantit un temps de chargement rapide depuis n'importe où. Un site lent perd ses visiteurs en moins de 3 secondes, celui-ci ne se permet pas cette erreur.

Internationalisation
Le site est entièrement bilingue FR/EN, avec une bascule fluide entre les deux langues sans rechargement de page. Chaque URL, chaque balise SEO, chaque bloc de contenu existe dans sa version française et anglaise. Une nécessité pour un coaching qui s'adresse aussi bien à une clientèle francophone qu'anglophone, sans jamais donner l'impression d'une traduction approximative.

Booking & Conversion
La prise de rendez-vous est intégrée directement dans le site via Cal.com, sans redirection vers une page externe. Le calendrier s'affiche dans l'univers visuel du site, sans rupture d'expérience. Résultat : le passage de "je suis intéressée" à "j'ai un créneau réservé" se fait en quelques secondes, sans friction.`}
        tags={[
          "React",
          "TypeScript",
          "GSAP",
          "Sanity CMS",
          "Vite",
          "i18n",
          "Tailwind CSS"
        ]}
        link="https://withstellie-co.vercel.app/"
        title="WithStellie.co, Chrystel Bruce"
      />
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
