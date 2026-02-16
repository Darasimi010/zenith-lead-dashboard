import React from "react";
import { Table, Tag, Avatar, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { Lead } from "../data/data";
import type { Key } from "react";

interface LeadTableProps {
  leads: Lead[];
  loading: boolean;
  selectedRowKeys: Key[];
  onSelectionChange: (keys: Key[]) => void;
}

const statusConfig: Record<Lead["status"], { color: string; label: string }> = {
  New: { color: "blue", label: "New" },
  Contacted: { color: "green", label: "Contacted" },
  Qualified: { color: "gold", label: "Qualified" },
  Lost: { color: "red", label: "Lost" },
};

const agentColors: Record<string, string> = {
  "Sarah Jenkins": "#4A90D9",
  "Mike Ross": "#389E6E",
  "Jessica Pearson": "#9B59B6",
  "Harvey Specter": "#D4A843",
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const columns: ColumnsType<Lead> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    fixed: "left",
    width: 180,
    render: (name: string) => (
      <span style={{ fontWeight: 600, color: "#1B3A5C" }}>{name}</span>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 220,
    render: (email: string) => (
      <span style={{ color: "#6B7A8D" }}>{email}</span>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 120,
    filters: [
      { text: "New", value: "New" },
      { text: "Contacted", value: "Contacted" },
      { text: "Qualified", value: "Qualified" },
      { text: "Lost", value: "Lost" },
    ],
    onFilter: (value, record) => record.status === value,
    render: (status: Lead["status"]) => {
      const config = statusConfig[status];
      return (
        <Tag
          color={config.color}
          style={{
            borderRadius: 12,
            fontWeight: 600,
            fontSize: 12,
            padding: "2px 12px",
          }}
        >
          {config.label}
        </Tag>
      );
    },
  },
  {
    title: "Assigned Agent",
    dataIndex: "assignedAgent",
    key: "assignedAgent",
    width: 200,
    filters: [
      { text: "Sarah Jenkins", value: "Sarah Jenkins" },
      { text: "Mike Ross", value: "Mike Ross" },
      { text: "Jessica Pearson", value: "Jessica Pearson" },
      { text: "Harvey Specter", value: "Harvey Specter" },
    ],
    onFilter: (value, record) => record.assignedAgent === value,
    render: (agent: string) => {
      const bgColor = agentColors[agent] ?? "#999";
      return (
        <Tooltip title={agent}>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Avatar
              size={28}
              style={{
                backgroundColor: bgColor,
                fontSize: 11,
                fontWeight: 600,
              }}
              icon={<UserOutlined />}
            >
              {getInitials(agent)}
            </Avatar>
            <span style={{ color: "#344054" }}>{agent}</span>
          </span>
        </Tooltip>
      );
    },
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
    width: 150,
    sorter: (a, b) => a.value - b.value,
    defaultSortOrder: "descend",
    render: (value: number) => (
      <span
        style={{
          fontWeight: 600,
          color: "#389E6E",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {formatCurrency(value)}
      </span>
    ),
  },
  {
    title: "Last Activity",
    dataIndex: "lastActivity",
    key: "lastActivity",
    width: 150,
    sorter: (a, b) =>
      new Date(a.lastActivity).getTime() - new Date(b.lastActivity).getTime(),
    render: (date: string) => (
      <span style={{ color: "#6B7A8D" }}>{formatDate(date)}</span>
    ),
  },
];

const LeadTable: React.FC<LeadTableProps> = ({
  leads,
  loading,
  selectedRowKeys,
  onSelectionChange,
}) => {
  return (
    <div className="lead-table-wrapper">
      <Table<Lead>
        columns={columns}
        dataSource={leads}
        rowKey="id"
        loading={loading}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => onSelectionChange(keys as Key[]),
          columnWidth: 48,
        }}
        pagination={{
          defaultPageSize: 10,
          pageSizeOptions: ["10", "20", "50"],
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}–${range[1]} of ${total} leads`,
          style: { padding: "12px 16px", margin: 0 },
        }}
        scroll={{ x: 1070 }}
        size="middle"
        style={{ borderRadius: 12, overflow: "hidden" }}
      />
    </div>
  );
};

export default LeadTable;
