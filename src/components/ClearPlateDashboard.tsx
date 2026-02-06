"use client";

import { MessageThreadFull } from "@/components/tambo/message-thread-full";
import { useMcpServers } from "@/components/tambo/mcp-config-modal";
import { components, tools } from "@/lib/tambo";
import { TamboProvider } from "@tambo-ai/react";

export default function ClearPlateDashboard() {
  const mcpServers = useMcpServers();

  return (
    <TamboProvider
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
      components={components}
      tools={tools}
      tamboUrl={process.env.NEXT_PUBLIC_TAMBO_URL}
      mcpServers={mcpServers}
    >
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b bg-white/70 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl border bg-white flex items-center justify-center font-semibold">
                CP
              </div>
              <div>
                <div className="text-lg font-semibold leading-tight">
                  ClearPlate
                </div>
                <div className="text-xs text-gray-500">
                  Control your week with natural language — focus, deadlines, and
                  risks.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
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
          {/* Make chat BIG: 4/5 columns, prompts small: 1/5 */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left: compact demo helpers */}
            <aside className="lg:col-span-1 order-2 lg:order-1">
              <div className="rounded-2xl border bg-white p-4">
                <div className="text-sm font-semibold mb-1">Demo prompts</div>
                <div className="text-xs text-gray-500 mb-3">
                  Click-to-copy prompts for your live demo.
                </div>

                <div className="space-y-2 text-xs">
                  <PromptChip text="What should I focus on this week?" />
                  <PromptChip text="Move cancel trial subscription to next week" />
                  <PromptChip text="Mark meal prep for 3 days as done" />
                  <PromptChip text="What am I missing?" />
                  <PromptChip text="Show deadlines for the next two weeks" />
                </div>

                <div className="mt-4 text-[11px] text-gray-500">
                  Tip: After a prompt renders UI, follow up with an edit like
                  “move it to next week” to show in-place updates.
                </div>
              </div>
            </aside>

            {/* Right: BIG chat canvas */}
            <section className="lg:col-span-4 order-1 lg:order-2">
              <div className="rounded-2xl border bg-white p-4 h-[82vh] flex flex-col">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold">Command Center</div>
                    <div className="text-xs text-gray-500">
                      Natural language → components → persistent updates (no
                      refresh)
                    </div>
                  </div>
                  <div className="text-[11px] text-gray-400">
                    Your UI renders inside this thread
                  </div>
                </div>

                <div className="flex-1 min-h-0 overflow-hidden">
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

/** Small helper: click-to-copy prompt chips */
function PromptChip({ text }: { text: string }) {
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left rounded-lg border px-3 py-2 bg-white hover:bg-gray-50"
      title="Click to copy"
    >
      {text}
    </button>
  );
}
