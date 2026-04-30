#!/usr/bin/env node
// Patcher #2: fix the `` ``n `` corruption pattern where the original `\n`
// got escaped to a literal `n` and merged with the prior line's trailing
// backticks. Common pattern at line start:
//   ``n<rest>     ->  blank line + <rest>
// Handles a couple of related forms too.

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
  for (let i = 0; i < lines.length; i++) {
    let ln = lines[i];

    // Pattern: line starts with ``n followed by content
    // -> emit a blank line, then the content (without the ``n)
    const m = ln.match(/^``n(.*)$/);
    if (m) {
      out.push('');
      out.push(m[1]);
      touched++;
      continue;
    }

    out.push(ln);
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
      console.log(`  ${path.relative(ROOT, f)}: ${touched} lines fixed`);
      total += touched;
      touchedFiles++;
    }
  }
  console.log(`\nDone. ${total} \`\`n corruptions fixed across ${touchedFiles} files.`);
}

main();
