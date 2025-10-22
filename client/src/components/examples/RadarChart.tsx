import { RadarChart } from "../RadarChart";

export default function RadarChartExample() {
  const vendors = [
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

  return (
    <div className="p-6">
      <RadarChart vendors={vendors} />
    </div>
  );
}
