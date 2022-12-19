import { writeFileSync } from "fs";
import { globby } from "globby";

export default async function generate() {
  const pages = await globby([
    "pages/*.js",
    "posts/*.mdx",
    "!pages/_*.js",
    "!pages/api",
    "!pages/404.js",
  ]);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((page) => {
            const path = page
              .replace("pages", "")
              .replace("posts", "/blogs")
              .replace(".js", "")
              .replace(".mdx", "");
            const route = path === "/index" ? "" : path;

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
