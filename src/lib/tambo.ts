/**
 * @file tambo.ts
 * @description Central configuration file for Tambo components and tools
 */
import DeadlineTimeline from "@/components/deadline-timeline";
import MoneySnapshot from "@/components/money-snapshot";
import RiskAlertPanel from "@/components/risk-alert-panel";
import WeeklyFocusBoard from "@/components/weekly-focus-board";

import { demoDeadlines, demoMoneyItems } from "@/lib/demo-data";
import { loadFocusItems, saveFocusItems } from "@/lib/storage";

import { DataCard, dataCardSchema } from "@/components/ui/card-data";
import { Graph, graphSchema } from "@/components/tambo/graph";

import type { TamboComponent } from "@tambo-ai/react";
import { TamboTool } from "@tambo-ai/react";
import { z } from "zod";

export const tools: TamboTool[] = [
  {
    name: "get-deadlines",
    description:
      "Returns a list of upcoming deadlines the user is tracking. Use this before rendering deadline timelines or answering questions about what is due soon.",
    tool: () => demoDeadlines,
    inputSchema: z.object({}),
    outputSchema: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        date: z.string(),
        severity: z.enum(["low", "medium", "high"]).optional(),
      })
    ),
  },

  {
    name: "get-focus-items",
    description:
      "Returns the user's weekly focus items (from local storage). Use this before rendering a weekly focus board or answering what to focus on.",
    tool: () => {
      // Read the current state so Tambo is consistent across turns
      return loadFocusItems();
    },
    inputSchema: z.object({}),
    outputSchema: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        bucket: z.enum(["thisWeek", "nextWeek"]),
        done: z.boolean().optional(),
      })
    ),
  },

  {
    name: "update-focus-item",
    description:
      "Updates a single focus item by id (move between weeks, mark done, or rename). Always call get-focus-items first to find the correct id.",
    tool: ({
      id,
      bucket,
      done,
      title,
    }: {
      id: string;
      bucket?: "thisWeek" | "nextWeek";
      done?: boolean;
      title?: string;
    }) => {
      const items = loadFocusItems();
      const updated = items.map((it) => {
        if (it.id !== id) return it;
        return {
          ...it,
          bucket: bucket ?? it.bucket,
          done: done ?? it.done,
          title: title ?? it.title,
        };
      });
      saveFocusItems(updated);
      return updated;
    },
    inputSchema: z.object({
      id: z.string().describe("The id of the focus item to update"),
      bucket: z
        .enum(["thisWeek", "nextWeek"])
        .optional()
        .describe("Move item to thisWeek or nextWeek"),
      done: z.boolean().optional().describe("Mark item done or not done"),
      title: z.string().optional().describe("Rename the item title"),
    }),
    outputSchema: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        bucket: z.enum(["thisWeek", "nextWeek"]),
        done: z.boolean().optional(),
      })
    ),
  },

  // --------------------
  // Money tools
  // --------------------
  {
    name: "get-money-items",
    description:
      "Returns upcoming bills and subscriptions (demo data). Use this BEFORE rendering MoneySnapshot or answering money/payment questions.",
    tool: () => demoMoneyItems,
    inputSchema: z.object({}),
    outputSchema: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        type: z.enum(["bill", "subscription"]),
        dueDate: z.string(),
        amountUsd: z.number(),
        cadence: z.enum(["monthly", "yearly", "one-time"]).optional(),
        note: z.string().optional(),
      })
    ),
  },
];

export const components: TamboComponent[] = [
  {
    name: "Graph",
    description:
      "Renders charts (bar, line, pie). Use ONLY when the user explicitly asks for a chart/graph/visualization.",
    component: Graph,
    propsSchema: graphSchema,
  },

  {
    name: "DataCard",
    description:
      "Displays options as clickable cards with links and summaries with the ability to select multiple items.",
    component: DataCard,
    propsSchema: dataCardSchema,
  },

  {
    name: "DeadlineTimeline",
    description:
      "Shows upcoming deadlines in a timeline. Use when the user asks about deadlines, what's due, upcoming dates, next two weeks, or this month. Call get-deadlines first.",
    component: DeadlineTimeline,
    propsSchema: z.object({
      title: z.string().optional(),
      rangeLabel: z.string().optional(),
      deadlines: z
        .array(
          z.object({
            id: z.string(),
            title: z.string(),
            date: z.string(),
            severity: z.enum(["low", "medium", "high"]).optional(),
          })
        )
        .optional(),
    }),
  },

  {
    name: "WeeklyFocusBoard",
    description:
      "Weekly focus board with two columns (This Week / Next Week). Use for planning/prioritizing tasks and moving items across weeks. Always call get-focus-items first. For edits, call update-focus-item. Pass items as a single list with bucket=thisWeek/nextWeek.",
    component: WeeklyFocusBoard,
    propsSchema: z.object({
      weekLabel: z.string().optional(),
      items: z
        .array(
          z.object({
            id: z.string(),
            title: z.string(),
            bucket: z.enum(["thisWeek", "nextWeek"]),
            done: z.boolean().optional(),
          })
        )
        .optional(),
    }),
  },

  {
    name: "RiskAlertPanel",
    description:
      "Highlights overdue or high-risk items. Use when the user asks what they are missing, what could cause trouble, overdue tasks, or risks this week/month. Call get-deadlines and get-focus-items to identify risks.",
    component: RiskAlertPanel,
    propsSchema: z.object({
      title: z.string().optional(),
      risks: z
        .array(
          z.object({
            id: z.string(),
            title: z.string(),
            reason: z.string(),
          })
        )
        .optional(),
    }),
  },

  {
    name: "MoneySnapshot",
    description:
      "Shows upcoming bills + subscriptions with totals. Use when the user asks about money, payments, bills, subscriptions renewing, or upcoming charges. Always call get-money-items first.",
    component: MoneySnapshot,
    propsSchema: z.object({
      title: z.string().optional(),
      rangeLabel: z.string().optional(),
      totalUsd: z.number().optional(),
      items: z
        .array(
          z.object({
            id: z.string(),
            name: z.string(),
            type: z.enum(["bill", "subscription"]),
            dueDate: z.string(),
            amountUsd: z.number(),
            cadence: z.enum(["monthly", "yearly", "one-time"]).optional(),
            note: z.string().optional(),
          })
        )
        .optional(),
    }),
  },
];
