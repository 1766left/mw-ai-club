// 站点 base 统一处理。
// Astro 的 import.meta.env.BASE_URL 在 base 不带结尾斜杠时不会自动补，直接拼接会拼出
// "/mw-ai-clubpagefind/" 这种错路径，所以统一从这里取。
export const BASE = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : import.meta.env.BASE_URL + "/";

/** 把站内绝对路径（如 "pagefind/" 或 "/about"）拼成带 base 的完整路径 */
export function withBase(path: string): string {
    return BASE + path.replace(/^\//, "");
}
