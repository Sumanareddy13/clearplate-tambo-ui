/**
 * @file tambo.ts
 * @description Central configuration file for Tambo components and tools
 *
 * This file serves as the central place to register your Tambo components and tools.
 * It exports arrays that will be used by the TamboProvider.
 *
 * Read more about Tambo at https://tambo.co/docs
 */
import RiskAlertPanel from "@/components/risk-alert-panel";

import WeeklyFocusBoard from "@/components/weekly-focus-board";
import { demoFocusItems } from "@/lib/demo-data";
import { loadFocusItems, saveFocusItems } from "@/lib/storage";

import { demoDeadlines } from "@/lib/demo-data";
import DeadlineTimeline from "@/components/deadline-timeline";
import { Graph, graphSchema } from "@/components/tambo/graph";
import { DataCard, dataCardSchema } from "@/components/ui/card-data";

import type { TamboComponent } from "@tambo-ai/react";
import { TamboTool } from "@tambo-ai/react";
import { z } from "zod";

/**
 * tools
 *
 * This array contains all the Tambo tools that are registered for use within the application.
 * Each tool is defined with its name, description, and expected props. The tools
 * can be controlled by AI to dynamically fetch data based on user interactions.
 */

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
    "Returns the user's weekly focus items split into this week and next week. Use this before rendering a weekly focus board or answering what to focus on.",
  tool: () => demoFocusItems,
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
    "Use get-focus-items to find the correct item id from title before updating.",
  tool: ({ id, bucket, done, title }: { id: string; bucket?: "thisWeek" | "nextWeek"; done?: boolean; title?: string }) => {
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
    bucket: z.enum(["thisWeek", "nextWeek"]).optional().describe("Move item to thisWeek or nextWeek"),
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

  
  // Add more tools here
];

/**
 * components
 *
 * This array contains all the Tambo components that are registered for use within the application.
 * Each component is defined with its name, description, and expected props. The components
 * can be controlled by AI to dynamically render UI elements based on user interactions.
 */
export const components: TamboComponent[] = [
  {
    name: "Graph",
    description:
      "A component that renders various types of charts (bar, line, pie) using Recharts. Supports customizable data visualization with labels, datasets, and styling options.",
    component: Graph,
    propsSchema: graphSchema,
  },
  {
    name: "DataCard",
    description:
      "A component that displays options as clickable cards with links and summaries with the ability to select multiple items.",
    component: DataCard,
    propsSchema: dataCardSchema,
  },
  {
  name: "DeadlineTimeline",
  description:
    "Shows upcoming deadlines in a timeline. Use when the user asks about deadlines, what's due, upcoming dates, next two weeks, or this month.",
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
    "Shows a weekly focus board with two columns: This Week and Next Week. Always call `get-focus-items` before rendering. Use when user asks what to focus on this week, plan the week, prioritize tasks, or move items between weeks.",
  component: WeeklyFocusBoard,
  propsSchema: z.object({
    weekLabel: z.string().optional(),
    thisWeekItems: z
      .array(
        z.object({
          id: z.string(),
          title: z.string(),
          done: z.boolean().optional(),
        })
      )
      .optional(),
    nextWeekItems: z
      .array(
        z.object({
          id: z.string(),
          title: z.string(),
          done: z.boolean().optional(),
        })
      )
      .optional(),
  }),
},
{
  name: "RiskAlertPanel",
  description:
    "Highlights overdue or high-risk items. Use when the user asks what they are missing, what could cause trouble, overdue tasks, or risks this week or month. Call get-deadlines and get-focus-items to identify risks.",
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

  // Add more components here
];
