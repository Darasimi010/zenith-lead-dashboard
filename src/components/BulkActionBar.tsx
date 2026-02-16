import React from "react";
import { Button, Space, Typography } from "antd";
import { StopOutlined, PhoneOutlined, CloseOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface BulkActionBarProps {
  selectedCount: number;
  selectedIds: string[];
  onDeactivate: () => void;
  onMarkContacted: () => void;
  onClearSelection: () => void;
}

const BulkActionBar: React.FC<BulkActionBarProps> = ({
  selectedCount,
  selectedIds,
  onDeactivate,
  onMarkContacted,
  onClearSelection,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="bulk-action-bar">
      <div className="bulk-action-bar__inner">
        <Text strong style={{ color: "#1B3A5C" }}>
          {selectedCount} lead{selectedCount !== 1 ? "s" : ""} selected
        </Text>

        <Space>
          <Button
            icon={<StopOutlined />}
            danger
            onClick={() => {
              console.log("🚫 Deactivating leads:", selectedIds);
              onDeactivate();
            }}
          >
            Deactivate Leads
          </Button>

          <Button
            icon={<PhoneOutlined />}
            type="primary"
            onClick={() => {
              console.log("📞 Marking as Contacted:", selectedIds);
              onMarkContacted();
            }}
            style={{ background: "#389E6E", borderColor: "#389E6E" }}
          >
            Mark as Contacted
          </Button>

          <Button
            icon={<CloseOutlined />}
            type="text"
            onClick={onClearSelection}
          >
            Clear
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default BulkActionBar;
