"use client";

type RiskItem = {
  id: string;
  title: string;
  reason: string;
};

type RiskAlertPanelProps = {
  title?: string;
  risks?: RiskItem[];
};

export default function RiskAlertPanel({
  title = "Things You Might Be Missing",
  risks = [],
}: RiskAlertPanelProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 max-w-md">
      <h2 className="text-lg font-semibold text-red-700 mb-3">{title}</h2>

      {risks.length === 0 ? (
        <p className="text-sm text-red-400">
          No immediate risks detected. You’re on track.
        </p>
      ) : (
        <ul className="space-y-2">
          {risks.map((risk) => (
            <li
              key={risk.id}
              className="bg-white border rounded-md px-3 py-2"
            >
              <p className="font-medium">{risk.title}</p>
              <p className="text-sm text-gray-500">{risk.reason}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
