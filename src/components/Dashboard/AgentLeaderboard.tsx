import React, { useMemo } from "react";
import { Card, Skeleton } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { Lead } from "../../data/data";
import { getAgentValueData } from "../../utils/chartTransformers";

interface AgentLeaderboardProps {
  leads: Lead[];
  loading: boolean;
}

function formatCurrencyShort(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

function formatCurrencyFull(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

const AgentLeaderboard: React.FC<AgentLeaderboardProps> = ({
  leads,
  loading,
}) => {
  const chartData = useMemo(() => getAgentValueData(leads), [leads]);

  return (
    <Card
      className="dashboard-chart-card"
      title={
        <span className="dashboard-chart-card__title">
          🏆 Agent Performance
        </span>
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
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "#6B7A8D" }}
              tickLine={false}
              axisLine={{ stroke: "#e3ebf3" }}
              interval={0}
              tickFormatter={(name: any) =>
                String(name ?? "").split(" ")[0] ?? ""
              }
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#6B7A8D" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatCurrencyShort}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                fontSize: 13,
              }}
              formatter={
                ((value: number) => [
                  formatCurrencyFull(value),
                  "Total Value",
                ]) as any
              }
              labelFormatter={(label) => String(label)}
            />
            <Bar dataKey="totalValue" radius={[6, 6, 0, 0]} barSize={40}>
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export default AgentLeaderboard;
