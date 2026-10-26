// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";

import rehypeExternalLinks from "rehype-external-links";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeFigure from "rehype-figure";
import mermaid from "astro-mermaid";

// https://astro.build/config
export default defineConfig({
  devToolbar: { enabled: false },

  // 部署在 GitHub Pages 项目站点：https://1766left.github.io/mw-ai-club/
  // base 只影响生成的链接与资源 URL，dist 目录结构不变，正好对应 Pages 的子路径
  // 以后换成根路径的自定义域名时，把 base 改成 "/" 即可（其余不用动）
  site: "https://1766left.github.io",
  base: "/mw-ai-club",

  integrations: [
    // 知识库（Starlight）。内容放在 src/content/docs/kb/ → 站点路径 /kb/*
    starlight({
      title: "MW AI Club",
      tagline: "Club 知识库",
      description: "MW AI Club 的方法、工具、规范与踩坑记录。想做什么之前，先来这里翻一翻。",
      favicon: "/favicon.svg",
      defaultLocale: "root",
      locales: {
        root: { label: "简体中文", lang: "zh-CN" },
      },
      // 主站已有自己的 404 页，避免重复路由
      disable404Route: true,
      credits: false,
      lastUpdated: true,
      customCss: ["./src/styles/starlight.css"],
      social: [{ icon: "github", label: "GitHub", href: "https://github.com/1766left" }],
      editLink: {
        baseUrl: "https://github.com/1766left/mw-ai-club/edit/main/",
      },
      head: [
        {
          tag: "meta",
          attrs: { name: "theme-color", content: "#0087FF" },
        },
      ],
      sidebar: [
        { label: "← 返回官网", link: "/" },
        {
          label: "开始",
          items: [
            { label: "知识库简介", link: "/kb/" },
            { label: "怎么用这份知识库", link: "/kb/how-to-use/" },
          ],
        },
        { label: "方法", items: [{ autogenerate: { directory: "kb/method" } }] },
        { label: "工具与平台", items: [{ autogenerate: { directory: "kb/tools" } }] },
        { label: "项目规范", items: [{ autogenerate: { directory: "kb/standards" } }] },
        { label: "踩坑记录", items: [{ autogenerate: { directory: "kb/pitfalls" } }] },
      ],
    }),

    mermaid({
      theme: "neutral",
      autoTheme: true,
    }),
    react(),
    sitemap(),
  ],

  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      wrap: true,
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      [rehypeExternalLinks, { target: "_blank", rel: ["nofollow", "noopener", "noreferrer"] }],
      rehypeKatex,
      rehypeFigure,
    ],
  },

  // Tailwind 通过 postcss.config.mjs 接入，不用 @tailwindcss/vite（与 vite 8 不兼容）
  // cacheDir 指到项目内的独立目录（默认的 node_modules/.vite 在受限沙箱里清不掉）
  vite: {
    cacheDir: "./.vite-cache",
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
});
