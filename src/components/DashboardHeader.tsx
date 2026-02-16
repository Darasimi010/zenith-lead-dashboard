import React from "react";
import { Typography, Space, Card, Statistic, Row, Col } from "antd";
import {
  TeamOutlined,
  StarOutlined,
  CheckCircleOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import type { Lead } from "../data/data";

const { Title, Text } = Typography;

interface DashboardHeaderProps {
  leads: Lead[];
  loading: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  leads,
  loading,
}) => {
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const qualifiedLeads = leads.filter((l) => l.status === "Qualified").length;
  const totalValue = leads.reduce((sum, l) => sum + l.value, 0);

  const stats = [
    {
      title: "Total Leads",
      value: totalLeads,
      icon: <TeamOutlined />,
      color: "#4A90D9",
    },
    {
      title: "New Leads",
      value: newLeads,
      icon: <StarOutlined />,
      color: "#4A90D9",
    },
    {
      title: "Qualified",
      value: qualifiedLeads,
      icon: <CheckCircleOutlined />,
      color: "#D4A843",
    },
    {
      title: "Portfolio Value",
      value: totalValue,
      prefix: "$",
      icon: <DollarOutlined />,
      color: "#389E6E",
    },
  ];

  return (
    <div className="dashboard-header">
      <div className="dashboard-header__title-section">
        <Space direction="vertical" size={0}>
          <Title
            level={2}
            style={{ margin: 0, color: "#fff", fontWeight: 700 }}
          >
            ⚡ Agent & Lead Command
          </Title>
          <Text style={{ color: "rgba(255,255,255,0.75)", fontSize: 14 }}>
            Zenith Realty Partners — Internal Lead Management
          </Text>
        </Space>
      </div>

      <Row gutter={[16, 16]} className="dashboard-header__stats">
        {stats.map((stat) => (
          <Col xs={12} sm={6} key={stat.title}>
            <Card
              className="stat-card"
              loading={loading}
              styles={{ body: { padding: "16px 20px" } }}
            >
              <Statistic
                title={
                  <span
                    style={{ color: "#6B7A8D", fontSize: 12, fontWeight: 500 }}
                  >
                    {stat.icon} {stat.title}
                  </span>
                }
                value={stat.value}
                prefix={stat.prefix}
                valueStyle={{
                  color: stat.color,
                  fontSize: 24,
                  fontWeight: 700,
                }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DashboardHeader;
