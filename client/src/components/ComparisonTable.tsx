import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface ComparisonData {
  vendorName: string;
  technicalFit: number;
  deliveryRisk: number;
  cost: string;
  compliance: number;
  integration: "easy" | "moderate" | "complex";
  support: "24/7" | "business-hours" | "limited";
}

interface ComparisonTableProps {
  data: ComparisonData[];
}

export function ComparisonTable({ data }: ComparisonTableProps) {
  const getIntegrationIcon = (level: string) => {
    switch (level) {
      case "easy":
        return <CheckCircle2 className="h-4 w-4 text-chart-2" />;
      case "moderate":
        return <AlertCircle className="h-4 w-4 text-chart-3" />;
      case "complex":
        return <XCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-chart-2";
    if (score >= 60) return "text-chart-3";
    return "text-destructive";
  };

  return (
    <div className="rounded-lg border" data-testid="table-comparison">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Vendor</TableHead>
            <TableHead>Technical Fit</TableHead>
            <TableHead>Delivery Risk</TableHead>
            <TableHead>Cost Estimate</TableHead>
            <TableHead>Compliance</TableHead>
            <TableHead>Integration</TableHead>
            <TableHead>Support</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index} data-testid={`row-vendor-${index}`}>
              <TableCell className="font-semibold">{row.vendorName}</TableCell>
              <TableCell>
                <span className={`font-mono font-semibold ${getScoreColor(row.technicalFit)}`}>
                  {row.technicalFit}%
                </span>
              </TableCell>
              <TableCell>
                <span className={`font-mono font-semibold ${getScoreColor(100 - row.deliveryRisk)}`}>
                  {row.deliveryRisk}%
                </span>
              </TableCell>
              <TableCell className="font-mono">{row.cost}</TableCell>
              <TableCell>
                <span className={`font-mono font-semibold ${getScoreColor(row.compliance)}`}>
                  {row.compliance}%
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getIntegrationIcon(row.integration)}
                  <span className="capitalize text-sm">{row.integration}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs">
                  {row.support}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
