import { spawn } from "node:child_process";
import { copyFile, cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repository = process.env.GITHUB_REPOSITORY ?? "michaellu5475/ludun-digital-card";
const [owner, repo] = repository.split("/");

if (!owner || !repo || !/^[A-Za-z0-9_.-]+$/.test(owner) || !/^[A-Za-z0-9_.-]+$/.test(repo)) {
  throw new Error(`Invalid GitHub repository: ${repository}`);
}

const isUserSite = repo.toLowerCase() === `${owner}.github.io`.toLowerCase();
const basePath = isUserSite ? "" : `/${repo}`;
const siteUrl = `https://${owner}.github.io${basePath}`;
const clientDir = path.join(projectRoot, "dist", "client");
const pagesDir = path.join(projectRoot, "docs");

function run(command, args, env) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: projectRoot,
      env,
      stdio: "inherit",
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} exited with code ${code}`));
    });
  });
}

async function loadContactModule() {
  const sourcePath = path.join(projectRoot, "app", "lib", "contact.ts");
  const source = await readFile(sourcePath, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: sourcePath,
  }).outputText;
  const encoded = Buffer.from(output, "utf8").toString("base64");
  return import(`data:text/javascript;base64,${encoded}`);
}

const vinextBin = path.join(
  projectRoot,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "vinext.cmd" : "vinext",
);

await run(vinextBin, ["build"], {
  ...process.env,
  GITHUB_PAGES: "true",
  NEXT_PUBLIC_BASE_PATH: basePath,
  NEXT_PUBLIC_SITE_URL: siteUrl,
});

if (basePath) {
  const prefixedAssetsDir = path.join(clientDir, repo, "_next");
  const rootAssetsDir = path.join(clientDir, "_next");
  await rm(rootAssetsDir, { recursive: true, force: true });
  await cp(prefixedAssetsDir, rootAssetsDir, { recursive: true });
  await rm(path.join(clientDir, repo), { recursive: true, force: true });
}

const { contacts, createVCard } = await loadContactModule();
await mkdir(clientDir, { recursive: true });

for (const slug of ["mike", "chloe", "jana", "deavy", "v2"]) {
  const sourcePath = path.join(clientDir, `${slug}.html`);
  const routeDir = path.join(clientDir, slug);
  await mkdir(routeDir, { recursive: true });
  await copyFile(sourcePath, path.join(routeDir, "index.html"));
}

for (const contact of Object.values(contacts)) {
  await writeFile(
    path.join(clientDir, contact.vcardFilename),
    createVCard(contact),
    "utf8",
  );
}

await writeFile(path.join(clientDir, ".nojekyll"), "", "utf8");
await copyFile(
  path.join(projectRoot, "public", "ludun-logo.png"),
  path.join(clientDir, "ludun-logo.png"),
);
await copyFile(
  path.join(projectRoot, "public", "og.png"),
  path.join(clientDir, "og.png"),
);

for (const generatedMetadata of [
  ".assetsignore",
  ".vite",
  "_headers",
  "vinext-client-entry-manifest.json",
]) {
  await rm(path.join(clientDir, generatedMetadata), {
    recursive: true,
    force: true,
  });
}

await rm(pagesDir, { recursive: true, force: true });
await cp(clientDir, pagesDir, { recursive: true });

for (const slug of ["mike", "chloe", "jana", "deavy"]) {
  const pagePath = path.join(pagesDir, slug, "index.html");
  await readFile(pagePath, "utf8");
}

await readFile(path.join(pagesDir, "404.html"), "utf8");
console.log(`GitHub Pages output: ${pathToFileURL(pagesDir).href}`);
console.log(`Public base URL: ${siteUrl}/`);
