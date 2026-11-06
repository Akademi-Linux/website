// Writes real HTML for every route into dist, so direct links return 200 with content
// and any other path gets GitHub Pages' 404.html.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { createServer } from "vite";

const PAGES = {
  home: "index.html",
  about: "about/index.html",
  tools: "tools/index.html",
  notfound: "404.html",
};

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

try {
  const { renderApp, TITLES } = await server.ssrLoadModule("/src/render.ts");
  const template = await readFile("dist/index.html", "utf8");
  if (!template.includes("<!--app-->")) throw new Error("dist/index.html has no <!--app--> marker");

  for (const [route, file] of Object.entries(PAGES)) {
    const html = template
      .replace("<!--app-->", () => renderApp(route))
      .replace("<title>Akademi Linux</title>", () => `<title>${TITLES[route]}</title>`)
      .replace("<body>", () => `<body data-route="${route}">`);
    const output = join("dist", file);
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, html);
    console.log(`prerendered ${output}`);
  }
} finally {
  await server.close();
}
