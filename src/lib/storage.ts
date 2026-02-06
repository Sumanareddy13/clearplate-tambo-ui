import { demoFocusItems } from "@/lib/demo-data";

export type FocusBucket = "thisWeek" | "nextWeek";

export type FocusItem = {
  id: string;
  title: string;
  bucket: FocusBucket;
  done?: boolean;
};

const KEY = "clearplate_focus_items_v1";

export function loadFocusItems(): FocusItem[] {
  if (typeof window === "undefined") return demoFocusItems;
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return demoFocusItems;
  try {
    return JSON.parse(raw) as FocusItem[];
  } catch {
    return demoFocusItems;
  }
}

export function saveFocusItems(items: FocusItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(items));
}

export function resetFocusItems() {
  saveFocusItems(demoFocusItems);
}
