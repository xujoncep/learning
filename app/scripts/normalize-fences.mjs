#!/usr/bin/env node
// Patcher #3: convert 4-backtick fences to 3-backtick. The upstream content
// uses ```` outer wrappers around content that contains ``` — but most of
// that content doesn't actually contain triple backticks, so the wrapper
// is unnecessary and confuses the parser when closers are mismatched.
// Conservative rule: only convert ```` lines that are pure fence delimiters
// (4 backticks, optional language identifier, nothing else).

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
  let touched = 0;
  const lines = content.split(/\r?\n/);
  const out = [];
  for (const ln of lines) {
    // Match a fence delimiter: ```` (exactly 4) optionally followed by
    // language identifier, then end of line.
    const m = ln.match(/^( {0,3})````([A-Za-z0-9_+-]*)\s*$/);
    if (m) {
      out.push(`${m[1]}\`\`\`${m[2]}`);
      touched++;
    } else {
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
      console.log(`  ${path.relative(ROOT, f)}: ${touched} fences normalized`);
      total += touched;
      touchedFiles++;
    }
  }
  console.log(`\nDone. ${total} 4-backtick fences converted to 3-backtick across ${touchedFiles} files.`);
}

main();
