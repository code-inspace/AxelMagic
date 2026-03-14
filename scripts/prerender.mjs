import { build } from "vite";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const routes = ["/", "/mentions-legales", "/politique-de-confidentialite"];

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
  const appHtml = render(route);
  const html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );

  const outPath =
    route === "/"
      ? path.resolve(rootDir, "dist/index.html")
      : path.resolve(rootDir, `dist${route}/index.html`);

  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  console.log(`Pre-rendered: ${route} → ${outPath}`);
}

console.log("Pre-rendering done.");
