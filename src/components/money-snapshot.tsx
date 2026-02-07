"use client";

import type { MoneyItem } from "@/lib/demo-data";

type MoneySnapshotProps = {
  title?: string;
  rangeLabel?: string; 
  totalUsd?: number;
  items?: MoneyItem[];
};

function formatMoney(amount: number) {
  return `$${amount.toFixed(amount % 1 === 0 ? 0 : 2)}`;
}

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map((x) => Number(x));
  if (!y || !m || !d) return dateStr;
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function MoneySnapshot({
  title = "Money Snapshot",
  rangeLabel = "Upcoming",
  totalUsd,
  items,
}: MoneySnapshotProps) {
  const safeItems = items ?? [];

  return (
    <div className="bg-white rounded-xl border p-4 w-full max-w-3xl">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-gray-500">{rangeLabel}</p>
        </div>

        <div className="text-right">
          <div className="text-xs text-gray-500">Total due</div>
          <div className="text-lg font-semibold">
            {typeof totalUsd === "number" ? formatMoney(totalUsd) : "—"}
          </div>
        </div>
      </div>

      {safeItems.length === 0 ? (
        <p className="text-sm text-gray-400">No upcoming payments found.</p>
      ) : (
        <ul className="space-y-2">
          {safeItems.map((it) => (
            <li
              key={it.id}
              className="flex items-center justify-between gap-3 border rounded-md px-3 py-2"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={
                      "text-[11px] px-2 py-0.5 rounded-full border " +
                      (it.type === "bill"
                        ? "bg-slate-50 text-slate-700 border-slate-200"
                        : "bg-indigo-50 text-indigo-700 border-indigo-200")
                    }
                  >
                    {it.type === "bill" ? "Bill" : "Subscription"}
                  </span>
                  <span className="font-medium text-gray-900 truncate">
                    {it.name}
                  </span>
                </div>

                <div className="text-xs text-gray-500 mt-0.5">
                  Due {formatDate(it.dueDate)}
                  {it.cadence ? ` • ${it.cadence}` : ""}
                  {it.note ? ` • ${it.note}` : ""}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="font-semibold">{formatMoney(it.amountUsd)}</span>
                <span className="text-[10px] text-gray-400">{it.id}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="text-xs text-gray-400 mt-3">
        Tip: Try “Show money stuff” or “What payments are coming up?”
      </p>
    </div>
  );
}
