/** 分类键 → 中文显示名。改这里即可调整全部列表页与详情页的分类文案。 */
export const CATEGORY_LABELS: Record<string, string> = {
  note: "随记",
  buildlog: "开发日志",
  howto: "教程",
  notice: "公告",
  product: "产品",
  game: "游戏",
  tool: "工具",
  research: "调研",
  hardware: "硬件",
  experiment: "实验",
};

export const categoryLabel = (cat: string) => CATEGORY_LABELS[cat] ?? cat;

export const STATUS_LABELS: Record<string, string> = {
  idea: "想法",
  building: "制作中",
  shipped: "已上线",
};

export const statusLabel = (status?: string) => (status ? (STATUS_LABELS[status] ?? status) : "");
