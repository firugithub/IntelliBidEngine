import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ScoreCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export function ScoreCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
}: ScoreCardProps) {
  const getTrendColor = () => {
    if (trend === "up") return "text-chart-2";
    if (trend === "down") return "text-chart-3";
    return "text-muted-foreground";
  };

  return (
    <Card data-testid="card-score">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium" data-testid="text-title">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold font-mono" data-testid="text-value">
          {value}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
        {trendValue && (
          <p className={`text-xs mt-1 ${getTrendColor()}`}>
            {trendValue}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
