// ai-excited-01 entry (Node 22, standard library only).
//
// The entry image lives beside this file as entry.png (JPEG bytes under a
// .png name, which the gate accepts: it tells PNG from JPEG by the first
// bytes). This program writes those exact bytes to the output directory,
// so both graded runs produce the same file.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for
// /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const image = readFileSync(join(here, 'entry.png'));
if (image.length === 0) throw new Error('entry.png is empty');

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.png'), image);
