import { getAllSlugs } from "./sanityContent";
import { globby } from "globby";
import { writeFileSync } from "fs";

export default async function generate() {
  const pages = await globby([
    "pages/*.tsx",
    "!pages/_*.tsx",
    "!pages/api",
    "!pages/404.tsx",
  ]);

  const postsSlugs = (await getAllSlugs({ type: "post" })).map(
    (item) => `/blogs/${item}`
  );
  const snippetsSlugs = (await getAllSlugs({ type: "snippet" })).map(
    (item) => `/snippets/${item}`
  );

  const pagesRoute = pages.map((page) => {
    const path = page.replace("pages", "").replace(".tsx", "");
    const route = path === "/index" ? "" : path;
    return route;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${[...pagesRoute, ...postsSlugs, ...snippetsSlugs]
          .map((route) => {
            return `
              <url>
                  <loc>${`https://j471n.in${route}`}</loc>
              </url>
            `;
          })
          .join("")}
    </urlset>
    `;

  // eslint-disable-next-line no-sync
  writeFileSync("public/sitemap.xml", sitemap);
}
