// 构建后兜底：把 HTML 里残留的站内绝对链接补上 base 前缀。
// 背景：Astro 的 base 会处理 Vite 产物（JS/CSS/字体）和大部分路由，
// 但手写的 <a href="/about">、markdown 里的 [x](/kb/)、以及部分组件库链接不会自动加前缀。
// 这里统一扫一遍 dist，幂等：已经带前缀的跳过，因此重复执行安全。
//
// 用法：SITE_BASE=/mw-ai-club node scripts/prefix-base.mjs
//       SITE_BASE=/ 或留空 → 直接跳过（部署到根域名时不需要）

import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DIST = "dist";

// 前缀以 astro.config.mjs 里的 base 为准，避免两处写死后不同步
async function resolveBase() {
  if (process.env.SITE_BASE !== undefined) return process.env.SITE_BASE;
  try {
    const cfg = await readFile("astro.config.mjs", "utf8");
    const m = cfg.match(/^\s*base:\s*["'`]([^"'`]*)["'`]/m);
    if (m) return m[1];
  } catch {
    /* 读不到就退回默认 */
  }
  return "/mw-ai-club";
}

const rawBase = await resolveBase();
const prefix = rawBase.replace(/\/+$/, ""); // "" | "/mw-ai-club"

if (!prefix) {
  console.log("[prefix-base] SITE_BASE 为空，站点在根路径，跳过");
  process.exit(0);
}

const ATTR_RE = /\b(href|src|action|poster)="(\/(?!\/)[^"]*)"/g;
const REFRESH_RE = /(content="\d*;\s*url=)(\/[^"]*)"/g;

let patched = 0;
let files = 0;

function fix(html) {
  let out = html.replace(ATTR_RE, (m, attr, url) => {
    if (url === prefix || url.startsWith(prefix + "/")) return m;
    patched++;
    return `${attr}="${prefix}${url}"`;
  });
  out = out.replace(REFRESH_RE, (m, head, url) => {
    if (url === prefix || url.startsWith(prefix + "/")) return m;
    patched++;
    return `${head}${prefix}${url}"`;
  });
  return out;
}

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
    } else if (entry.name.endsWith(".html")) {
      const html = await readFile(full, "utf8");
      const next = fix(html);
      if (next !== html) {
        await writeFile(full, next, "utf8");
        files++;
      }
    }
  }
}

await walk(DIST);
console.log(`[prefix-base] 前缀 ${prefix}，修改 ${files} 个页面，共 ${patched} 处链接`);
