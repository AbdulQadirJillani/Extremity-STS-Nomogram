import { cn } from "@/lib/utils";

interface SectionCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionCard({
  icon, iconBg, title, children, className,
}: SectionCardProps) {
  return (
    <div className={cn("border-b border-parchment-dark last:border-b-0 px-7 py-6", className)}>
      <div className="flex items-center gap-2.5 mb-5">
        <div
          className="w-7 h-7 rounded-[7px] flex items-center justify-center flex-shrink-0"
          style={{ background: iconBg }}
        >
          {icon}
        </div>
        <span className="text-[10.5px] font-[500] tracking-[.09em] uppercase text-ink-muted">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}
