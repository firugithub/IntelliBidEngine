import { ProposalCard } from "@/components/ProposalCard";
import { ScoreCard } from "@/components/ScoreCard";
import { ComparisonTable } from "@/components/ComparisonTable";
import { RoleViewTabs } from "@/components/RoleViewTabs";
import { RadarChart } from "@/components/RadarChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, TrendingUp, DollarSign, Shield, Download, Upload, Loader2 } from "lucide-react";
import { useLocation, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";

interface Evaluation {
  id: string;
  vendorName: string;
  overallScore: number;
  technicalFit: number;
  deliveryRisk: number;
  cost: string;
  compliance: number;
  status: "recommended" | "under-review" | "risk-flagged";
  aiRationale: string | null;
  roleInsights: any;
  detailedScores: any;
}

export default function DashboardPage() {
  const [, setLocation] = useLocation();
  const params = useParams();
  const projectId = params.id;

  const { data: evaluations, isLoading } = useQuery<Evaluation[]>({
    queryKey: ["/api/projects", projectId, "evaluations"],
    enabled: !!projectId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading evaluation results...</p>
        </div>
      </div>
    );
  }

  if (!evaluations || evaluations.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">No evaluations found</p>
          <Button onClick={() => setLocation("/")}>
            Start New Evaluation
          </Button>
        </div>
      </div>
    );
  }

  // Calculate aggregated metrics
  const avgTechnicalFit = Math.round(
    evaluations.reduce((sum, e) => sum + e.technicalFit, 0) / evaluations.length
  );
  
  const lowestRisk = Math.min(...evaluations.map((e) => e.deliveryRisk));
  const lowestRiskVendor = evaluations.find((e) => e.deliveryRisk === lowestRisk);

  const bestValueEval = evaluations.reduce((prev, curr) => {
    const prevCost = parseInt(prev.cost.replace(/[^0-9]/g, ""));
    const currCost = parseInt(curr.cost.replace(/[^0-9]/g, ""));
    return currCost < prevCost ? curr : prev;
  });

  const highestCompliance = Math.max(...evaluations.map((e) => e.compliance));
  const highestComplianceVendor = evaluations.find((e) => e.compliance === highestCompliance);

  // Prepare comparison table data
  const comparisonData = evaluations.map((e) => ({
    vendorName: e.vendorName,
    technicalFit: e.technicalFit,
    deliveryRisk: e.deliveryRisk,
    cost: e.cost,
    compliance: e.compliance,
    integration: e.detailedScores?.integration > 80 ? ("easy" as const) : 
                 e.detailedScores?.integration > 60 ? ("moderate" as const) : ("complex" as const),
    support: e.detailedScores?.support > 80 ? ("24/7" as const) : ("business-hours" as const),
  }));

  // Prepare radar chart data
  const radarData = evaluations.map((e, index) => ({
    name: e.vendorName,
    color: index === 0 ? "hsl(210, 100%, 60%)" : 
           index === 1 ? "hsl(142, 71%, 55%)" : 
           "hsl(38, 92%, 60%)",
    data: [
      { criterion: "Technical Fit", score: e.technicalFit },
      { criterion: "Cost", score: 100 - (parseInt(e.cost.replace(/[^0-9]/g, "")) / 3000) },
      { criterion: "Compliance", score: e.compliance },
      { criterion: "Support", score: e.detailedScores?.support || 75 },
      { criterion: "Integration", score: e.detailedScores?.integration || 75 },
    ],
  }));

  // Get role insights from top-rated vendor
  const topVendor = evaluations.reduce((prev, curr) => 
    curr.overallScore > prev.overallScore ? curr : prev
  );

  const handleDownloadReport = () => {
    console.log("Downloading shortlisting report...");
    // todo: Implement actual report download
  };

  const handleNewEvaluation = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Shortlisting Report</h1>
              <p className="text-muted-foreground">
                AI-generated evaluation of {evaluations.length} vendor proposal{evaluations.length > 1 ? 's' : ''}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleNewEvaluation}
                className="gap-2"
                data-testid="button-new-evaluation"
              >
                <Upload className="h-4 w-4" />
                New Evaluation
              </Button>
              <Button
                onClick={handleDownloadReport}
                className="gap-2"
                data-testid="button-download-report"
              >
                <Download className="h-4 w-4" />
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScoreCard
              title="Average Technical Fit"
              value={`${avgTechnicalFit}%`}
              subtitle="Across all proposals"
              icon={CheckCircle2}
              trend={avgTechnicalFit > 75 ? "up" : "neutral"}
              trendValue={avgTechnicalFit > 75 ? "+12% above threshold" : "Meeting baseline"}
            />
            <ScoreCard
              title="Lowest Delivery Risk"
              value={`${lowestRisk}%`}
              subtitle={lowestRiskVendor?.vendorName || ""}
              icon={TrendingUp}
              trend="down"
              trendValue="Low risk profile"
            />
            <ScoreCard
              title="Best Value"
              value={bestValueEval.cost.split(" - ")[0]}
              subtitle={bestValueEval.vendorName}
              icon={DollarSign}
            />
            <ScoreCard
              title="Highest Compliance"
              value={`${highestCompliance}%`}
              subtitle={highestComplianceVendor?.vendorName || ""}
              icon={Shield}
              trend="up"
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Shortlisted Proposals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {evaluations.map((evaluation) => (
                <ProposalCard
                  key={evaluation.id}
                  vendorName={evaluation.vendorName}
                  overallScore={evaluation.overallScore}
                  technicalFit={evaluation.technicalFit}
                  deliveryRisk={evaluation.deliveryRisk}
                  cost={evaluation.cost}
                  compliance={evaluation.compliance}
                  status={evaluation.status}
                  onViewDetails={() => console.log(`View details for ${evaluation.vendorName}`)}
                />
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Multi-Criteria Comparison</CardTitle>
              <CardDescription>
                Visual comparison across key evaluation dimensions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadarChart vendors={radarData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detailed Comparison</CardTitle>
              <CardDescription>
                Side-by-side analysis of all evaluation criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ComparisonTable data={comparisonData} />
            </CardContent>
          </Card>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Role-Specific Insights</h2>
            <RoleViewTabs
              deliveryInsights={{
                title: "Delivery & PMO Assessment",
                items: topVendor.roleInsights?.delivery || [
                  "Analysis based on vendor proposals and requirements",
                  "Timeline and resource allocation considerations",
                  "Risk factors and mitigation strategies identified",
                ],
              }}
              productInsights={{
                title: "Product Requirements Coverage",
                items: topVendor.roleInsights?.product || [
                  "Feature coverage analysis across proposals",
                  "Product roadmap alignment considerations",
                  "Customization and flexibility assessment",
                ],
              }}
              architectureInsights={{
                title: "Architecture & Security Analysis",
                items: topVendor.roleInsights?.architecture || [
                  "Technical architecture evaluation",
                  "Security and compliance assessment",
                  "Integration complexity analysis",
                ],
              }}
              engineeringInsights={{
                title: "Engineering & Quality Assessment",
                items: topVendor.roleInsights?.engineering || [
                  "Development toolkit and SDK quality",
                  "Testing and quality assurance capabilities",
                  "Documentation and developer experience",
                ],
              }}
              procurementInsights={{
                title: "Commercial & TCO Analysis",
                items: topVendor.roleInsights?.procurement || [
                  "Total cost of ownership assessment",
                  "Contract terms and pricing structure",
                  "SLA and support model evaluation",
                ],
              }}
            />
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>AI Recommendation</CardTitle>
              <CardDescription>
                AI-generated recommendation based on weighted scoring
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                {topVendor.aiRationale || `Based on the comprehensive multi-criteria evaluation, ${topVendor.vendorName} is recommended as the preferred vendor with an overall fit score of ${topVendor.overallScore}%.`}
              </p>
              <div className="space-y-2 pt-2">
                <h4 className="font-semibold text-sm">Next Steps:</h4>
                <ol className="space-y-1 text-sm list-decimal list-inside">
                  <li>Schedule technical deep-dive with {topVendor.vendorName}</li>
                  <li>Request detailed pricing breakdown and contract terms</li>
                  <li>Conduct proof of concept for critical integration points</li>
                  <li>Obtain executive approval for budget allocation</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
