import { generateOGImage } from "@/lib/og";
import projects_config from "@/projects-config.json";
import { parse, format } from "date-fns";
import type { APIRoute } from "astro";

export function getStaticPaths() {
  return projects_config.map((item) => ({
    params: { id: item.id },
    props: { item },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { item } = props as { item: (typeof projects_config)[number] };
  const { category, date } = item.data;
  const formattedDate = format(parse(date, "dd-MM-yyyy", new Date()), "yyyy.MM.dd");

  const png = await generateOGImage({ category, date: formattedDate });
  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
};
