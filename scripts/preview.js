// Serves dist the way GitHub Pages does: folder index files, and 404.html with a real
// 404 status. `vite preview` can't test this because it falls back to index.html.
import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, sep } from "node:path";

const ROOT = join(process.cwd(), "dist");
const PORT = Number(process.env.PORT ?? 4173);
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".wasm": "application/wasm",
};

const isFile = (path) => stat(path).then((s) => s.isFile(), () => false);

createServer(async (request, response) => {
  const { pathname } = new URL(request.url, "http://localhost");
  const path = normalize(join(ROOT, decodeURIComponent(pathname)));
  const candidates = path.startsWith(ROOT + sep) || path === ROOT ? [path, join(path, "index.html")] : [];

  for (const file of candidates) {
    if (await isFile(file)) {
      response.writeHead(200, { "Content-Type": TYPES[extname(file)] ?? "application/octet-stream" });
      response.end(await readFile(file));
      return;
    }
  }
  response.writeHead(404, { "Content-Type": TYPES[".html"] });
  response.end(await readFile(join(ROOT, "404.html")));
}).listen(PORT, () => console.log(`Preview at http://localhost:${PORT}`));
