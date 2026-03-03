import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MorphingTextProps {
  texts: string[];
  className?: string;
  morphDuration?: number;
  cooldown?: number;
}

const morphTime = 1.2;
const cooldownTime = 0.8;

export function MorphingText({ texts, className, morphDuration = 1.2, cooldown = 0.8 }: MorphingTextProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [morph, setMorph] = useState(0);
  const [cooldownTimer, setCooldownTimer] = useState(cooldown);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let morphVal = 0;
    let cooldownVal = cooldownTime;
    let idx = 0;

    const animate = (time: number) => {
      if (lastTimeRef.current !== null) {
        const dt = (time - lastTimeRef.current) / 1000;

        if (cooldownVal > 0) {
          cooldownVal -= dt;
          if (cooldownVal <= 0) {
            setCooldownTimer(0);
          }
        } else {
          morphVal += dt;
          if (morphVal >= morphTime) {
            morphVal = 0;
            cooldownVal = cooldownTime;
            idx = (idx + 1) % texts.length;
            setTextIndex(idx);
          }
          const fraction = morphVal / morphTime;
          setMorph(fraction);
        }
      }
      lastTimeRef.current = time;
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [texts, morphDuration, cooldown]);

  const blur1 = Math.min(8 / morph - 8, 100);
  const blur2 = Math.min(8 / (1 - morph) - 8, 100);
  const opacity1 = Math.pow(morph, 0.4) * 100;
  const opacity2 = Math.pow(1 - morph, 0.4) * 100;

  return (
    <div className={cn("relative", className)}>
      <span
        style={{
          filter: `blur(${blur2}px)`,
          opacity: `${100 - opacity1}%`,
        }}
      >
        {texts[textIndex]}
      </span>
      <span
        className="absolute inset-0"
        style={{
          filter: `blur(${blur1}px)`,
          opacity: `${opacity1}%`,
        }}
      >
        {texts[(textIndex + 1) % texts.length]}
      </span>
    </div>
  );
}
