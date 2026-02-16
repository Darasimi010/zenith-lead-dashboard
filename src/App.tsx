import React, { useState, useMemo, useCallback } from "react";
import { Alert, Button, message } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import type { Key } from "react";
import DashboardHeader from "./components/DashboardHeader";
import FilterBar from "./components/FilterBar";
import BulkActionBar from "./components/BulkActionBar";
import LeadTable from "./components/LeadTable";
import { useLeads } from "./hooks/useLeads";
import { exportToCsv } from "./utils/exportCsv";

const App: React.FC = () => {
  const { leads, loading, error, refetch, simulateError } = useLeads();
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  // Filter leads based on search text and status
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        searchText === "" ||
        lead.name.toLowerCase().includes(searchText.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchText.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, searchText, statusFilter]);

  const handleExport = useCallback(() => {
    if (filteredLeads.length === 0) {
      void messageApi.warning("No leads to export with current filters.");
      return;
    }
    exportToCsv(filteredLeads);
    void messageApi.success(`Exported ${filteredLeads.length} leads to CSV.`);
  }, [filteredLeads, messageApi]);

  const handleDeactivate = useCallback(() => {
    void messageApi.info(
      `Deactivated ${selectedRowKeys.length} lead(s). Check console for IDs.`,
    );
    setSelectedRowKeys([]);
  }, [selectedRowKeys, messageApi]);

  const handleMarkContacted = useCallback(() => {
    void messageApi.success(
      `Marked ${selectedRowKeys.length} lead(s) as Contacted. Check console for IDs.`,
    );
    setSelectedRowKeys([]);
  }, [selectedRowKeys, messageApi]);

  const handleClearSelection = useCallback(() => {
    setSelectedRowKeys([]);
  }, []);

  const handleSimulateError = useCallback(() => {
    simulateError();
    refetch();
  }, [simulateError, refetch]);

  return (
    <div className="app-shell">
      {contextHolder}

      <DashboardHeader leads={filteredLeads} loading={loading} />

      <div className="app-shell__content">
        {error && (
          <Alert
            message="Data Fetch Error"
            description={error}
            type="error"
            showIcon
            closable
            action={
              <Button
                size="small"
                icon={<ReloadOutlined />}
                onClick={refetch}
                type="primary"
                danger
              >
                Retry
              </Button>
            }
            style={{ marginBottom: 16, borderRadius: 10 }}
          />
        )}

        <FilterBar
          searchText={searchText}
          onSearchChange={setSearchText}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          onExport={handleExport}
          onSimulateError={handleSimulateError}
          resultCount={filteredLeads.length}
        />

        <BulkActionBar
          selectedCount={selectedRowKeys.length}
          selectedIds={selectedRowKeys.map(String)}
          onDeactivate={handleDeactivate}
          onMarkContacted={handleMarkContacted}
          onClearSelection={handleClearSelection}
        />

        <LeadTable
          leads={filteredLeads}
          loading={loading}
          selectedRowKeys={selectedRowKeys}
          onSelectionChange={setSelectedRowKeys}
        />
      </div>
    </div>
  );
};

export default App;
