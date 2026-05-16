/**
 * Builds lib/charlotte-geo.ts from REAL data:
 *   - Streets + rivers: OpenStreetMap, via the Overpass API
 *   - Elevation contours: terrarium terrain tiles (SRTM-derived), marching squares
 *
 * Run once with `npm run build:geo`. The output is committed; nothing fetches
 * at runtime. Everything is projected into a shared 512x512 Web-Mercator box so
 * the street and contour layers register exactly.
 */
import { writeFileSync } from "node:fs";
import { PNG } from "pngjs";

const Z = 10;
const TX = [281, 282]; // tile columns covering the Charlotte metro
const TY = [404, 405]; // tile rows
const TILE = 256;
const WORLD = TILE * 2 ** Z;

const lon2wx = (lon) => ((lon + 180) / 360) * WORLD;
const lat2wy = (lat) => {
  const r = (lat * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * WORLD;
};
const wx2lon = (wx) => (wx / WORLD) * 360 - 180;
const wy2lat = (wy) => {
  const n = Math.PI - (2 * Math.PI * wy) / WORLD;
  return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
};

const originX = TX[0] * TILE;
const originY = TY[0] * TILE;
const W = TX.length * TILE; // 512
const H = TY.length * TILE; // 512

const west = wx2lon(originX);
const east = wx2lon(originX + W);
const north = wy2lat(originY);
const south = wy2lat(originY + H);

const project = (lon, lat) => [
  lon2wx(lon) - originX,
  lat2wy(lat) - originY,
];

// Uptown Charlotte, in projected coordinates — the convergence point.
const MARKER = project(-80.8431, 35.2271);

// Orient a polyline so it runs from the far end toward uptown, so a uniform
// stroke-dashoffset animation flows inward toward the city center.
function orientInward(pts) {
  const d = (p) => (p[0] - MARKER[0]) ** 2 + (p[1] - MARKER[1]) ** 2;
  return d(pts[0]) < d(pts[pts.length - 1]) ? pts.slice().reverse() : pts;
}

// --- elevation tiles -------------------------------------------------------
async function fetchTile(x, y) {
  const url = `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${Z}/${x}/${y}.png`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`tile ${x}/${y} -> HTTP ${res.status}`);
  return PNG.sync.read(Buffer.from(await res.arrayBuffer()));
}

console.log("Fetching terrain tiles...");
const elev = new Float32Array(W * H);
for (let ti = 0; ti < TX.length; ti++) {
  for (let tj = 0; tj < TY.length; tj++) {
    const png = await fetchTile(TX[ti], TY[tj]);
    for (let py = 0; py < TILE; py++) {
      for (let px = 0; px < TILE; px++) {
        const i = (py * png.width + px) * 4;
        const e =
          png.data[i] * 256 + png.data[i + 1] + png.data[i + 2] / 256 - 32768;
        elev[(tj * TILE + py) * W + (ti * TILE + px)] = e;
      }
    }
  }
}

// downsample (average pool) so marching squares yields smooth, sparse lines
const F = 3;
const GW = Math.floor(W / F);
const GH = Math.floor(H / F);
let grid = new Float32Array(GW * GH);
for (let gy = 0; gy < GH; gy++) {
  for (let gx = 0; gx < GW; gx++) {
    let s = 0;
    for (let dy = 0; dy < F; dy++)
      for (let dx = 0; dx < F; dx++)
        s += elev[(gy * F + dy) * W + (gx * F + dx)];
    grid[gy * GW + gx] = s / (F * F);
  }
}

function blur(src, w, h) {
  const out = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let s = 0;
      let n = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const xx = x + dx;
          const yy = y + dy;
          if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue;
          s += src[yy * w + xx];
          n++;
        }
      }
      out[y * w + x] = s / n;
    }
  }
  return out;
}
grid = blur(blur(grid, GW, GH), GW, GH);

// --- marching squares ------------------------------------------------------
function contourSegments(field, w, h, level) {
  const segs = [];
  const at = (x, y) => field[y * w + x];
  const interp = (a, b, ax, ay, bx, by) => {
    const t = (level - a) / (b - a);
    return [ax + (bx - ax) * t, ay + (by - ay) * t];
  };
  for (let y = 0; y < h - 1; y++) {
    for (let x = 0; x < w - 1; x++) {
      const tl = at(x, y);
      const tr = at(x + 1, y);
      const br = at(x + 1, y + 1);
      const bl = at(x, y + 1);
      let idx = 0;
      if (tl > level) idx |= 1;
      if (tr > level) idx |= 2;
      if (br > level) idx |= 4;
      if (bl > level) idx |= 8;
      const top = () => interp(tl, tr, x, y, x + 1, y);
      const right = () => interp(tr, br, x + 1, y, x + 1, y + 1);
      const bottom = () => interp(bl, br, x, y + 1, x + 1, y + 1);
      const left = () => interp(tl, bl, x, y, x, y + 1);
      switch (idx) {
        case 1: case 14: segs.push([top(), left()]); break;
        case 2: case 13: segs.push([top(), right()]); break;
        case 3: case 12: segs.push([left(), right()]); break;
        case 4: case 11: segs.push([right(), bottom()]); break;
        case 5: segs.push([top(), left()]); segs.push([right(), bottom()]); break;
        case 6: case 9: segs.push([top(), bottom()]); break;
        case 7: case 8: segs.push([left(), bottom()]); break;
        case 10: segs.push([top(), right()]); segs.push([left(), bottom()]); break;
      }
    }
  }
  return segs;
}

function joinSegments(segs) {
  const key = (p) => `${Math.round(p[0] * 64)},${Math.round(p[1] * 64)}`;
  const map = new Map();
  for (const s of segs) {
    for (const e of [0, 1]) {
      const k = key(s[e]);
      if (!map.has(k)) map.set(k, []);
      map.get(k).push({ s, e });
    }
  }
  const used = new Set();
  const lines = [];
  for (const s of segs) {
    if (used.has(s)) continue;
    used.add(s);
    const line = [s[0], s[1]];
    for (let dir = 0; dir < 2; dir++) {
      let grow = true;
      while (grow) {
        grow = false;
        const tip = dir === 0 ? line[line.length - 1] : line[0];
        const cand = (map.get(key(tip)) || []).filter((o) => !used.has(o.s));
        if (cand.length) {
          const o = cand[0];
          used.add(o.s);
          const next = o.e === 0 ? o.s[1] : o.s[0];
          if (dir === 0) line.push(next);
          else line.unshift(next);
          grow = true;
        }
      }
    }
    lines.push(line);
  }
  return lines;
}

function simplify(pts, eps) {
  if (pts.length < 3) return pts;
  const sqd = (p, a, b) => {
    let x = a[0];
    let y = a[1];
    let dx = b[0] - x;
    let dy = b[1] - y;
    if (dx || dy) {
      const t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
      if (t > 1) {
        x = b[0];
        y = b[1];
      } else if (t > 0) {
        x += dx * t;
        y += dy * t;
      }
    }
    dx = p[0] - x;
    dy = p[1] - y;
    return dx * dx + dy * dy;
  };
  const keep = new Array(pts.length).fill(false);
  keep[0] = keep[pts.length - 1] = true;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    let maxd = 0;
    let mi = -1;
    for (let i = a + 1; i < b; i++) {
      const d = sqd(pts[i], pts[a], pts[b]);
      if (d > maxd) {
        maxd = d;
        mi = i;
      }
    }
    if (maxd > eps * eps) {
      keep[mi] = true;
      stack.push([a, mi], [mi, b]);
    }
  }
  return pts.filter((_, i) => keep[i]);
}

// Integer-rounded path string; drops points that collapse onto the previous.
function toPath(pts, scale) {
  let out = "";
  let px = null;
  let py = null;
  for (const p of pts) {
    const x = Math.round(p[0] * scale);
    const y = Math.round(p[1] * scale);
    if (x === px && y === py) continue;
    out += (out ? "L" : "M") + x + " " + y;
    px = x;
    py = y;
  }
  return out;
}

function polylineLength(pts) {
  let len = 0;
  for (let i = 1; i < pts.length; i++) {
    len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  }
  return len;
}

// contour levels between the 6th and 96th percentile (drops water + noise)
const sorted = [...grid].sort((a, b) => a - b);
const pct = (q) => sorted[Math.floor(q * (sorted.length - 1))];
const lo = pct(0.06);
const hi = pct(0.96);
const LEVELS = 9;
const contours = [];
for (let i = 0; i < LEVELS; i++) {
  const level = lo + ((hi - lo) * (i + 0.5)) / LEVELS;
  const lines = joinSegments(contourSegments(grid, GW, GH, level));
  for (const raw of lines) {
    const pts = simplify(raw, 0.45);
    if (pts.length < 4) continue;
    contours.push({ d: toPath(pts, F), t: +(i / (LEVELS - 1)).toFixed(3) });
  }
}
console.log(`Contours: ${contours.length} polylines`);

// --- streets + rivers from OpenStreetMap -----------------------------------
const bbox = `${south},${west},${north},${east}`;
const query =
  `[out:json][timeout:90];(` +
  `way["highway"~"^(motorway|trunk|primary)$"](${bbox});` +
  `way["waterway"="river"](${bbox});` +
  `);out geom;`;

const ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let osm = null;
for (let attempt = 0; attempt < 3 && !osm; attempt++) {
  for (const ep of ENDPOINTS) {
    try {
      console.log(`Querying Overpass: ${ep} (attempt ${attempt + 1})`);
      const res = await fetch(`${ep}?data=${encodeURIComponent(query)}`, {
        headers: { "User-Agent": "charlotte-hero-build/1.0 (personal site)" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      osm = await res.json();
      break;
    } catch (err) {
      console.warn(`  failed: ${err.message}`);
    }
  }
  if (!osm) await sleep(6000);
}
if (!osm) throw new Error("All Overpass endpoints failed");

// Split every way into segments by class, then merge segments that share a
// node into long continuous polylines — far fewer, longer paths than the
// thousands of raw OSM way fragments.
const majorSegs = [];
const minorSegs = [];
const riverSegs = [];
for (const el of osm.elements) {
  if (el.type !== "way" || !el.geometry) continue;
  const pts = el.geometry.filter(Boolean).map((g) => project(g.lon, g.lat));
  if (pts.length < 2) continue;
  const hw = el.tags?.highway;
  let bucket = null;
  if (hw === "motorway" || hw === "trunk") bucket = majorSegs;
  else if (hw === "primary") bucket = minorSegs;
  else if (el.tags?.waterway === "river") bucket = riverSegs;
  if (!bucket) continue;
  for (let i = 1; i < pts.length; i++) bucket.push([pts[i - 1], pts[i]]);
}

const streets = [];
for (const line of joinSegments(majorSegs)) {
  const s = simplify(orientInward(line), 1.1);
  if (s.length >= 2 && polylineLength(s) > 3) {
    streets.push({ d: toPath(s, 1), w: 1.9 });
  }
}
for (const line of joinSegments(minorSegs)) {
  const s = simplify(orientInward(line), 1.4);
  if (s.length >= 2 && polylineLength(s) > 7) {
    streets.push({ d: toPath(s, 1), w: 1.0 });
  }
}

const rivers = [];
for (const line of joinSegments(riverSegs)) {
  const s = simplify(line, 1.1);
  if (s.length >= 2 && polylineLength(s) > 24) rivers.push(toPath(s, 1));
}
console.log(`Streets: ${streets.length}  Rivers: ${rivers.length}`);

// --- marker (uptown Charlotte) ---------------------------------------------
const [mx, my] = MARKER;

const out = `// AUTO-GENERATED by scripts/build-charlotte-geo.mjs — do not edit by hand.
// Real Charlotte geography: streets and rivers from OpenStreetMap (Overpass
// API); elevation contours from terrarium terrain tiles (SRTM-derived) run
// through marching squares. All layers share one 512x512 Web-Mercator box.

export type GeoStreet = { d: string; w: number };
export type GeoContour = { d: string; t: number };

export const charlotteGeo = {
  viewBox: "0 0 ${W} ${H}",
  marker: {
    x: ${mx.toFixed(1)},
    y: ${my.toFixed(1)},
    label: "Charlotte",
    coords: "35.227°N · 80.843°W",
  },
  streets: ${JSON.stringify(streets)} as GeoStreet[],
  rivers: ${JSON.stringify(rivers)} as string[],
  contours: ${JSON.stringify(contours)} as GeoContour[],
};
`;

writeFileSync(new URL("../lib/charlotte-geo.ts", import.meta.url), out);
console.log(
  `Wrote lib/charlotte-geo.ts (${(out.length / 1024).toFixed(1)} KB)`,
);
