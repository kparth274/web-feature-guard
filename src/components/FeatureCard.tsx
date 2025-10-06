import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export const FeatureCard = ({ icon, title, description, className }: FeatureCardProps) => {
  return (
    <Card className={cn(
      "group p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow/30 hover:scale-105 hover:-translate-y-1 cursor-default",
      className
    )}>
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors duration-300">{title}</h3>
          <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">{description}</p>
        </div>
      </div>
    </Card>
  );
};