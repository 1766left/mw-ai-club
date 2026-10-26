import satori from "satori";
import sharp from "sharp";
import fs from "node:fs";

/**
 * OG 分享图生成。
 *
 * 注意：satori 只内置了我们打包的 Geist（仅拉丁字形），中文会渲染成方框，
 * 所以这张卡片刻意不渲染中文标题/摘要，只用品牌名 + 分类 + 日期。
 * 如果以后需要中文 OG，需要额外打包一份 CJK 字体（如 Noto Sans SC 子集）。
 */

const regularFont = fs.readFileSync("src/assets/fonts/Geist-Regular.ttf");
const boldFont = fs.readFileSync("src/assets/fonts/Geist-Bold.ttf");

export interface OGOptions {
  title?: string;
  description?: string;
  category?: string;
  date?: string;
}

const span = (style: Record<string, unknown>, children: string) => ({
  type: "span" as const,
  props: { style, children },
});

export async function generateOGImage({ category, date }: OGOptions = {}) {
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: 1200,
          height: 630,
          background: "#F4F7FB",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          fontFamily: "Geist",
          border: "1px solid #E3E9F2",
        },
        children: [
          // 顶部品牌行
          {
            type: "div",
            props: {
              style: { display: "flex", alignItems: "center", gap: 14 },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      width: 14,
                      height: 14,
                      borderRadius: 3,
                      background: "#0087FF",
                    },
                  },
                },
                span(
                  {
                    fontSize: 20,
                    color: "#5C6675",
                    fontWeight: 400,
                    letterSpacing: 3,
                  },
                  "MINGWAN SCHOOL",
                ),
              ],
            },
          },

          // 主标题
          {
            type: "div",
            props: {
              style: { display: "flex", flexDirection: "column", gap: 10 },
              children: [
                span(
                  {
                    fontSize: 96,
                    fontWeight: 700,
                    color: "#16181D",
                    letterSpacing: -2,
                    lineHeight: 1,
                  },
                  "MW AI CLUB",
                ),
                span(
                  {
                    fontSize: 30,
                    color: "#0087FF",
                    fontWeight: 400,
                    letterSpacing: 1,
                  },
                  "AI x Making",
                ),
              ],
            },
          },

          // 底部：分类 + 日期
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 18,
                borderTop: "1px solid #E3E9F2",
                paddingTop: 24,
              },
              children: [
                ...(category
                  ? [
                      span(
                        {
                          fontSize: 16,
                          fontWeight: 500,
                          color: "#0087FF",
                          border: "1px solid #0087FF",
                          borderRadius: 4,
                          padding: "4px 14px",
                          letterSpacing: 1,
                        },
                        category.toUpperCase(),
                      ),
                    ]
                  : []),
                ...(date
                  ? [span({ fontSize: 16, color: "#8A94A6" }, date)]
                  : []),
                {
                  type: "div",
                  props: { style: { flex: 1 } },
                },
                span({ fontSize: 16, color: "#8A94A6" }, "mw-ai-club"),
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Geist", data: regularFont, weight: 400, style: "normal" },
        { name: "Geist", data: boldFont, weight: 700, style: "normal" },
      ],
    },
  );

  return sharp(Buffer.from(svg)).png().toBuffer();
}
