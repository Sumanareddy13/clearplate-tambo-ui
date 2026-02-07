"use client";

import { useEffect, useMemo, useState } from "react";
import {
  loadFocusItems,
  saveFocusItems,
  resetFocusItems,
  type FocusItem,
} from "@/lib/storage";

type WeeklyFocusBoardProps = {
  weekLabel?: string;
  items?: FocusItem[];
};

export default function WeeklyFocusBoard({
  weekLabel = "This Week",
  items,
}: WeeklyFocusBoardProps) {
  const [focusItems, setFocusItems] = useState<FocusItem[]>([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const loaded = loadFocusItems();
    setFocusItems(loaded);
    setHasMounted(true);
  }, []);


  useEffect(() => {
    if (!hasMounted) return;
    if (!items || items.length === 0) return;

    saveFocusItems(items);
    setFocusItems(items);
  }, [hasMounted, items]);

  const thisWeekItems = useMemo(
    () => focusItems.filter((i) => i.bucket === "thisWeek"),
    [focusItems],
  );

  const nextWeekItems = useMemo(
    () => focusItems.filter((i) => i.bucket === "nextWeek"),
    [focusItems],
  );

  const handleReset = () => {
    resetFocusItems();
    const loaded = loadFocusItems();
    setFocusItems(loaded);
  };

  return (
    <div className="bg-white rounded-xl border p-4 w-full max-w-3xl">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-semibold">Weekly Focus Board</h2>
          <p className="text-sm text-gray-500">{weekLabel}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="text-xs px-3 py-1 rounded-md border bg-white hover:bg-gray-50"
            type="button"
          >
            Reset demo
          </button>
          <div className="text-xs text-gray-400">ClearPlate</div>
        </div>
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
                    <span
                      className={item.done ? "line-through text-gray-400" : ""}
                      title={`id: ${item.id}`}
                    >
                      {item.title}
                    </span>
                  </div>

                  {/* Tiny id tag helps Tambo reference items more reliably */}
                  <span className="text-[10px] text-gray-400">{item.id}</span>
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
                    <span
                      className={item.done ? "line-through text-gray-400" : ""}
                      title={`id: ${item.id}`}
                    >
                      {item.title}
                    </span>
                  </div>

                  <span className="text-[10px] text-gray-400">{item.id}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-3">
        Tip: Try “Move cancel trial subscription to next week” or “Mark meal prep
        as done”.
      </p>
    </div>
  );
}
