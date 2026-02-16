import React from "react";
import { Input, Select, Button, Space } from "antd";
import {
  SearchOutlined,
  DownloadOutlined,
  WarningOutlined,
  FilterOutlined,
} from "@ant-design/icons";

interface FilterBarProps {
  searchText: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  onExport: () => void;
  onSimulateError: () => void;
  resultCount: number;
}

const statusOptions = [
  { label: "All Statuses", value: "All" },
  { label: "🔵 New", value: "New" },
  { label: "🟢 Contacted", value: "Contacted" },
  { label: "🟡 Qualified", value: "Qualified" },
  { label: "🔴 Lost", value: "Lost" },
];

const FilterBar: React.FC<FilterBarProps> = ({
  searchText,
  onSearchChange,
  statusFilter,
  onStatusChange,
  onExport,
  onSimulateError,
  resultCount,
}) => {
  return (
    <div className="filter-bar">
      <div className="filter-bar__left">
        <Input
          placeholder="Search by name or email..."
          prefix={<SearchOutlined style={{ color: "#8899A6" }} />}
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          allowClear
          className="filter-bar__search"
          style={{ width: 300 }}
        />

        <Select
          value={statusFilter}
          onChange={onStatusChange}
          options={statusOptions}
          style={{ width: 180 }}
          suffixIcon={<FilterOutlined />}
        />

        <span className="filter-bar__count">
          {resultCount} lead{resultCount !== 1 ? "s" : ""} found
        </span>
      </div>

      <Space>
        <Button
          icon={<WarningOutlined />}
          onClick={onSimulateError}
          danger
          type="text"
          size="small"
        >
          Simulate Error
        </Button>
        <Button type="primary" icon={<DownloadOutlined />} onClick={onExport}>
          Export Report
        </Button>
      </Space>
    </div>
  );
};

export default FilterBar;
