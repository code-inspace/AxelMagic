import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const isVideoSrc = (src: string) => /\.(mov|mp4|webm)$/i.test(src);

function MediaPreview({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return isVideoSrc(src) ? (
    <video src={src} autoPlay muted loop playsInline className={className}>
      <track kind="captions" />
    </video>
  ) : (
    <img src={src} alt={alt} className={className} loading="lazy" />
  );
}

export function ReferenceGallery({ images }: { images: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // We delay slightly to ensure the modal layout is fully measured before ScrollTrigger calculates
    const timeoutId = setTimeout(() => {
      let ctx = gsap.context(() => {
        const wrapper = wrapperRef.current;
        const container = containerRef.current;
        const scroller = document.querySelector("#modal-scroll-container");
        
        if (!wrapper || !container || !scroller) return;

        const getScrollAmount = () => -(wrapper.scrollWidth - container.clientWidth);

        gsap.to(wrapper, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            scroller: scroller,
            pin: true,
            scrub: 1,
            // To prevent layout jumps inside a transform modal
            pinType: "transform",
            end: () => `+=${wrapper.scrollWidth - container.clientWidth}`,
            invalidateOnRefresh: true,
          }
        });
      }, containerRef);
      
      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <section 
      ref={containerRef} 
      className="w-full h-[50vh] sm:h-[60vh] overflow-hidden flex flex-col justify-center relative my-12"
    >
      <div 
        ref={wrapperRef} 
        className="flex items-center h-[90%] gap-6 sm:gap-10 w-max"
      >
        {images.map((src, i) => (
          <div 
            key={i} 
            className="story-card relative w-[75vw] sm:w-[60vw] max-w-3xl h-full flex-shrink-0 rounded-[2rem] overflow-hidden group border border-white/5"
          >
            <MediaPreview
               src={src}
               alt={`Aperçu ${i + 1}`}
               className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Optional subtle gradient to ground the footage */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
}
