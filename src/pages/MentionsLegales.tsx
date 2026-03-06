import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";

export function MentionsLegales() {
  return (
    <div className="min-h-screen bg-[#0E0F11] text-white overflow-x-hidden">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-40 pb-32">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-purple-500/40" />
            <span className="text-xs text-purple-400 tracking-widest uppercase font-medium px-3 py-1 rounded-full border border-purple-500/20">
              Légal
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-poppins font-light leading-tight">
            Mentions légales
          </h1>
        </div>

        {/* Sections */}
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-poppins font-light mb-6 text-white">
              Éditeur du site
            </h2>
            <div className="space-y-2 text-white/60 text-sm leading-relaxed">
              <p>Nom : Axel Coudair</p>
              <p>Statut : Auto-entrepreneur</p>
              <p>Adresse : Paris, France</p>
              <p>
                Email :{" "}
                <a
                  href="mailto:hello@axelcoudair.com"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  hello@axelcoudair.com
                </a>
              </p>
              <p>Numéro SIRET : 84152032300012</p>
              <p>RCS : Paris</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-poppins font-light mb-6 text-white">
              Directeur de la publication
            </h2>
            <div className="text-white/60 text-sm leading-relaxed">
              <p>Axel Coudair</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-poppins font-light mb-6 text-white">
              Hébergement
            </h2>
            <div className="space-y-2 text-white/60 text-sm leading-relaxed">
              <p>Hébergeur : Vercel, Inc.</p>
              <p>Adresse : 340 Pine Street, Suite 401, San Francisco, CA 94104, USA</p>
              <p>
                Site web :{" "}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  https://vercel.com
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-poppins font-light mb-6 text-white">
              Propriété intellectuelle
            </h2>
            <div className="text-white/60 text-sm leading-relaxed">
              <p>
                L'ensemble du contenu présent sur le site axelcoudair.com (textes,
                images, graphismes, logo, icônes, animations, etc.) est protégé par
                le droit d'auteur et la propriété intellectuelle. Toute reproduction,
                représentation, modification ou adaptation, totale ou partielle, sans
                autorisation écrite préalable est interdite.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-poppins font-light mb-6 text-white">
              Données personnelles
            </h2>
            <div className="space-y-3 text-white/60 text-sm leading-relaxed">
              <p>
                Les données personnelles collectées via le site (formulaire de
                contact, email) sont strictement utilisées pour répondre aux demandes
                de l'utilisateur. Conformément au RGPD, vous disposez d'un droit
                d'accès, de rectification et de suppression de vos données
                personnelles.
              </p>
              <p>
                Pour exercer ce droit, contactez :{" "}
                <a
                  href="mailto:hello@axelcoudair.com"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  hello@axelcoudair.com
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-poppins font-light mb-6 text-white">
              Cookies
            </h2>
            <div className="text-white/60 text-sm leading-relaxed">
              <p>
                Le site peut utiliser des cookies à des fins de mesure d'audience ou
                de fonctionnement. Vous pouvez configurer votre navigateur pour
                refuser tout ou partie des cookies.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
