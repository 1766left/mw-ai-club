# MW AI Club 官网

明湾学校 AI Club 的官方网站。基于 [Astro](https://astro.build) + [Ryze](https://astro.build/themes/details/ryze/) 模板改造，内嵌 [Starlight](https://starlight.astro.build) 作为知识库。

## 站点结构

| 路径 | 内容 | 内容在哪改 |
| --- | --- | --- |
| `/` | 首页：一句话介绍 + 精选项目 + 最新文章 + 知识库入口 | `src/site-config.json` |
| `/about` | 基础介绍：我们是谁、怎么运转、基本信息、怎么加入 | `src/pages/about.astro` |
| `/projects` | 项目列表（可按分类 / 标签筛选、按时间排序） | `src/projects-config.json` |
| `/projects/<id>` | 项目详情：介绍 / 做了什么 / 怎么做的 | 同上 |
| `/blog` | 文章列表（可按分类 / 标签筛选） | `src/content/blog/*.md` |
| `/blog/<id>` | 文章详情 | 同上 |
| `/kb` | 知识库（Starlight） | `src/content/docs/kb/**` |
| `/docs` | 知识库别名（自动跳 `/kb`） | `src/pages/docs/index.astro` |
| `/rss.xml` | RSS | 自动生成 |

## 本地开发

```bash
cd "CLUB/website"

npm install          # 首次
npm run dev          # http://localhost:4321
```

构建（会顺带生成搜索索引）：

```bash
npm run build
npm run preview
```

> 注意：`npm run build` 里的 `pagefind` 步骤负责生成搜索索引。如果跳过它，`Ctrl/Cmd + K` 搜索会没有结果。

## 怎么加内容

### 加一篇文章

在 `src/content/blog/` 新建 `.md`，文件名会成为 URL（用英文小写 + 连字符）：

```yaml
---
title: "文章标题"
description: "列表页显示的一句话摘要"
date: "26-10-2026"      # 必须 dd-MM-yyyy
category: note          # note | buildlog | howto | notice
tags: ["标签1", "标签2"]
author: "MW AI Club"
draft: false            # true = 不发布
---

正文……
```

### 加一个项目

编辑 `src/projects-config.json`，追加一项：

```json
{
  "id": "project-slug",
  "cover": "/covers/xxx.svg",
  "data": {
    "date": "26-10-2026",
    "category": "product",
    "title": "项目名",
    "description": "一句话说明",
    "tags": ["技术栈", "关键词"],
    "status": "building"
  },
  "introduction": "两三句话讲清楚为什么做它。",
  "links": [{ "label": "demo", "url": "https://..." }],
  "video": null,
  "brief": {
    "capabilities": ["做了什么 1", "做了什么 2"],
    "architecture": ["技术上怎么实现的"]
  }
}
```

- `category`：`product` 产品 / `game` 游戏 / `tool` 工具 / `research` 调研 / `hardware` 硬件 / `experiment` 实验
- `status`：`idea` 想法 / `building` 制作中 / `shipped` 已上线（当前版本未在页面显示，预留）
- `cover`：把图放进 `public/covers/`，填 `/covers/文件名`。不填则用 `src/assets/projects/<id>/` 里的第一张图。

### 加一篇知识库文档

在 `src/content/docs/kb/` 下的某个分组目录新建 `.md`：

```yaml
---
title: 页面标题
description: 一句话说明
sidebar:
  order: 10     # 可省略，省略则按标题排序
---
```

分组与侧边栏在 `astro.config.mjs` 的 `starlight({ sidebar: [...] })` 里配置：
`kb/method` 方法 · `kb/tools` 工具 · `kb/standards` 规范 · `kb/pitfalls` 踩坑。
新建分组目录后，记得在 `sidebar` 里加一条 `autogenerate`。

## 视觉规范

**一律使用明湾色系**，色值定义在 `src/styles/global.css`：

| 用途 | 色值 |
| --- | --- |
| 主色 · 明湾蓝 | `#0087FF` |
| 强调 · 明湾橙 | `#FF8C0F`（只用于"需要人出手"的动作与提醒） |
| 辅助 | `#0ABEE6` / `#14D7CD` |
| 页面底 | `#F4F7FB` |
| 正文墨 | `#16181D` |

知识库（Starlight）的颜色桥接在 `src/styles/starlight.css`。

## 部署

推荐 Cloudflare Pages 或 Vercel，构建命令 `npm run build`，输出目录 `dist`。

上线前记得改 `astro.config.mjs` 里的 `site`（现在是占位域名 `https://mw-ai-club.pages.dev`）——它影响 sitemap、RSS 和分享图的绝对地址。

## 已知限制

- **分享图（OG image）不含中文。** 生成分享图用的 satori 只打包了拉丁字体，中文标题会渲染成方框，所以卡片上只有品牌名 + 分类 + 日期。要加中文需要额外打包一份 CJK 字体子集。
- **搜索是构建期索引。** 本地 `npm run dev` 时搜索不可用，需要 `npm run build && npm run preview`。

## 致谢

模板来自 [Ryze](https://github.com/A58361/Ryze)（GPL-3.0），按原许可保留 `LICENSE.md`。
