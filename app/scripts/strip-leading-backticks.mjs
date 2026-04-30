#!/usr/bin/env node
// One-shot patcher: strip spurious leading backticks introduced by
// upstream content corruption. A leading ` is stripped only when:
//   - the line is OUTSIDE a fenced code block, AND
//   - the character after it is whitespace or markdown punctuation
//     (#, >, |, -, =, <, *, _, [, ~, +, digits with dot, or non-ASCII).
// Lines that look like genuine inline code (`name` ...) are left alone.

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

// True if the leading backtick on `rest` (the chars after the leading `) looks
// like corruption rather than the start of a real `inline code` span.
function looksLikeCorruption(rest) {
  if (rest.length === 0) return false; // a lone ` is ambiguous; leave it
  const c = rest[0];

  // Multiple backticks at start = real fence, not corruption
  if (c === '`') return false;

  // Whitespace after the lone ` (e.g. "`    /* code */") = corruption
  if (c === ' ' || c === '\t') return true;

  // Markdown structural punctuation
  if ('#>|=<~+'.includes(c)) return true;

  // ** (bold) or *<space> (bullet) or *italic — leading ` followed by * is
  // almost always corruption since ` *...` would be code anyway only if closed
  if (c === '*') return true;
  if (c === '_') return rest[1] === '_'; // __bold__
  if (c === '[') return true;

  // -, --, --- (separators) or `- ` (list)
  if (c === '-') return true;

  // Numbered list "1. " etc.
  if (/[0-9]/.test(c)) {
    // Only treat as corruption if it's a list/ordered item like "1. " "2) "
    if (/^\d+[.)]\s/.test(rest)) return true;
    return false;
  }

  // Non-ASCII (Bangla, em-dash, etc.) — paragraph text, not inline code
  if (c.charCodeAt(0) > 127) return true;

  // Latin letter: ambiguous. Could be `Age`, `age`, `AGE` (real inline code)
  // or `Topic 1: ...` (corruption with "T" first). Inline code typically has
  // a closing backtick reasonably soon. Heuristic: if the rest of the line
  // contains a closing backtick within the first ~40 chars and that span
  // contains no spaces beyond a few words, treat as real inline code.
  if (/^[A-Za-z]/.test(c)) {
    // Look for a closing backtick on the same line
    const close = rest.indexOf('`');
    if (close === -1) return true; // no close → corruption
    const span = rest.slice(0, close);
    // Real inline code spans rarely contain markdown-y characters or are long
    if (span.length > 40) return true;
    // If the span looks like an identifier / short symbol, keep as code
    if (/^[\w.\-+/*=<>!?,:;()\[\]\s'"]+$/.test(span)) return false;
    return true;
  }

  return false;
}

function fixLine(line) {
  if (!line.startsWith('`')) return line;
  const rest = line.slice(1);
  if (looksLikeCorruption(rest)) return rest;
  return line;
}

// Detect fence state line-by-line. CommonMark fences open with 3+ backticks
// (or tildes) and close with at least the same count of the same char.
function processFile(content) {
  const lines = content.split(/\r?\n/);
  let inFence = false;
  let fenceChar = '';
  let fenceLen = 0;
  const out = [];
  let stripped = 0;

  for (const line of lines) {
    // Check if this is a fence delimiter (allow up to 3 leading spaces per CM)
    const m = line.match(/^( {0,3})(`{3,}|~{3,})(.*)$/);
    if (m) {
      const ch = m[2][0];
      const len = m[2].length;
      if (!inFence) {
        inFence = true;
        fenceChar = ch;
        fenceLen = len;
        out.push(line);
        continue;
      } else if (ch === fenceChar && len >= fenceLen && m[3].trim() === '') {
        inFence = false;
        out.push(line);
        continue;
      }
      // not a closer — content of code block
      out.push(line);
      continue;
    }

    if (inFence) {
      out.push(line);
    } else {
      const fixed = fixLine(line);
      if (fixed !== line) stripped++;
      out.push(fixed);
    }
  }

  return { content: out.join('\n'), stripped };
}

function main() {
  const files = walkMd(SOURCE);
  let totalStripped = 0;
  let touchedFiles = 0;
  for (const f of files) {
    const raw = fs.readFileSync(f, 'utf-8');
    const { content, stripped } = processFile(raw);
    if (stripped > 0) {
      fs.writeFileSync(f, content, 'utf-8');
      console.log(`  ${path.relative(ROOT, f)}: ${stripped} lines fixed`);
      totalStripped += stripped;
      touchedFiles++;
    }
  }
  console.log(`\nDone. ${totalStripped} leading backticks stripped across ${touchedFiles} files.`);
}

main();
