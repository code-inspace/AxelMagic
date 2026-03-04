import { Phone, MessageCircle, Clock } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BlurFade } from "@/components/magicui/blur-fade";

export function Contact() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
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
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-poppins font-light leading-tight mb-4">
              Prêt à lancer votre{" "}
              <AuroraText colors={["#ffffff", "#a78bfa", "#653ad2", "#8b5cf6", "#ffffff"]}>
                projet web ?
              </AuroraText>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Décrivez-moi votre projet en quelques mots. Je vous réponds personnellement avec une analyse honnête et des pistes concrètes, sans engagement.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Clock className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">Réponse garantie sous 24h</span>
            </div>
          </div>
        </BlurFade>

        <BlurFade inView delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+33648180606"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold text-white transition-all duration-300 hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #2708a0, #653ad2)" }}
            >
              <Phone className="w-5 h-5" />
              Appeler
            </a>
            <a
              href="https://wa.me/33648180606"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold text-white border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </BlurFade>

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
