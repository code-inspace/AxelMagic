import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RollButton } from "@/components/ui/RollButton";
import {
  MessageSquare,
  Paintbrush,
  Code,
  FileText,
  CheckCircle,
  HeartHandshake,
} from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BlurFade } from "@/components/magicui/blur-fade";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { useInView } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Découverte",
    description:
      "On commence par un échange approfondi pour comprendre votre activité, vos objectifs et vos clients.",
    duration: "Semaine 1",
    color: "#a78bfa",
  },
  {
    number: "02",
    icon: Paintbrush,
    title: "Design",
    description:
      "Je conçois le design de votre site. On affine ensemble jusqu'à ce que ce soit parfait. Vous validez avant le démarrage du développement.",
    duration: "Semaine 1-2",
    color: "#a78bfa",
  },
  {
    number: "03",
    icon: Code,
    title: "Développement",
    description:
      "Chaque projet est différent, ma stack aussi. Je code votre site avec les technologies adaptées à ses spécificités.\nFront : Next.js, React, Vite, Tailwind, Webflow\nBack : Prisma, Neon, Supabase, Payload CMS",
    duration: "Semaine 2-3",
    color: "#a78bfa",
  },
  {
    number: "04",
    icon: FileText,
    title: "Contenu & SEO",
    description:
      "On intègre vos textes et vos visuels, on structure les pages pour le référencement. Votre site est préparé pour être trouvé sur Google.",
    duration: "Semaine 3",
    color: "#a78bfa",
  },
  {
    number: "05",
    icon: CheckCircle,
    title: "Tests & Livraison",
    description:
      "Vérifications complètes sur tous les appareils, puis mise en ligne. Votre site est prêt à travailler pour vous.",
    duration: "Semaine 4",
    color: "#a78bfa",
  },
  {
    number: "06",
    icon: HeartHandshake,
    title: "Accompagnement",
    description:
      "Je reste disponible après la livraison. Vous n'êtes pas seul. Suivi, ajustements, évolutions, un vrai partenariat sur le long terme.",
    duration: "En continu",
    color: "#a78bfa",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(counterRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line grows from top to bottom as user scrolls
      gsap.fromTo(
        lineRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 60%",
            end: "bottom 75%",
            scrub: 1,
          },
        }
      );


      // Animate each step
      stepRefs.current.forEach((el, i) => {
        if (!el) return;

        const card = el.querySelector(".step-card");
        const dot = el.querySelector(".step-dot");
        const connector = el.querySelector(".step-connector");
        const badge = el.querySelector(".step-badge");
        const isLeft = i % 2 === 0;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            once: true,
          },
        });

        // Dot pops in
        tl.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }
        );

        // Connector line extends
        if (connector) {
          tl.fromTo(
            connector,
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, duration: 0.35, ease: "power2.out" },
            "-=0.25"
          );
        }

        // Card slides in from the correct side
        tl.fromTo(
          card,
          { x: isLeft ? -50 : 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        );

        // Badge fades in on opposite side
        if (badge) {
          tl.fromTo(
            badge,
            { x: isLeft ? 30 : -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
            "-=0.4"
          );
        }

        // Mobile card slides in from right
        const mobileCard = el.querySelector(".step-card-mobile");
        if (mobileCard) {
          tl.fromTo(
            mobileCard,
            { x: 40, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.55, ease: "power3.out" },
            "-=0.3"
          );
        }
      });

      // Coverflow: scale up the row closest to viewport center
      stepRefs.current.forEach((el) => {
        if (!el) return;
        const row = el.querySelector(".step-row");
        if (!row) return;

        const dot = el.querySelector(".step-dot");

        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate(self) {
            if (self.progress >= 0.5) {
              gsap.set(row, { opacity: 1, filter: "grayscale(0%) brightness(1)", overwrite: "auto" });
              if (dot) gsap.set(dot, { filter: "grayscale(0%) brightness(1)", opacity: 1, boxShadow: "0 0 18px 4px #a78bfa55", overwrite: "auto" });
            } else {
              const dist = 0.5 - self.progress;
              const opacity = gsap.utils.clamp(0.12, 0.85, 1 - dist * 2.2);
              const brightness = gsap.utils.clamp(0.3, 1, 1 - dist * 1.4);
              gsap.set(row, { opacity, filter: `grayscale(100%) brightness(${brightness})`, overwrite: "auto" });
              if (dot) gsap.set(dot, { filter: `grayscale(100%) brightness(${brightness})`, opacity, boxShadow: "none", overwrite: "auto" });
            }
          },
        });
      });

      // Orb fixe à 50vh , apparaît quand la timeline entre dans le viewport
      gsap.set(orbRef.current, { opacity: 0 });
      ScrollTrigger.create({
        trigger: timelineRef.current,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => gsap.to(orbRef.current, { opacity: 1, duration: 0.3 }),
        onLeave: () => gsap.to(orbRef.current, { opacity: 0, duration: 0.3 }),
        onEnterBack: () => gsap.to(orbRef.current, { opacity: 1, duration: 0.3 }),
        onLeaveBack: () => gsap.to(orbRef.current, { opacity: 0, duration: 0.3 }),
      });
    }, sectionRef);

    // Spring ticker : orbe ancré à 50vh via recalcul absolu à chaque frame
    let springOffset = 0;
    let lastScrollY = window.scrollY;
    let scrollVel = 0;

    const onScroll = () => {
      scrollVel = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const tickerFn = () => {
      if (!orbRef.current || !timelineRef.current) return;
      // Base : position absolue équivalente à 50vh dans le container
      const timelineTop = timelineRef.current.getBoundingClientRect().top;
      const baseTop = window.innerHeight * 0.5 - timelineTop;
      // Spring offset
      springOffset -= scrollVel * 1.2;
      springOffset *= 0.92;
      scrollVel = 0;
      gsap.set(orbRef.current, { top: baseTop + springOffset });
    };
    gsap.ticker.add(tickerFn);

    return () => {
      ctx.revert();
      gsap.ticker.remove(tickerFn);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} id="process" className="relative py-16 lg:py-32 overflow-hidden">
      {/* Decorative glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] opacity-[0.06] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, #653ad2, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <BlurFade inView delay={0}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/40" />
            <span className="text-xs text-purple-400 tracking-widest uppercase font-medium px-3 py-1 rounded-full border border-purple-500/20">
              Méthode
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/40" />
          </div>
        </BlurFade>

        <BlurFade inView delay={0.1}>
          <div className="text-center mb-4">
            <h2 className="text-4xl sm:text-5xl font-poppins font-light leading-tight mb-4">
              Votre site en ligne en{" "}
              <AuroraText
                colors={["#ffffff", "#a78bfa", "#653ad2", "#8b5cf6", "#ffffff"]}
              >
                30 jours.
              </AuroraText>
            </h2>
            <p className="text-white text-lg max-w-xl mx-auto">
              Un processus éprouvé, une méthode claire. Vous savez où en est
              votre projet à chaque étape.
            </p>
          </div>
        </BlurFade>

        {/* Countdown badge */}
        <BlurFade inView delay={0.2}>
          <div className="flex justify-center mb-20">
            <div
              ref={counterRef}
              className="glass-card border border-purple-500/30 px-6 py-3 rounded-2xl flex items-center gap-4"
            >
              <div className="text-center">
                <div className="text-3xl font-black aurora-text">
                  {isInView ? (
                    <NumberTicker value={30} delay={0} className="aurora-text" />
                  ) : (
                    "0"
                  )}
                </div>
                <div className="text-xs text-white">jours</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="text-sm font-semibold text-white">Site clé en main</p>
                <p className="text-xs text-white">Design · Dev · SEO · Livraison</p>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical line , desktop only */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/[0.06]" />
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px overflow-hidden">
            <div
              ref={lineRef}
              className="absolute top-0 left-0 w-full"
              style={{
                height: "0%",
                background: "linear-gradient(to bottom, #a78bfa, #a78bfa88)",
                boxShadow: "0 0 8px #a78bfa80",
              }}
            />
          </div>

          {/* Orb , absolute, z-0 pour passer derrière les dots z-10 */}
          <div
            ref={orbRef}
            className="hidden lg:block absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full z-0 pointer-events-none opacity-0"
            style={{
              background: "#a78bfa",
              boxShadow: "0 0 12px 4px #a78bfa60",
            }}
          />

          {/* Vertical line , mobile only */}
          <div className="lg:hidden absolute left-5 top-0 bottom-0 w-px bg-white/[0.06]" />

          <div className="space-y-2">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={step.number}
                  ref={(el) => { stepRefs.current[i] = el; }}
                  className="relative"
                >
                  {/* ── DESKTOP layout ── */}
                  <div className="hidden lg:flex items-center min-h-[200px] py-14">
                    {/* Left slot */}
                    <div className="step-row w-[calc(50%-28px)] flex justify-end pr-10">
                      {isLeft ? (
                        <DescriptionText step={step} align="right" />
                      ) : (
                        <DurationBadge step={step} align="right" />
                      )}
                    </div>

                    {/* Center dot , hors du filter, toujours devant */}
                    <div className="relative flex-shrink-0 z-10">
                      <div
                        className="step-dot w-14 h-14 rounded-full flex items-center justify-center border-2"
                        style={{
                          background: `${step.color}18`,
                          borderColor: `${step.color}50`,
                          boxShadow: `0 0 20px ${step.color}30`,
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: step.color }} />
                      </div>
                    </div>

                    {/* Right slot */}
                    <div className="step-row w-[calc(50%-28px)] flex justify-start pl-10">
                      {!isLeft ? (
                        <DescriptionText step={step} align="left" />
                      ) : (
                        <DurationBadge step={step} align="left" />
                      )}
                    </div>
                  </div>

                  {/* ── MOBILE layout ── */}
                  <div className="lg:hidden flex items-start gap-4 py-10 pl-2">
                    {/* Dot on left rail */}
                    <div className="relative flex-shrink-0 z-10 mt-1">
                      <div
                        className="step-dot w-10 h-10 rounded-full flex items-center justify-center border"
                        style={{
                          background: `${step.color}18`,
                          borderColor: `${step.color}50`,
                        }}
                      >
                        <Icon className="w-4 h-4" style={{ color: step.color }} />
                      </div>
                    </div>

                    {/* Card */}
                    <div className="step-card-mobile flex-1">
                      <StepCard step={step} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <BlurFade inView delay={0.3}>
          <div className="mt-16 text-center">
            <p className="text-white mb-6">Prêt à lancer votre projet ?</p>
            <RollButton
              data-cal-namespace="30min"
              data-cal-link="axel-coudair-hhelf2/30min"
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 cursor-pointer"
              style={{ background: "linear-gradient(135deg, #2708a0, #653ad2)" }}
            >
              Réserver mon appel découverte →
            </RollButton>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

/* ─── Sub-components ─────────────────────────────── */

function StepCard({ step }: { step: (typeof steps)[number] }) {
  return (
    <div
      className="step-card glass-card border border-white/[0.07] hover:border-purple-500/25 transition-all duration-400 p-6 rounded-2xl w-full max-w-sm relative overflow-hidden group"
    >
      {/* Ghost number */}
      <div
        className="absolute top-3 right-4 text-5xl font-black opacity-[0.04] leading-none select-none"
        style={{ color: step.color }}
      >
        {step.number}
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <span
              className="text-xs font-bold tracking-widest uppercase block mb-0.5"
              style={{ color: step.color }}
            >
              Étape {step.number}
            </span>
            <h3 className="text-lg font-bold text-white leading-tight">{step.title}</h3>
          </div>
          <span className="text-xs text-white font-medium shrink-0 mt-0.5">{step.duration}</span>
        </div>
        <p className="text-white text-sm leading-relaxed whitespace-pre-line">
          {step.description}
        </p>
      </div>

      {/* Bottom gradient line on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(to right, ${step.color}, transparent)` }}
      />
    </div>
  );
}

function DescriptionText({
  step,
  align,
}: {
  step: (typeof steps)[number];
  align: "left" | "right";
}) {
  return (
    <p
      className={`step-card text-white text-sm leading-relaxed whitespace-pre-line max-w-xs ${align === "right" ? "text-right" : "text-left"}`}
    >
      {step.description}
    </p>
  );
}

function DurationBadge({
  step,
  align,
}: {
  step: (typeof steps)[number];
  align: "left" | "right";
}) {
  return (
    <div
      className={`step-badge flex flex-col gap-1 ${align === "right" ? "items-end text-right" : "items-start text-left"}`}
    >
      <span
        className="text-xs font-bold tracking-widest uppercase"
        style={{ color: step.color }}
      >
        Étape {step.number}
      </span>
      <span className="text-2xl font-black text-white leading-tight">
        {step.title}
      </span>
      <span
        className="text-xs font-medium px-2.5 py-1 rounded-full border mt-1"
        style={{
          color: step.color,
          borderColor: `${step.color}40`,
          background: `${step.color}10`,
        }}
      >
        {step.duration}
      </span>
    </div>
  );
}
