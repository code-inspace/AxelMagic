import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";

export function PolitiqueConfidentialite() {
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
            Politique de confidentialité
          </h1>
          <p className="text-white text-sm mt-4">Dernière mise à jour : mars 2026</p>
        </div>

        {/* Sections */}
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-poppins font-light mb-6 text-white">
              1. Qui est responsable du traitement ?
            </h2>
            <div className="space-y-2 text-white text-sm leading-relaxed">
              <p>Axel Coudair, freelance, développeur web & designer UX/UI</p>
              <p>
                Contact :{" "}
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
              2. Quelles données sont collectées ?
            </h2>
            <div className="space-y-3 text-white text-sm leading-relaxed">
              <p>
                Ce site ne collecte aucune donnée personnelle identifiante : pas de
                formulaire, pas de compte, pas de nom, pas d'email sans action
                explicite de votre part.
              </p>
              <p>L'analyse d'audience est réalisée de manière entièrement anonyme :</p>
              <div className="space-y-1 pl-2">
                <p>Aucun cookie n'est déposé sur votre navigateur</p>
                <p>Aucun identifiant persistant n'est stocké sur votre appareil</p>
                <p>
                  Les données suivantes sont traitées de façon agrégée : type de
                  navigateur et système d'exploitation, pages visitées, durée de
                  visite, localisation approximative (pays / région)
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-poppins font-light mb-6 text-white">
              3. Pourquoi ces données sont-elles collectées ?
            </h2>
            <div className="space-y-3 text-white text-sm leading-relaxed">
              <p>
                Uniquement pour améliorer l'expérience du site : comprendre quelles
                pages sont consultées, détecter d'éventuels problèmes de navigation,
                et optimiser le contenu proposé.
              </p>
              <p>
                Aucune donnée n'est utilisée à des fins publicitaires ou
                commerciales, et aucune n'est revendue à des tiers.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-poppins font-light mb-6 text-white">
              4. Quel outil est utilisé ?
            </h2>
            <div className="space-y-3 text-white text-sm leading-relaxed">
              <p>
                L'outil PostHog est utilisé pour l'analyse d'audience, configuré en
                mode cookieless : aucun cookie ni donnée de session n'est stocké dans
                votre navigateur. L'identification des visiteurs est réalisée via un
                hash anonyme calculé côté serveur à partir de données non
                personnelles, rendu impossible à relier à une personne réelle.
              </p>
              <p>
                Les données sont hébergées sur des serveurs situés dans l'Union
                européenne (PostHog Cloud EU).
              </p>
              <p>Durée de conservation : 12 mois.</p>
              <p>
                Pour en savoir plus :{" "}
                <a
                  href="https://posthog.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  posthog.com/privacy
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-poppins font-light mb-6 text-white">
              5. Base légale du traitement
            </h2>
            <div className="text-white text-sm leading-relaxed">
              <p>
                Le traitement repose sur l'intérêt légitime (article 6.1.f du RGPD).
                Aucun consentement préalable n'est requis car aucun cookie ni
                identifiant personnel n'est collecté.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-poppins font-light mb-6 text-white">
              6. Prise de rendez-vous (Cal.com)
            </h2>
            <div className="space-y-3 text-white text-sm leading-relaxed">
              <p>
                Le formulaire de réservation est fourni par Cal.com. Lors de la prise
                de rendez-vous, Cal.com peut déposer des cookies fonctionnels
                nécessaires au bon fonctionnement du formulaire. Ces cookies sont
                strictement liés à votre action et ne sont pas utilisés à des fins de
                tracking.
              </p>
              <p>
                Pour en savoir plus :{" "}
                <a
                  href="https://cal.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  cal.com/privacy
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-poppins font-light mb-6 text-white">
              7. Vos droits
            </h2>
            <div className="space-y-3 text-white text-sm leading-relaxed">
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <div className="space-y-1 pl-2">
                <p>
                  <span className="text-white">Accès</span> : obtenir une copie
                  des données vous concernant
                </p>
                <p>
                  <span className="text-white">Suppression</span> : demander
                  l'effacement de vos données
                </p>
                <p>
                  <span className="text-white">Opposition</span> : vous opposer au
                  traitement basé sur l'intérêt légitime
                </p>
                <p>
                  <span className="text-white">Réclamation</span> : auprès de la
                  CNIL (
                  <a
                    href="https://www.cnil.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    cnil.fr
                  </a>
                  )
                </p>
              </div>
              <p>
                Pour exercer vos droits :{" "}
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
              8. Sécurité
            </h2>
            <div className="text-white text-sm leading-relaxed">
              <p>
                Le site est servi en HTTPS. Les accès aux données analytics sont
                restreints au seul responsable du traitement.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
