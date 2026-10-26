import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";

export const collections = {
  /** BLOG：src/content/blog/*.md */
  blog: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
    schema: z.object({
      draft: z.boolean().optional().default(false),
      date: z.string(),
      title: z.string(),
      description: z.string(),
      category: z.enum(["note", "buildlog", "howto", "notice"]),
      tags: z.array(z.string()).optional().default([]),
      author: z.string().optional().default("MW AI Club"),
    }),
  }),

  /** 知识库：src/content/docs/kb/**（Starlight 接管，路由落在 /kb） */
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema(),
  }),
};
