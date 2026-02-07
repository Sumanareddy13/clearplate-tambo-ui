export type Deadline = {
  id: string;
  title: string;
  date: string;
  severity?: "low" | "medium" | "high";
};

export const demoDeadlines: Deadline[] = [
  { id: "d1", title: "Pay internet bill", date: "2026-02-07", severity: "high" },
  {
    id: "d2",
    title: "Cancel trial subscription",
    date: "2026-02-09",
    severity: "medium",
  },
  {
    id: "d3",
    title: "Car insurance renewal",
    date: "2026-02-14",
    severity: "high",
  },
  {
    id: "d4",
    title: "Submit apartment maintenance request",
    date: "2026-02-12",
    severity: "low",
  },
];

export type FocusItem = {
  id: string;
  title: string;
  bucket: "thisWeek" | "nextWeek";
  done?: boolean;
};

export const demoFocusItems: FocusItem[] = [
  { id: "f1", title: "Write a blog post", bucket: "thisWeek", done: false },
  { id: "f2", title: "Meal prep for 3 days", bucket: "thisWeek", done: false },
  { id: "f3", title: "Cancel trial subscription", bucket: "thisWeek", done: false },
  {
    id: "f4",
    title: "Clean up resumes / apply to 5 roles",
    bucket: "nextWeek",
    done: false,
  },
  { id: "f5", title: "Plan weekend errands", bucket: "nextWeek", done: false },
];

export type MoneyItem = {
  id: string;
  name: string;
  type: "bill" | "subscription";
  dueDate: string; // YYYY-MM-DD
  amountUsd: number;
  cadence?: "monthly" | "yearly" | "one-time";
  note?: string;
};

export const demoMoneyItems: MoneyItem[] = [
  {
    id: "m1",
    name: "Internet",
    type: "bill",
    dueDate: "2026-02-07",
    amountUsd: 70,
    cadence: "monthly",
  },
  {
    id: "m2",
    name: "Netflix",
    type: "subscription",
    dueDate: "2026-02-09",
    amountUsd: 15.49,
    cadence: "monthly",
    note: "Trial ends soon",
  },
  {
    id: "m3",
    name: "Car insurance",
    type: "bill",
    dueDate: "2026-02-14",
    amountUsd: 210,
    cadence: "monthly",
  },
  {
    id: "m4",
    name: "Gym membership",
    type: "subscription",
    dueDate: "2026-02-16",
    amountUsd: 35,
    cadence: "monthly",
  },
  {
    id: "m5",
    name: "Domain renewal",
    type: "subscription",
    dueDate: "2026-02-20",
    amountUsd: 12,
    cadence: "yearly",
  },
];
