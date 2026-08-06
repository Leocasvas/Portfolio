import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ejs from "ejs";

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const viewsDirectory = path.join(rootDirectory, "views");
const outputDirectory = path.join(rootDirectory, "docs");

const pages = [
  ["index.ejs", "index.html"],
  ["about.ejs", "about.html"],
  ["projects.ejs", "projects.html"],
  ["Resume.ejs", "resume.html"],
  ["contact.ejs", "contact.html"],
];

const staticLinks = new Map([
  ['href="/"', 'href="index.html"'],
  ['href="/about"', 'href="about.html"'],
  ['href="/projects"', 'href="projects.html"'],
  ['href="/resume"', 'href="resume.html"'],
  ['href="/contact"', 'href="contact.html"'],
  ['href="../"', 'href="index.html"'],
  ['href="../about"', 'href="about.html"'],
  ['href="../projects"', 'href="projects.html"'],
  ['href="../resume"', 'href="resume.html"'],
  ['href="../contact"', 'href="contact.html"'],
  ['href="/styles/', 'href="styles/'],
]);

function createStaticHtml(html) {
  return [...staticLinks].reduce(
    (staticHtml, [source, replacement]) => staticHtml.replaceAll(source, replacement),
    html,
  );
}

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await cp(path.join(rootDirectory, "public"), outputDirectory, { recursive: true });

for (const [templateName, outputName] of pages) {
  const templatePath = path.join(viewsDirectory, templateName);
  const html = await ejs.renderFile(templatePath);
  await writeFile(path.join(outputDirectory, outputName), createStaticHtml(html));
}

console.log("Static GitHub Pages files built in docs/.");
