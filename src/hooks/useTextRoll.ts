import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function useTextRoll<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const top    = el.querySelector('.roll-top');
    const bottom = el.querySelector('.roll-bottom');
    if (!top || !bottom) return;

    const h = el.offsetHeight;

    // roll-bottom part du bas (hors champ) via GSAP, pas via CSS top-full
    gsap.set(bottom, { y: h });

    const onEnter = () => {
      gsap.to(top,    { y: -h, duration: 0.48, ease: 'power3.inOut', overwrite: true });
      gsap.to(bottom, { y: 0,  duration: 0.48, ease: 'power3.inOut', overwrite: true });
    };

    const onLeave = () => {
      gsap.to(top,    { y: 0, duration: 0.48, ease: 'power3.inOut', overwrite: true });
      gsap.to(bottom, { y: h, duration: 0.48, ease: 'power3.inOut', overwrite: true });
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf([top, bottom]);
    };
  }, []);

  return ref;
}
