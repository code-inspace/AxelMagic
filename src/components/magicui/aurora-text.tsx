import { cn } from "@/lib/utils";

interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
}

export function AuroraText({ children, className, colors }: AuroraTextProps) {
  const gradient = colors
    ? colors.join(", ")
    : "#ffffff, #a78bfa, #8b5cf6, #c4b5fd, #e9d5ff, #ffffff";

  return (
    <span
      className={cn("inline", className)}
      style={{
        background: `linear-gradient(135deg, ${gradient})`,
        backgroundSize: "300% 300%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animation: "aurora 4s ease infinite alternate",
      }}
    >
      {children}
    </span>
  );
}
