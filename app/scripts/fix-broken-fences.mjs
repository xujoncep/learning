#!/usr/bin/env node
// Patcher #4: fix code fences where one backtick was lost.
// Patterns:
//   ``<lang>      -> ```<lang>      (broken opener)
//   `             -> ```            (broken closer immediately following)
// Only flips a lone single-` line into ``` if we're currently inside a
// block we just opened from a ``<lang> line.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');
const SOURCE = path.join(ROOT, 'handnote');

function walkMd(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walkMd(full));
    else if (e.name.endsWith('.md') && e.name.toLowerCase() !== 'readme.md') out.push(full);
  }
  return out;
}

function processFile(content) {
  const lines = content.split(/\r?\n/);
  const out = [];
  let openedRecovered = false;
  let touched = 0;

  for (const ln of lines) {
    if (!openedRecovered) {
      const m = ln.match(/^( {0,3})``([A-Za-z0-9_+-]+)\s*$/);
      if (m) {
        out.push(`${m[1]}\`\`\`${m[2]}`);
        openedRecovered = true;
        touched++;
        continue;
      }
      out.push(ln);
    } else {
      // Looking for the closer
      if (/^( {0,3})`\s*$/.test(ln)) {
        out.push(ln.replace(/`\s*$/, '```'));
        openedRecovered = false;
        touched++;
        continue;
      }
      // Or a real fence delimiter (3+ backticks alone)
      if (/^( {0,3})`{3,}\s*$/.test(ln)) {
        out.push(ln);
        openedRecovered = false;
        continue;
      }
      out.push(ln);
    }
  }
  return { content: out.join('\n'), touched };
}

function main() {
  const files = walkMd(SOURCE);
  let total = 0;
  let touchedFiles = 0;
  for (const f of files) {
    const raw = fs.readFileSync(f, 'utf-8');
    const { content, touched } = processFile(raw);
    if (touched > 0) {
      fs.writeFileSync(f, content, 'utf-8');
      console.log(`  ${path.relative(ROOT, f)}: ${touched} fence-lines repaired`);
      total += touched;
      touchedFiles++;
    }
  }
  console.log(`\nDone. ${total} broken fence lines repaired across ${touchedFiles} files.`);
}

main();
