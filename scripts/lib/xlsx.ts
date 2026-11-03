/**
 * A minimal reader for .xlsx files: a zip of XML, read with node:zlib and no dependency. Same approach as the reader
 * inside scripts/fetch-ema.ts, which cannot be imported because that script runs its fetch on load.
 */
import { inflateRawSync } from "node:zlib";
import { decodeEntities } from "../feed-utils";

export function zipEntries(buf: Buffer): Map<string, Buffer> {
  const out = new Map<string, Buffer>();
  let eocd = buf.length - 22;
  while (eocd >= 0 && buf.readUInt32LE(eocd) !== 0x06054b50) eocd--;
  if (eocd < 0) throw new Error("not a zip file");
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  for (let i = 0; i < count; i++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) break;
    const method = buf.readUInt16LE(p + 10), csize = buf.readUInt32LE(p + 20), nlen = buf.readUInt16LE(p + 28), elen = buf.readUInt16LE(p + 30), clen = buf.readUInt16LE(p + 32), off = buf.readUInt32LE(p + 42);
    const name = buf.toString("utf8", p + 46, p + 46 + nlen);
    const lnlen = buf.readUInt16LE(off + 26), lelen = buf.readUInt16LE(off + 28);
    const start = off + 30 + lnlen + lelen;
    const data = buf.subarray(start, start + csize);
    out.set(name, method === 8 ? inflateRawSync(data) : Buffer.from(data));
    p += 46 + nlen + elen + clen;
  }
  return out;
}

const cellText = (xml: string) => decodeEntities((xml.match(/<t[^>]*>([\s\S]*?)<\/t>/g) ?? []).map((t) => t.replace(/<[^>]+>/g, "")).join(""));

/** Rows of the first sheet as records keyed by column letter ("A", "B", ...). Numbers stay as written. */
export function readFirstSheet(buf: Buffer): Array<Record<string, string>> {
  const e = zipEntries(buf);
  // Some writers (HKEX's list of securities) prefix every element with a namespace, `<x:row>`; drop it.
  const unprefix = (s?: string) => s?.replace(/<(\/?)[a-z0-9]+:(?=[a-zA-Z])/g, "<$1");
  const sheet = unprefix(e.get("xl/worksheets/sheet1.xml")?.toString("utf8"));
  if (!sheet) throw new Error("no sheet1 in workbook");
  const shared = (unprefix(e.get("xl/sharedStrings.xml")?.toString("utf8"))?.match(/<si>[\s\S]*?<\/si>/g) ?? []).map(cellText);
  const rows: Array<Record<string, string>> = [];
  for (const row of sheet.match(/<row [^>]*>[\s\S]*?<\/row>/g) ?? []) {
    const rec: Record<string, string> = {};
    for (const c of row.match(/<c [^>]*?(?:\/>|>[\s\S]*?<\/c>)/g) ?? []) {
      const col = c.match(/r="([A-Z]+)\d+"/)?.[1];
      if (!col) continue;
      const type = c.match(/\st="([a-zA-Z]+)"/)?.[1];
      let v = "";
      if (type === "s") v = shared[Number(c.match(/<v>(\d+)<\/v>/)?.[1] ?? -1)] ?? "";
      else if (type === "inlineStr") v = cellText(c);
      else v = decodeEntities(c.match(/<v>([\s\S]*?)<\/v>/)?.[1] ?? "");
      if (v.trim()) rec[col] = v.trim();
    }
    if (Object.keys(rec).length) rows.push(rec);
  }
  return rows;
}
