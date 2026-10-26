// Tailwind v4 走 PostCSS 接入（而不是 @tailwindcss/vite）：
// 当前 @tailwindcss/vite 4.3.3 与 Astro 6.4 内置的 vite 8 / rolldown 存在 resolve API 不兼容，
// 用 PostCSS 插件可以绕开这个问题，功能等价。
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
