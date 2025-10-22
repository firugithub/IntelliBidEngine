import { useState } from "react";
import { ProposalCard } from "@/components/ProposalCard";
import { ScoreCard } from "@/components/ScoreCard";
import { ComparisonTable } from "@/components/ComparisonTable";
import { RoleViewTabs } from "@/components/RoleViewTabs";
import { RadarChart } from "@/components/RadarChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, TrendingUp, DollarSign, Shield, Download, Upload } from "lucide-react";
import { useLocation } from "wouter";

export default function DashboardPage() {
  const [, setLocation] = useLocation();
  
  // todo: remove mock functionality - Replace with actual API data
  const mockProposals = [
    {
      vendorName: "TechVendor Pro",
      overallScore: 87,
      technicalFit: 92,
      deliveryRisk: 25,
      cost: "$150K - $180K",
      compliance: 95,
      status: "recommended" as const,
    },
    {
      vendorName: "CloudSolutions Inc",
      overallScore: 79,
      technicalFit: 85,
      deliveryRisk: 35,
      cost: "$120K - $150K",
      compliance: 88,
      status: "under-review" as const,
    },
    {
      vendorName: "Enterprise Systems",
      overallScore: 72,
      technicalFit: 78,
      deliveryRisk: 45,
      cost: "$200K - $250K",
      compliance: 92,
      status: "risk-flagged" as const,
    },
  ];

  const mockComparisonData = mockProposals.map((p) => ({
    vendorName: p.vendorName,
    technicalFit: p.technicalFit,
    deliveryRisk: p.deliveryRisk,
    cost: p.cost,
    compliance: p.compliance,
    integration: p.overallScore > 80 ? ("easy" as const) : p.overallScore > 70 ? ("moderate" as const) : ("complex" as const),
    support: p.overallScore > 80 ? ("24/7" as const) : ("business-hours" as const),
  }));

  const mockRadarData = [
    {
      name: "TechVendor Pro",
      color: "hsl(210, 100%, 60%)",
      data: [
        { criterion: "Technical Fit", score: 92 },
        { criterion: "Cost", score: 75 },
        { criterion: "Compliance", score: 95 },
        { criterion: "Support", score: 88 },
        { criterion: "Integration", score: 90 },
      ],
    },
    {
      name: "CloudSolutions Inc",
      color: "hsl(142, 71%, 55%)",
      data: [
        { criterion: "Technical Fit", score: 85 },
        { criterion: "Cost", score: 88 },
        { criterion: "Compliance", score: 88 },
        { criterion: "Support", score: 80 },
        { criterion: "Integration", score: 78 },
      ],
    },
    {
      name: "Enterprise Systems",
      color: "hsl(38, 92%, 60%)",
      data: [
        { criterion: "Technical Fit", score: 78 },
        { criterion: "Cost", score: 65 },
        { criterion: "Compliance", score: 92 },
        { criterion: "Support", score: 85 },
        { criterion: "Integration", score: 70 },
      ],
    },
  ];

  const handleDownloadReport = () => {
    console.log("Downloading shortlisting report...");
    // todo: remove mock functionality - Implement actual report download
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
                AI-generated evaluation of 3 vendor proposals
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
              value="85%"
              subtitle="Across all proposals"
              icon={CheckCircle2}
              trend="up"
              trendValue="+12% above threshold"
            />
            <ScoreCard
              title="Lowest Delivery Risk"
              value="25%"
              subtitle="TechVendor Pro"
              icon={TrendingUp}
              trend="down"
              trendValue="Low risk profile"
            />
            <ScoreCard
              title="Best Value"
              value="$120K"
              subtitle="CloudSolutions Inc"
              icon={DollarSign}
            />
            <ScoreCard
              title="Highest Compliance"
              value="95%"
              subtitle="TechVendor Pro"
              icon={Shield}
              trend="up"
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Shortlisted Proposals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProposals.map((proposal, index) => (
                <ProposalCard
                  key={index}
                  {...proposal}
                  onViewDetails={() => console.log(`View details for ${proposal.vendorName}`)}
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
              <RadarChart vendors={mockRadarData} />
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
              <ComparisonTable data={mockComparisonData} />
            </CardContent>
          </Card>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Role-Specific Insights</h2>
            <RoleViewTabs
              deliveryInsights={{
                title: "Delivery & PMO Assessment",
                items: [
                  "TechVendor Pro offers lowest timeline risk with 8-12 week implementation",
                  "CloudSolutions Inc has moderate dependencies but competitive pricing",
                  "Enterprise Systems requires complex integration affecting timeline",
                  "All vendors have adequate team capability for project scope",
                ],
              }}
              productInsights={{
                title: "Product Requirements Coverage",
                items: [
                  "TechVendor Pro provides 92% feature coverage of core requirements",
                  "All vendors support mobile platform requirements",
                  "CloudSolutions Inc offers strongest customization options",
                  "Enterprise Systems has best roadmap alignment for future phases",
                ],
              }}
              architectureInsights={{
                title: "Architecture & Security Analysis",
                items: [
                  "All vendors meet enterprise security compliance standards",
                  "TechVendor Pro has simplest integration architecture",
                  "Enterprise Systems offers most mature microservices approach",
                  "CloudSolutions Inc provides adequate but moderate complexity APIs",
                ],
              }}
              engineeringInsights={{
                title: "Engineering & Quality Assessment",
                items: [
                  "TechVendor Pro has comprehensive SDK documentation and examples",
                  "All vendors provide sandbox environments for testing",
                  "CloudSolutions Inc has largest developer community",
                  "Enterprise Systems offers most robust automated testing tools",
                ],
              }}
              procurementInsights={{
                title: "Commercial & TCO Analysis",
                items: [
                  "CloudSolutions Inc offers best initial pricing at $120K-$150K",
                  "TechVendor Pro provides competitive 3-year TCO with 99.9% SLA",
                  "Enterprise Systems has highest cost but includes premium support",
                  "All vendors offer flexible contract terms and volume discounts",
                ],
              }}
            />
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Recommendation</CardTitle>
              <CardDescription>
                AI-generated recommendation based on weighted scoring
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Based on the comprehensive multi-criteria evaluation, <span className="font-semibold">TechVendor Pro</span> is
                recommended as the preferred vendor with an overall fit score of 87%.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Key Strengths:</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-chart-2 mt-1">•</span>
                    <span>Highest technical fit (92%) with strong alignment to requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-chart-2 mt-1">•</span>
                    <span>Lowest delivery risk (25%) enabling faster time to value</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-chart-2 mt-1">•</span>
                    <span>Best compliance score (95%) reducing regulatory concerns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-chart-2 mt-1">•</span>
                    <span>Comprehensive documentation and developer support</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-2 pt-2">
                <h4 className="font-semibold text-sm">Next Steps:</h4>
                <ol className="space-y-1 text-sm list-decimal list-inside">
                  <li>Schedule technical deep-dive with TechVendor Pro</li>
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
