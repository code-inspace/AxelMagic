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
          <p className="text-white/40 text-sm mt-4">Dernière mise à jour : mars 2026</p>
        </div>

        {/* Sections */}
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-poppins font-light mb-6 text-white">
              1. Qui est responsable du traitement ?
            </h2>
            <div className="space-y-2 text-white/60 text-sm leading-relaxed">
              <p>Axel Coudair, freelance — développeur web & designer UX/UI</p>
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
            <div className="space-y-3 text-white/60 text-sm leading-relaxed">
              <p>
                Ce site ne collecte aucune donnée personnelle identifiante (pas de
                formulaire, pas de compte, pas de nom, pas d'email sans action
                explicite de votre part).
              </p>
              <p>
                Dans le cadre de l'analyse d'audience, les données suivantes sont
                traitées de manière anonyme :
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Adresse IP (pseudonymisée)</li>
                <li>Type de navigateur et système d'exploitation</li>
                <li>Pages visitées et durée de visite</li>
                <li>Localisation approximative (pays / région, déduite de l'IP)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-poppins font-light mb-6 text-white">
              3. Pourquoi ces données sont-elles collectées ?
            </h2>
            <div className="space-y-3 text-white/60 text-sm leading-relaxed">
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
            <div className="space-y-3 text-white/60 text-sm leading-relaxed">
              <p>
                L'outil PostHog est utilisé pour l'analyse d'audience. Les données
                sont hébergées sur des serveurs situés dans l'Union européenne
                (région EU de PostHog Cloud).
              </p>
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
              <p>
                Les données collectées via PostHog sont conservées 12 mois, après
                quoi elles sont supprimées automatiquement.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-poppins font-light mb-6 text-white">
              5. Base légale du traitement
            </h2>
            <div className="space-y-3 text-white/60 text-sm leading-relaxed">
              <p>
                Le traitement repose sur votre consentement (article 6.1.a du RGPD),
                recueilli via la bannière de cookies affichée lors de votre première
                visite.
              </p>
              <p>
                Vous pouvez retirer ce consentement à tout moment en cliquant sur le
                lien "Gérer mes cookies" en bas de page.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-poppins font-light mb-6 text-white">
              6. Cookies utilisés
            </h2>
            <div className="space-y-4 text-white/60 text-sm leading-relaxed">
              <div className="border border-white/[0.07] rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.07]">
                      <th className="text-left px-4 py-3 text-white/40 font-medium">Cookie</th>
                      <th className="text-left px-4 py-3 text-white/40 font-medium">Finalité</th>
                      <th className="text-left px-4 py-3 text-white/40 font-medium">Durée</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/[0.07]">
                      <td className="px-4 py-3 font-mono text-purple-400 text-xs">ph_* (PostHog)</td>
                      <td className="px-4 py-3">Analyse d'audience anonyme</td>
                      <td className="px-4 py-3">12 mois</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-purple-400 text-xs">Préférence cookies</td>
                      <td className="px-4 py-3">Mémorisation de votre choix</td>
                      <td className="px-4 py-3">12 mois</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>Aucun cookie publicitaire ou de tracking tiers n'est utilisé.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-poppins font-light mb-6 text-white">
              7. Vos droits
            </h2>
            <div className="space-y-3 text-white/60 text-sm leading-relaxed">
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><span className="text-white/80">Accès</span> : obtenir une copie des données vous concernant</li>
                <li><span className="text-white/80">Suppression</span> : demander l'effacement de vos données</li>
                <li><span className="text-white/80">Retrait du consentement</span> : à tout moment, sans effet rétroactif</li>
                <li>
                  <span className="text-white/80">Réclamation</span> : auprès de la CNIL (
                  <a
                    href="https://www.cnil.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    cnil.fr
                  </a>
                  )
                </li>
              </ul>
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
            <div className="text-white/60 text-sm leading-relaxed">
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
