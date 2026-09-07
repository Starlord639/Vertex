#!/usr/bin/env node
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { version } = JSON.parse(
  readFileSync(join(root, "package.json"), "utf8"),
);

if (typeof version !== "string" || !/^\d+\.\d+\.\d+$/.test(version)) {
  throw new Error(`Invalid package version: ${String(version)}`);
}

const source = join(root, "target", "release", "vertex.exe");
const releaseDir = join(root, "release");
const destination = join(releaseDir, `Vertex_${version}_portable.exe`);

mkdirSync(releaseDir, { recursive: true });
copyFileSync(source, destination);

console.log(`Portable Windows build: ${destination}`);
