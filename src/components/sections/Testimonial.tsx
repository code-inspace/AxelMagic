import { BlurFade } from "@/components/magicui/blur-fade";
import { Quote } from "lucide-react";

export function Testimonial() {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-[0.07] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #653ad2, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <BlurFade inView delay={0.1}>
          <div className="glass-card border border-white/[0.07] rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center sm:items-start gap-8">
            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-purple-500/30 shadow-lg shadow-purple-900/20">
                <img
                  src="/images/testimonies/axel-coudair-chrystel.jpg"
                  alt="Chrystel Bruce"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center sm:text-left">
              <Quote className="w-8 h-8 text-purple-500/40 mb-4 mx-auto sm:mx-0" />
              <p className="text-white text-lg sm:text-xl font-light leading-relaxed italic mb-6">
                "Axel a saisi mon univers et m'a aidé à l'améliorer visuellement. Il a traduit ce que je fais en quelque chose de visuellement fort et aligné avec les valeurs de mon entreprise. Le résultat dépasse ce que j'avais imaginé et l'engagement suite à sa mise en ligne à réellement augmenté. Je n'ai eu que des feedbacks positifs !"
              </p>
              <div>
                <p className="text-white font-semibold text-sm">Chrystel Bruce</p>
                <p className="text-purple-400/70 text-xs mt-0.5 tracking-wide">WithStellie.co · Coach de vie & transformation</p>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
