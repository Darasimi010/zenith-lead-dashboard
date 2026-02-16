import React from "react";
import { Row, Col } from "antd";
import type { Lead } from "../../data/data";
import StatusChart from "./StatusChart";
import AgentLeaderboard from "./AgentLeaderboard";
import ActivityTimeline from "./ActivityTimeline";

interface DashboardMetricsProps {
  leads: Lead[];
  loading: boolean;
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({
  leads,
  loading,
}) => {
  return (
    <div className="dashboard-metrics">
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <StatusChart leads={leads} loading={loading} />
        </Col>
        <Col xs={24} lg={8}>
          <AgentLeaderboard leads={leads} loading={loading} />
        </Col>
        <Col xs={24} lg={8}>
          <ActivityTimeline leads={leads} loading={loading} />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardMetrics;
