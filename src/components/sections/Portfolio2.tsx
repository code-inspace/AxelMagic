import { projects } from "@/data/projects";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BlurFade } from "@/components/magicui/blur-fade";
import { AppleCardsCarousel } from "@/components/ui/apple-cards-carousel";

export function Portfolio2() {
  return (
    <section id="realisations" className="relative py-16 lg:py-32 overflow-hidden">

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
            <p className="text-white text-lg max-w-xl mx-auto">
              Cliquez sur un projet pour découvrir les détails.
            </p>
          </div>
        </BlurFade>

        <AppleCardsCarousel cards={projects} />
      </div>
    </section>
  );
}
