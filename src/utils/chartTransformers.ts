import type { Lead } from "../data/data";

/* ── Status Colors (match Ant Design Tag presets) ── */
const STATUS_COLORS: Record<Lead["status"], string> = {
  New: "#1677FF",
  Contacted: "#52C41A",
  Qualified: "#FAAD14",
  Lost: "#FF4D4F",
};

/* ── Agent Colors (match LeadTable avatars) ── */
const AGENT_COLORS: Record<string, string> = {
  "Sarah Jenkins": "#4A90D9",
  "Mike Ross": "#389E6E",
  "Jessica Pearson": "#9B59B6",
  "Harvey Specter": "#D4A843",
};

export { AGENT_COLORS };

/* ── Widget A: Pipeline Health (donut) ── */
export interface StatusDatum {
  name: string;
  value: number;
  fill: string;
}

export function getStatusData(leads: Lead[]): StatusDatum[] {
  const counts: Record<string, number> = {};
  for (const lead of leads) {
    counts[lead.status] = (counts[lead.status] ?? 0) + 1;
  }
  return Object.entries(counts).map(([status, count]) => ({
    name: status,
    value: count,
    fill: STATUS_COLORS[status as Lead["status"]] ?? "#999",
  }));
}

/* ── Widget B: Agent Performance (bar) ── */
export interface AgentDatum {
  name: string;
  totalValue: number;
  fill: string;
}

export function getAgentValueData(leads: Lead[]): AgentDatum[] {
  const sums: Record<string, number> = {};
  for (const lead of leads) {
    sums[lead.assignedAgent] = (sums[lead.assignedAgent] ?? 0) + lead.value;
  }
  return Object.entries(sums)
    .map(([agent, total]) => ({
      name: agent,
      totalValue: total,
      fill: AGENT_COLORS[agent] ?? "#999",
    }))
    .sort((a, b) => b.totalValue - a.totalValue);
}

/* ── Widget C: Lead Velocity (area) ── */
export interface ActivityDatum {
  date: string;
  count: number;
}

export function getActivityData(leads: Lead[]): ActivityDatum[] {
  const buckets: Record<string, number> = {};
  for (const lead of leads) {
    const day = lead.lastActivity.slice(0, 10); // YYYY-MM-DD
    buckets[day] = (buckets[day] ?? 0) + 1;
  }
  return Object.entries(buckets)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
