import { ExternalLink } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BlurFade } from "@/components/magicui/blur-fade";
import { AppleCardsCarousel, CardData } from "@/components/ui/apple-cards-carousel";

function ProjectContent({
  description,
  context,
  result,
  tags,
  accent,
  link,
}: {
  description: string;
  context: string;
  result: string;
  tags: string[];
  accent: string;
  link: string;
}) {
  return (
    <div className="space-y-6">
      <p className="text-white/70 text-sm leading-relaxed">{description}</p>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
            Contexte
          </h4>
          <p className="text-white/65 text-sm leading-relaxed">{context}</p>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
            Résultat
          </h4>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
            style={{ background: `${accent}20`, color: accent }}
          >
            <span>📈</span>
            {result}
          </div>
        </div>
      </div>

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

      <a
        href={link}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300"
        style={{ background: "linear-gradient(135deg, #2708a0, #653ad2)" }}
      >
        Voir le projet
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

function ConfidentialContent({ sector, tags }: { sector: string; tags: string[] }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 p-4 rounded-2xl glass border border-white/10">
        <span className="text-2xl">🔒</span>
        <div>
          <p className="text-white font-medium text-sm">Projet confidentiel</p>
          <p className="text-white/50 text-xs mt-0.5">
            Détails partagés sur demande uniquement
          </p>
        </div>
      </div>
      <div>
        <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
          Secteur
        </h4>
        <p className="text-white/65 text-sm">{sector}</p>
      </div>
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
      <a
        href="#contact"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 glass border border-white/10 hover:border-purple-500/30"
      >
        Me contacter pour en savoir plus
      </a>
    </div>
  );
}

const cards: CardData[] = [
  {
    id: "lucafit",
    category: "Site vitrine · Coaching",
    title: "Lucafit",
    background:
      "linear-gradient(135deg, #f97316 0%, #ef4444 40%, #7c3aed 100%)",
    content: (
      <ProjectContent
        description="Site vitrine et plateforme de coaching pour un coach sportif parisien. Refonte complète de l'identité visuelle, parcours utilisateur pensé pour convertir, intégration Calendly et tunnel de réservation."
        context="Lucas avait un site WordPress vieillissant qui ne reflétait plus son positionnement premium. Il perdait des clients au profit de concurrents mieux positionnés en ligne."
        result="+180% de prise de RDV en ligne"
        tags={["Développement web", "UI Design", "UX Design", "SEO"]}
        accent="#f97316"
        link="#"
      />
    ),
  },
  {
    id: "adn-paris",
    category: "Site vitrine · Immobilier",
    title: "ADN Paris",
    background:
      "linear-gradient(135deg, #6366f1 0%, #4338ca 50%, #1e1b4b 100%)",
    content: (
      <ProjectContent
        description="Site vitrine haut de gamme pour une agence immobilière parisienne spécialisée dans le prestige. Design épuré et luxueux, système de filtres avancés pour les biens, intégration CRM et lead generation optimisée."
        context="ADN Paris souhaitait se différencier des grands portails immobiliers avec une identité forte et un site qui reflète le caractère exclusif de leurs biens."
        result="+240% de leads qualifiés"
        tags={["Développement web", "UI Design", "UX Design", "Stratégie digitale"]}
        accent="#6366f1"
        link="#"
      />
    ),
  },
  {
    id: "restauration",
    category: "E-commerce · Restauration",
    title: "Commande en ligne",
    background:
      "linear-gradient(135deg, #10b981 0%, #059669 50%, #1e3a2f 100%)",
    content: (
      <ConfidentialContent
        sector="Restauration gastronomique — Commande en ligne, gestion des réservations, menu digital interactif."
        tags={["Next.js", "Stripe", "UI Design", "SEO local"]}
      />
    ),
  },
  {
    id: "saas",
    category: "Application web · SaaS",
    title: "Dashboard SaaS",
    background:
      "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 50%, #1e1040 100%)",
    content: (
      <ConfidentialContent
        sector="Plateforme SaaS B2B — Interface d'administration, tableau de bord analytique, gestion des utilisateurs et facturation automatisée."
        tags={["React", "TypeScript", "API REST", "Prisma", "Stripe"]}
      />
    ),
  },
  {
    id: "mode",
    category: "E-commerce · Mode",
    title: "Boutique premium",
    background:
      "linear-gradient(135deg, #ec4899 0%, #db2777 50%, #4a1942 100%)",
    content: (
      <ConfidentialContent
        sector="Boutique e-commerce mode haut de gamme — tunnel d'achat optimisé, lookbook interactif, programme fidélité."
        tags={["Next.js", "WooCommerce", "UI Design", "Analytics"]}
      />
    ),
  },
];

export function Portfolio2() {
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
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-poppins font-light leading-tight mb-4">
              Des sites qui{" "}
              <AuroraText colors={["#ffffff", "#a78bfa", "#653ad2", "#8b5cf6", "#ffffff"]}>
                parlent d'eux-mêmes
              </AuroraText>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Cliquez sur un projet pour découvrir les détails. Les résultats parlent d'eux-mêmes.
            </p>
          </div>
        </BlurFade>

        <BlurFade inView delay={0.2}>
          <AppleCardsCarousel cards={cards} />
        </BlurFade>
      </div>
    </section>
  );
}
