import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const isVideoSrc = (src: string) => /\.(mov|mp4|webm)$/i.test(src);

function MediaCard({ src, alt }: { src: string; alt: string }) {
  if (isVideoSrc(src)) {
    return (
      <>
        <video
          src={src}
          aria-hidden
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-110"
          style={{ filter: "blur(24px)" }}
        />
        <video src={src} autoPlay muted loop playsInline className="relative w-full h-full object-contain">
          <track kind="captions" />
        </video>
      </>
    );
  }
  return (
    <>
      <img src={src} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover scale-110" style={{ filter: "blur(24px)" }} loading="lazy" />
      <img src={src} alt={alt} className="relative w-full h-full object-contain" loading="lazy" />
    </>
  );
}

export function ReferenceGallery({ images }: { images: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.innerWidth < 1024) return; // mobile: native scroll only

    const timeoutId = setTimeout(() => {
      const ctx = gsap.context(() => {
        const wrapper = wrapperRef.current;
        const container = containerRef.current;
        const scroller = document.querySelector("#modal-scroll-container");

        if (!wrapper || !container || !scroller) return;

        const distance = wrapper.scrollWidth - container.clientWidth;
        container.style.height = `calc(${distance}px + 100vh)`;

        gsap.to(wrapper, {
          x: () => -distance,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            scroller,
            start: "top 15%",
            end: () => `+=${distance}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }, containerRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Desktop — GSAP scroll-linked */}
      <section
        ref={containerRef}
        className="hidden lg:block w-full relative my-12"
        style={{ minHeight: "100vh" }}
      >
        <div className="sticky top-[15vh] w-full h-[50vh] sm:h-[60vh] overflow-hidden flex flex-col justify-center">
          <div ref={wrapperRef} className="flex items-center h-[90%] gap-6 sm:gap-10 w-max">
            {images.map((src, i) => (
              <div
                key={i}
                className="story-card relative w-[60vw] max-w-3xl h-full flex-shrink-0 rounded-2xl overflow-hidden border border-white/5"
              >
                <MediaCard src={src} alt={`Aperçu ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile — native horizontal scroll */}
      <div
        className="lg:hidden w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden my-8"
        style={{ scrollSnapType: "x mandatory" }}
      >
        <div className="flex gap-4 w-max py-2 px-1">
          {images.map((src, i) => (
            <div
              key={i}
              className="story-card relative w-[80vw] aspect-[4/3] flex-shrink-0 overflow-hidden border border-white/5"
              style={{ scrollSnapAlign: "start" }}
            >
              <MediaCard src={src} alt={`Aperçu ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
