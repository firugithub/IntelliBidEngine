import { ScoreCard } from "../ScoreCard";
import { CheckCircle2 } from "lucide-react";

export default function ScoreCardExample() {
  return (
    <div className="p-6 max-w-sm">
      <ScoreCard
        title="Average Technical Fit"
        value="85%"
        subtitle="Across all proposals"
        icon={CheckCircle2}
        trend="up"
        trendValue="+12% from last evaluation"
      />
    </div>
  );
}
