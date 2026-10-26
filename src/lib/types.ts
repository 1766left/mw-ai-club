export interface siteConfig {
  github: { owner: string; repo: string };
  domain: string;
  bNavigation: boolean;
  homeLabel: string;
  navigationItems: navigationType[];
  navigationLabels?: Partial<Record<navigationType, string>>;
  bPageFind: boolean;
  bThemeToggle: boolean;
  bRssFeed: boolean;
  introduction: {
    badges: string[];
    heading: string;
    subHeadingItems: {
      type: subHeadingIconType;
      label: string;
      url: string;
    }[];
    socialItems: { type: socialIconType; url: string }[];
    description: string;
    ctaItems: { label: string; url: string; variant: variantType }[];
    support?: { label: string; url: string; variant: variantType };
  };
  featured: {
    projects: { visible: boolean };
    blog: { visible: boolean };
    important: "projects" | "blog";
  };
}

export interface projectCredit {
  name: string;
  grade?: string;
  role?: string;
}

export interface projectConfig {
  id: string;
  /** 项目封面图（public/ 下的路径，如 /covers/xxx.svg）。留空则回退到 src/assets/projects/<id>/ 里的第一张图。 */
  cover?: string;
  /** 参与成员。公开署名需学生/家长同意。 */
  credits?: projectCredit[];
  /** 署名后的补充说明，例如「等」「指导教师：xxx」 */
  creditsNote?: string;
  data: {
    date: string;
    category: projectCategoryType;
    title: string;
    description: string;
    tags: string[];
    status?: projectStatusType;
  };
  introduction: string;
  links: { label: string; url: string }[];
  video: string | null;
  brief: { capabilities: string[]; architecture: string[] };
}

export interface blogConfig {
  id: string;
  data: {
    date: string;
    category: blogCategoryType;
    title: string;
    description: string;
    tags: string[];
    draft?: boolean;
    author?: string;
  };
}

export type navigationType = "about" | "projects" | "blog" | "kb";

export type subHeadingIconType = "mail" | "address" | "phone" | "web";
export type socialIconType = "linkedin" | "instagram" | "youtube" | "facebook" | "bluesky" | "reddit" | "threads" | "mastodon" | "tumblr" | "twitter" | "x" | "discord" | "steam" | "twitch" | "medium" | "github" | "gitlab";

type variantType = "default" | "secondary" | "outline" | "ghost" | "destructive" | "link" | null | undefined;

export type projectCategoryType = "product" | "game" | "tool" | "research" | "hardware" | "experiment";
export type blogCategoryType = "note" | "buildlog" | "howto" | "notice";
export type projectStatusType = "idea" | "building" | "shipped";
