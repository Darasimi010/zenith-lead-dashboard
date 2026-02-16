import React, { useMemo } from "react";
import { Card, Skeleton } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Lead } from "../../data/data";
import { getStatusData } from "../../utils/chartTransformers";

interface StatusChartProps {
  leads: Lead[];
  loading: boolean;
}

const StatusChart: React.FC<StatusChartProps> = ({ leads, loading }) => {
  const chartData = useMemo(() => getStatusData(leads), [leads]);

  return (
    <Card
      className="dashboard-chart-card"
      title={
        <span className="dashboard-chart-card__title">🎯 Pipeline Health</span>
      }
      styles={{ body: { padding: "12px 16px 16px" } }}
    >
      {loading ? (
        <Skeleton.Node
          active
          style={{ width: "100%", height: 260, borderRadius: 8 }}
        >
          <span />
        </Skeleton.Node>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="80%"
              paddingAngle={3}
              strokeWidth={0}
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                fontSize: 13,
              }}
              formatter={
                ((value: number, name: string) => [
                  `${value} leads`,
                  name,
                ]) as any
              }
            />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export default StatusChart;
