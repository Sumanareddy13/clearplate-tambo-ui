"use client";

import { MessageThreadFull } from "@/components/tambo/message-thread-full";
import { components, tools } from "@/lib/tambo";
import { TamboProvider } from "@tambo-ai/react";
import { useMemo, useState } from "react";

export default function ClearPlateDashboard() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const demoPrompts = useMemo(
    () => [
      {
        title: "1) Weekly planning (interactive)",
        items: [
          "What should I focus on this week?",
          "Move cancel trial subscription to next week",
          "Mark meal prep for 3 days as done",
        ],
      },
      {
        title: "2) Awareness",
        items: ["What am I missing?", "Show deadlines for the next two weeks"],
      },
      {
        title: "3) Money (coming today)",
        items: ["Show money stuff", "What payments are coming up?"],
      },
    ],
    []
  );

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      window.setTimeout(() => setCopiedText(null), 1200);
    } catch {
      // ignore
    }
  };

  return (
    <TamboProvider
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
      components={components}
      tools={tools}
      tamboUrl={process.env.NEXT_PUBLIC_TAMBO_URL}
    >
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b bg-white/70 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded-xl border bg-white flex items-center justify-center font-semibold">
                CP
              </div>

              <div className="min-w-0">
                <div className="text-lg font-semibold leading-tight truncate">
                  ClearPlate
                </div>
                <div className="text-xs text-gray-600">
                  Your plate is full. Say what you need — ClearPlate turns it
                  into a live, updateable UI.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 shrink-0">
              <span className="rounded-full border px-2 py-1 bg-white">
                Demo Mode
              </span>
              <span className="rounded-full border px-2 py-1 bg-white">
                UI Strikes Back
              </span>
              <span className="rounded-full border px-2 py-1 bg-white">
                Tambo Cloud
              </span>
            </div>
          </div>
        </header>

        {/* Body */}
        <main className="mx-auto max-w-7xl px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left: Demo prompts (compact + structured) */}
            <aside className="lg:col-span-1 order-2 lg:order-1">
              <div className="rounded-2xl border bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold mb-0.5">
                      Demo prompts
                    </div>
                    <div className="text-xs text-gray-500">
                      Click to copy. Run top-to-bottom.
                    </div>
                  </div>
                  <a
                    href="/chat"
                    className="text-xs px-2 py-1 rounded-md border hover:bg-gray-50"
                    title="Open chat route"
                  >
                    /chat
                  </a>
                </div>

                <div className="mt-4 space-y-4">
                  {demoPrompts.map((group) => (
                    <div key={group.title}>
                      <div className="text-xs font-semibold text-gray-700 mb-2">
                        {group.title}
                      </div>
                      <div className="space-y-2 text-xs">
                        {group.items.map((p) => (
                          <PromptChip
                            key={p}
                            text={p}
                            copied={copiedText === p}
                            onCopy={() => copy(p)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-[11px] text-gray-500">
                  Tip: After the board renders, try a follow-up edit (move,
                  mark-done) to show persistent updates.
                </div>
              </div>
            </aside>

            {/* Right: Chat */}
            <section className="lg:col-span-4 order-1 lg:order-2">
              <div className="rounded-2xl border bg-white p-4 h-[82vh] flex flex-col">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold">Command Center</div>
                    <div className="text-xs text-gray-500">
                      Natural language - components - persistent updates
                    </div>
                  </div>

                  <div className="text-xs text-gray-400">
                    Demo: Weekly board - edit - deadlines - risk - money
                  </div>
                </div>

                <div className="flex-1 min-h-0 overflow-hidden rounded-xl border bg-white">
                  <MessageThreadFull />
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </TamboProvider>
  );
}

function PromptChip({
  text,
  onCopy,
  copied,
}: {
  text: string;
  onCopy: () => void;
  copied?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onCopy}
      className="w-full text-left rounded-lg border px-3 py-2 bg-white hover:bg-gray-50"
      title="Click to copy"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-gray-900">{text}</span>
        {copied ? (
          <span className="text-[10px] text-green-600 border border-green-200 bg-green-50 px-2 py-0.5 rounded-full">
            Copied
          </span>
        ) : (
          <span className="text-[10px] text-gray-400">Copy</span>
        )}
      </div>
    </button>
  );
}
