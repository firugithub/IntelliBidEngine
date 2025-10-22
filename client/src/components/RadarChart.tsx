import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface VendorData {
  name: string;
  data: {
    criterion: string;
    score: number;
  }[];
  color: string;
}

interface RadarChartProps {
  vendors: VendorData[];
}

export function RadarChart({ vendors }: RadarChartProps) {
  const criteria = vendors[0]?.data.map((d) => d.criterion) || [];
  
  const chartData = criteria.map((criterion) => {
    const dataPoint: any = { criterion };
    vendors.forEach((vendor) => {
      const score = vendor.data.find((d) => d.criterion === criterion)?.score || 0;
      dataPoint[vendor.name] = score;
    });
    return dataPoint;
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsRadarChart data={chartData}>
        <PolarGrid strokeDasharray="3 3" />
        <PolarAngleAxis
          dataKey="criterion"
          tick={{ fontSize: 12 }}
        />
        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
        <Tooltip />
        <Legend />
        {vendors.map((vendor, index) => (
          <Radar
            key={vendor.name}
            name={vendor.name}
            dataKey={vendor.name}
            stroke={vendor.color}
            fill={vendor.color}
            fillOpacity={0.3}
          />
        ))}
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
}
