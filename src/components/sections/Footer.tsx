import { MessageCircle, Phone, Mail, Linkedin } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] pt-16 pb-10 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] opacity-[0.05] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, #653ad2, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/images/logo-axelcoudair.png"
                alt="Axel Coudair"
                className="h-9 w-auto"
              />
            </div>
            <p className="text-white/45 text-sm leading-relaxed max-w-xs">
              Expert web indépendant. Je conçois des sites stratégiques pour les
              PME qui veulent convertir leurs visiteurs en clients.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { label: "À propos", href: "/#apropos" },
                { label: "Services", href: "/#services" },
                { label: "Réalisations", href: "/#realisations" },
                { label: "Méthode", href: "/#process" },
                { label: "Performance", href: "/#seo" },
                { label: "Affiliation", href: "/#affiliation" },
                { label: "Contact", href: "/#contact" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-white/45 hover:text-white text-sm transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">
              Contact
            </h3>
            <div className="space-y-3">
              <a
                href="tel:+33760966496"
                className="flex items-center gap-3 text-white/45 hover:text-white text-sm transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                +33 7 60 96 64 96
              </a>
              <a
                href="mailto:hello@axelcoudair.com"
                className="flex items-center gap-3 text-white/45 hover:text-white text-sm transition-colors duration-200"
              >
                <Mail className="w-4 h-4" />
                hello@axelcoudair.com
              </a>
              <a
                href="https://wa.me/message/NUKO2RPNV3BUF1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/45 hover:text-white text-sm transition-colors duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>

            <div className="mt-6">
              <div className="h-px bg-white/[0.06] mb-4" />
              <p className="text-xs text-white/40 uppercase tracking-widest font-medium mb-3">
                Suivez moi
              </p>
              <a
                href="https://www.linkedin.com/in/axel-coudair/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-purple-500/30 transition-all duration-200"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex items-center justify-between">
          <p className="text-white/50 text-xs">
            © {year} Axel Coudair · Tous droits réservés
          </p>
          <a
            href="/mentions-legales"
            className="text-white/35 hover:text-white/60 text-xs transition-colors duration-200"
          >
            Mentions légales
          </a>
        </div>
      </div>
    </footer>
  );
}
