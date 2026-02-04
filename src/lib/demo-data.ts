export type Deadline = {
  id: string;
  title: string;
  date: string;
  severity?: "low" | "medium" | "high";
};

export const demoDeadlines: Deadline[] = [
  { id: "d1", title: "Pay internet bill", date: "2026-02-07", severity: "high" },
  { id: "d2", title: "Cancel trial subscription", date: "2026-02-09", severity: "medium" },
  { id: "d3", title: "Car insurance renewal", date: "2026-02-14", severity: "high" },
  { id: "d4", title: "Submit apartment maintenance request", date: "2026-02-12", severity: "low" },
];
