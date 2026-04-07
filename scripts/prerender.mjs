import { build } from "vite";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const routes = [
  "/",
  "/mentions-legales",
  "/politique-de-confidentialite",
  "/realisation/withstellie",
  "/realisation/calea",
  "/realisation/lucafit",
  "/realisation/adn-paris"
];

// Build the SSR bundle
await build({
  root: rootDir,
  configFile: path.resolve(rootDir, "vite.config.ts"),
  build: {
    ssr: "src/entry-server.tsx",
    outDir: "dist-server",
    rollupOptions: { input: "src/entry-server.tsx" },
  },
});

// Load the template HTML (from the client build)
const template = readFileSync(path.resolve(rootDir, "dist/index.html"), "utf-8");

// Import the server render function
const { render } = await import(path.resolve(rootDir, "dist-server/entry-server.js"));

// Pre-render each route
for (const route of routes) {
  const { html: appHtml, helmet } = render(route);
  
  let html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );

  if (helmet) {
    const titleRegex = /<title>(.*?)<\/title>/i;
    const descRegex = /<meta name="description" content="(.*?)"\s*\/?>/i;

    if (helmet.title && helmet.title.toString() !== "") {
      html = html.replace(titleRegex, helmet.title.toString());
    }
    if (helmet.meta && helmet.meta.toString() !== "") {
      html = html.replace(descRegex, helmet.meta.toString());
    }
  }

  const outPath =
    route === "/"
      ? path.resolve(rootDir, "dist/index.html")
      : path.resolve(rootDir, `dist${route}/index.html`);

  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  console.log(`Pre-rendered: ${route} → ${outPath}`);
}

console.log("Pre-rendering done.");
