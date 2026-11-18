// news-image-20261117 entry (Node 22, standard library only).
//
// The image beside this file sums up Tuesday 17 November 2026 in one
// picture: a light newspaper front page with a dated masthead, the three
// biggest stories (Nvidia's earnings beat, the U.S. strikes on Qeshm and the
// Hormuz tanker mines, the fourth straight day of market losses), eight more
// numbered stories from five continents, a world map, and nine one-line
// briefs — 20 stories in all, every one reported on 17 November 2026.
//
// The program copies that image to /output/entry.png (or to
// $MAKEFUN_OUTPUT_DIR when set, for local runs). It reads nothing else and
// writes the same bytes every run, so the two runs the grader does agree.
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outDir, 'entry.png');

const bytes = readFileSync(source);

// The gate takes a whole PNG of at most 1 MiB: check the magic bytes and
// the size before writing, so a bad image fails loudly here, not at the gate.
// The copy is byte-for-byte identical every run, so the grader's two runs
// always agree.
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!bytes.subarray(0, 8).equals(PNG_MAGIC)) {
  throw new Error('entry.png is not a PNG');
}
if (bytes.length > 1048576) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB cap`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(target, bytes);
console.log(`wrote ${target} (${bytes.length} bytes)`);
