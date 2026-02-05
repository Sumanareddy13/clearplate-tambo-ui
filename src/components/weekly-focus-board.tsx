"use client";

type FocusItem = {
  id: string;
  title: string;
  done?: boolean;
};

type WeeklyFocusBoardProps = {
  weekLabel?: string; // e.g. "Feb 3 – Feb 9"
  thisWeekItems?: FocusItem[];
  nextWeekItems?: FocusItem[];
};

export default function WeeklyFocusBoard({
  weekLabel = "This Week",
  thisWeekItems = [],
  nextWeekItems = [],
}: WeeklyFocusBoardProps) {
  return (
    <div className="bg-white rounded-xl border p-4 w-full max-w-3xl">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-semibold">Weekly Focus Board</h2>
          <p className="text-sm text-gray-500">{weekLabel}</p>
        </div>
        <div className="text-xs text-gray-400">ClearPlate</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* THIS WEEK */}
        <div className="rounded-lg border p-3">
          <h3 className="font-medium mb-2">This Week</h3>

          {thisWeekItems.length === 0 ? (
            <p className="text-sm text-gray-400">No items for this week.</p>
          ) : (
            <ul className="space-y-2">
              {thisWeekItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 border rounded-md px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={!!item.done} readOnly />
                    <span className={item.done ? "line-through text-gray-400" : ""}>
                      {item.title}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* NEXT WEEK */}
        <div className="rounded-lg border p-3">
          <h3 className="font-medium mb-2">Next Week</h3>

          {nextWeekItems.length === 0 ? (
            <p className="text-sm text-gray-400">No items for next week.</p>
          ) : (
            <ul className="space-y-2">
              {nextWeekItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 border rounded-md px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={!!item.done} readOnly />
                    <span className={item.done ? "line-through text-gray-400" : ""}>
                      {item.title}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
