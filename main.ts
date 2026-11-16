import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Copy the entry image next to this script into the output directory.
// Output directory comes from MAKEFUN_OUTPUT_DIR, defaulting to /output.
// The copy is byte-for-byte, so repeated runs produce identical output.
const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const src = join(here, "entry.png");
const dst = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);

// Confirm the copy landed whole: sizes must match, otherwise fail loudly.
const srcBytes = statSync(src).size;
const dstBytes = statSync(dst).size;
if (srcBytes !== dstBytes) {
  throw new Error(`copy incomplete: ${dstBytes} of ${srcBytes} bytes`);
}
console.log(`wrote ${dst} (${dstBytes} bytes)`);
