import React, { useMemo } from "react";
import { Card, Skeleton } from "antd";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { Lead } from "../../data/data";
import { getActivityData } from "../../utils/chartTransformers";

interface ActivityTimelineProps {
  leads: Lead[];
  loading: boolean;
}

function formatDateLabel(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  leads,
  loading,
}) => {
  const chartData = useMemo(() => getActivityData(leads), [leads]);

  return (
    <Card
      className="dashboard-chart-card"
      title={
        <span className="dashboard-chart-card__title">📈 Lead Velocity</span>
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
          <AreaChart
            data={chartData}
            margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
          >
            <defs>
              <linearGradient id="activityGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4A90D9" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#4A90D9" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#6B7A8D" }}
              tickLine={false}
              axisLine={{ stroke: "#e3ebf3" }}
              tickFormatter={formatDateLabel}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#6B7A8D" }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                fontSize: 13,
              }}
              labelFormatter={(label) => formatDateLabel(String(label))}
              formatter={
                ((value: number) => [
                  `${value} interaction${value !== 1 ? "s" : ""}`,
                  "Activity",
                ]) as any
              }
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#4A90D9"
              strokeWidth={2.5}
              fill="url(#activityGrad)"
              dot={{ r: 3.5, fill: "#4A90D9", strokeWidth: 0 }}
              activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export default ActivityTimeline;
