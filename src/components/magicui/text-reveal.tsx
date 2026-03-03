import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
}

export function TextReveal({ text, className }: TextRevealProps) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.9", "end 0.4"],
  });

  const words = text.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0", className)}>
      <div className="flex flex-wrap gap-x-2 gap-y-1">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;

          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </div>
    </div>
  );
}

interface WordProps {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}

function Word({ children, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const blur = useTransform(progress, range, ["blur(4px)", "blur(0px)"]);
  const y = useTransform(progress, range, ["8px", "0px"]);

  return (
    <motion.span
      style={{ opacity, filter: blur, y }}
      className="inline-block text-white"
    >
      {children}
    </motion.span>
  );
}
