import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps {
  name: string;
  className?: string;
  background?: ReactNode;
  Icon?: React.ElementType;
  description: string;
  href?: string;
  cta?: string;
  children?: ReactNode;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[18rem] grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  children,
}: BentoCardProps) {
  return (
    <div
      key={name}
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-2xl",
        "glass-card border border-white/[0.06] p-6",
        "hover:border-purple-500/30 transition-all duration-300",
        className
      )}
    >
      {background && (
        <div className="absolute inset-0 opacity-60">{background}</div>
      )}
      <div className="relative z-10 flex flex-col gap-3 h-full">
        {Icon && (
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <Icon className="w-6 h-6 text-purple-400" />
          </div>
        )}
        <div className="mt-auto">
          <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
          <p className="text-white text-sm leading-relaxed">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
