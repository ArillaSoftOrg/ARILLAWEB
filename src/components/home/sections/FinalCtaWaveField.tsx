// Deterministic (no Math.random — must match on server + client render)
// wireframe terrain for the closing CTA. Single SVG, no duplicated canvases.
//
// Four independent wave systems (A–D), each with its own shape function,
// vertical placement, amplitude, and opacity — not one master curve sliced
// into depth offsets. The only animation is a CSS translateX per group
// (right -> left, linear, never alternating), so there is no scale/rotate/
// perspective anywhere and nothing reads as depth travel.
//
// Seamless horizontal loop: each group's line set is duplicated once inside
// its own <g>, side by side (copy 2 starts exactly at VIEW_WIDTH, where copy
// 1 ends). That wrapping <g> has `transform-box: fill-box` (see globals.css),
// so a CSS `translateX(-50%)` moves it by exactly half of ITS OWN rendered
// width — i.e. exactly one copy's width — regardless of the VIEW_WIDTH
// constant below. That's what makes the loop gapless: a hardcoded pixel
// offset only stays in sync with VIEW_WIDTH by coincidence; a fill-box
// percentage can't drift out of sync with it.
const VIEW_WIDTH = 2200;
const VIEW_HEIGHT = 600;
const STEPS = 64;

function gaussianBump(x: number, center: number, width: number): number {
  const d = (x - center) / width;
  return Math.exp(-d * d);
}

// A — very shallow rolling terrain: one long, low-frequency wave.
function shapeA(xNorm: number, phase: number): number {
  return Math.sin(xNorm * Math.PI * 2 * 1.1 + phase) * 1.0;
}

// B — broad low hill -> valley -> flat.
function shapeB(xNorm: number, phase: number): number {
  return (
    gaussianBump(xNorm, 0.26, 0.2) * 1.0 -
    gaussianBump(xNorm, 0.55, 0.18) * 0.75 +
    Math.sin(xNorm * Math.PI * 2 * 3 + phase) * 0.05
  );
}

// C — long valley -> gradual center rise -> drop.
function shapeC(xNorm: number, phase: number): number {
  return (
    -gaussianBump(xNorm, 0.2, 0.26) * 0.7 +
    gaussianBump(xNorm, 0.56, 0.3) * 1.0 -
    gaussianBump(xNorm, 0.88, 0.2) * 0.6 +
    Math.sin(xNorm * Math.PI * 2 * 2 + phase) * 0.05
  );
}

// D — several wide, overlapping low hills.
function shapeD(xNorm: number, phase: number): number {
  return (
    Math.sin(xNorm * Math.PI * 2 * 1.6 + phase) * 0.55 +
    Math.sin(xNorm * Math.PI * 2 * 0.9 + phase * 0.4) * 0.4 +
    Math.sin(xNorm * Math.PI * 2 * 2.4 + phase * 0.7) * 0.3
  );
}

type Point = [number, number];

function pathFromPoints(points: Point[]): string {
  if (points.length < 2) return "";

  let d = `M ${points[0][0].toFixed(1)},${points[0][1].toFixed(1)}`;
  for (let i = 1; i < points.length - 1; i += 1) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    const mx = (x0 + x1) / 2;
    const my = (y0 + y1) / 2;
    d += ` Q ${x0.toFixed(1)},${y0.toFixed(1)} ${mx.toFixed(1)},${my.toFixed(1)}`;
  }
  const [lastX, lastY] = points[points.length - 1];
  d += ` L ${lastX.toFixed(1)},${lastY.toFixed(1)}`;
  return d;
}

type GroupId = "A" | "B" | "C" | "D";
type Tier = "core" | "extra";

type GroupConfig = {
  id: GroupId;
  shape: (xNorm: number, phase: number) => number;
  lineCount: number;
  centerY: number; // fraction of VIEW_HEIGHT
  spreadY: number; // fraction of VIEW_HEIGHT, baseline spread within the group
  ampMin: number;
  ampMax: number;
  opacityMin: number;
  opacityMax: number;
  widthMin: number;
  widthMax: number;
};

// Wide, long-wavelength, low-amplitude terrain bands — flowing digital
// landscape, not a mountain range. Amplitudes follow the brief: background
// 15–30, midground 20–40 (split across B/C), foreground 30–55.
const GROUPS: GroupConfig[] = [
  {
    id: "A",
    shape: shapeA,
    lineCount: 8,
    centerY: 0.42,
    spreadY: 0.05,
    ampMin: 15,
    ampMax: 20,
    opacityMin: 0.07,
    opacityMax: 0.1,
    widthMin: 0.5,
    widthMax: 0.65,
  },
  {
    id: "B",
    shape: shapeB,
    lineCount: 9,
    centerY: 0.58,
    spreadY: 0.08,
    ampMin: 20,
    ampMax: 28,
    opacityMin: 0.12,
    opacityMax: 0.15,
    widthMin: 0.55,
    widthMax: 0.8,
  },
  {
    id: "C",
    shape: shapeC,
    lineCount: 9,
    centerY: 0.74,
    spreadY: 0.11,
    ampMin: 26,
    ampMax: 38,
    opacityMin: 0.15,
    opacityMax: 0.18,
    widthMin: 0.65,
    widthMax: 0.95,
  },
  {
    id: "D",
    shape: shapeD,
    lineCount: 10,
    centerY: 0.9,
    spreadY: 0.12,
    ampMin: 35,
    ampMax: 55,
    opacityMin: 0.2,
    opacityMax: 0.3,
    widthMin: 0.8,
    widthMax: 1.2,
  },
];

function buildGroupLines(group: GroupConfig) {
  const { lineCount } = group;
  return Array.from({ length: lineCount }, (_, i) => {
    const t = lineCount === 1 ? 0 : i / (lineCount - 1);
    const baseY = (group.centerY - group.spreadY / 2 + group.spreadY * t) * VIEW_HEIGHT;
    const amplitude = group.ampMin + (group.ampMax - group.ampMin) * t;
    const phase = i * 0.55;

    const points: Point[] = [];
    for (let s = 0; s <= STEPS; s += 1) {
      const xNorm = s / STEPS;
      const x = xNorm * VIEW_WIDTH;
      const y = baseY + group.shape(xNorm, phase) * amplitude;
      points.push([x, y]);
    }

    const opacity = group.opacityMin + (group.opacityMax - group.opacityMin) * t;
    const strokeWidth = group.widthMin + (group.widthMax - group.widthMin) * t;

    // Responsive density: "core" lines always render (mobile included),
    // "extra" lines only join at the lg breakpoint. Even/odd split keeps
    // roughly half the field on mobile, per group, so every group stays
    // recognizable rather than one group disappearing first.
    const tier: Tier = i % 2 === 0 ? "core" : "extra";

    return { d: pathFromPoints(points), tier, opacity, strokeWidth };
  });
}

const GROUP_LINES: Record<GroupId, ReturnType<typeof buildGroupLines>> = {
  A: buildGroupLines(GROUPS[0]),
  B: buildGroupLines(GROUPS[1]),
  C: buildGroupLines(GROUPS[2]),
  D: buildGroupLines(GROUPS[3]),
};

function GroupLineSet({ lines }: { lines: ReturnType<typeof buildGroupLines> }) {
  return (
    <>
      {lines.map((line, i) => (
        <path
          key={i}
          d={line.d}
          data-tier={line.tier}
          fill="none"
          stroke="#C7F36B"
          strokeOpacity={line.opacity}
          strokeWidth={line.strokeWidth}
          strokeLinecap="round"
        />
      ))}
    </>
  );
}

export default function FinalCtaWaveField() {
  return (
    <div className="final-cta-wave-field" aria-hidden="true">
      <svg
        className="final-cta-wave-field__svg"
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        preserveAspectRatio="none"
        focusable="false"
      >
        {GROUPS.map((group) => (
          <g
            key={group.id}
            className={`final-cta-wave-field__track final-cta-wave-field__track--${group.id}`}
          >
            <g>
              <GroupLineSet lines={GROUP_LINES[group.id]} />
            </g>
            <g transform={`translate(${VIEW_WIDTH}, 0)`}>
              <GroupLineSet lines={GROUP_LINES[group.id]} />
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
