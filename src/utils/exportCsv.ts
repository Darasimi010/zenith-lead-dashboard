import type { Lead } from "../data/data";

export function exportToCsv(
  leads: Lead[],
  filename = "zenith-leads-report.csv",
): void {
  if (leads.length === 0) return;

  const headers = [
    "ID",
    "Name",
    "Email",
    "Status",
    "Assigned Agent",
    "Value ($)",
    "Last Activity",
  ];

  const rows = leads.map((lead) => [
    lead.id,
    `"${lead.name}"`,
    lead.email,
    lead.status,
    `"${lead.assignedAgent}"`,
    lead.value.toString(),
    new Date(lead.lastActivity).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
