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
            <div className="flex items-center gap-2 mt-4">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400">
                Disponible · Réponse sous 24h
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { label: "À propos", href: "#apropos" },
                { label: "Services", href: "#services" },
                { label: "Réalisations", href: "#realisations" },
                { label: "Méthode", href: "#process" },
                { label: "Performance", href: "#seo" },
                { label: "Affiliation", href: "#affiliation" },
                { label: "Contact", href: "#contact" },
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
            <h4 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href="tel:+33648180606"
                className="flex items-center gap-3 text-white/45 hover:text-white text-sm transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                +33 6 48 18 06 06
              </a>
              <a
                href="mailto:hello@axelcoudair.com"
                className="flex items-center gap-3 text-white/45 hover:text-white text-sm transition-colors duration-200"
              >
                <Mail className="w-4 h-4" />
                hello@axelcoudair.com
              </a>
              <a
                href="https://wa.me/33648180606"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/45 hover:text-white text-sm transition-colors duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.linkedin.com/in/axel-coudair/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-purple-500/30 transition-all duration-200"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex items-center justify-center">
          <p className="text-white/25 text-xs">
            © {year} Axel Coudair · Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
