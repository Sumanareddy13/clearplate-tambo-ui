"use client";

interface Deadline {
  id: string;
  title: string;
  date: string;
  severity?: "low" | "medium" | "high";
}

interface DeadlineTimelineProps {
  title?: string;
  rangeLabel?: string;
  deadlines?: Deadline[];
}

export default function DeadlineTimeline({
  title = "Upcoming Deadlines",
  rangeLabel,
  deadlines = [],
}: DeadlineTimelineProps) {
  return (
    <div className="bg-white rounded-xl border p-4 max-w-md">
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      {rangeLabel && (
        <p className="text-sm text-gray-500 mb-3">{rangeLabel}</p>
      )}

      {deadlines.length === 0 ? (
        <p className="text-sm text-gray-400">No deadlines found.</p>
      ) : (
        <ul className="space-y-2">
          {deadlines.map((d) => (
            <li
              key={d.id}
              className="flex justify-between items-center border rounded-md px-3 py-2"
            >
              <span>{d.title}</span>
              <span className="text-sm text-gray-500">{d.date}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
