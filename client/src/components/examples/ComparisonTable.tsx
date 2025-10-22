import { ComparisonTable } from "../ComparisonTable";

export default function ComparisonTableExample() {
  const mockData = [
    {
      vendorName: "TechVendor Pro",
      technicalFit: 92,
      deliveryRisk: 25,
      cost: "$150K - $180K",
      compliance: 95,
      integration: "easy" as const,
      support: "24/7" as const,
    },
    {
      vendorName: "CloudSolutions Inc",
      technicalFit: 85,
      deliveryRisk: 35,
      cost: "$120K - $150K",
      compliance: 88,
      integration: "moderate" as const,
      support: "business-hours" as const,
    },
    {
      vendorName: "Enterprise Systems",
      technicalFit: 78,
      deliveryRisk: 45,
      cost: "$200K - $250K",
      compliance: 92,
      integration: "complex" as const,
      support: "24/7" as const,
    },
  ];

  return (
    <div className="p-6">
      <ComparisonTable data={mockData} />
    </div>
  );
}
