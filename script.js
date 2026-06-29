console.log("(･ω･)"); //普段用いる絵文字をメモ ※絶対消すな

const svg = document.documentElement;

// ==============================
// レスポンシブ
// ==============================
function resize() {
    const size = Math.min(window.innerWidth * 0.9, window.innerHeight * 0.9);

    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    svg.setAttribute("viewBox", "0 0 1000 1000");
}
resize();
window.addEventListener("resize", resize);

// ==============================
// SVG作成
// ==============================
function createSVG(tag, attrs = {}) {
    const el = document.createElementNS(svg.namespaceURI, tag);

    for (const [k, v] of Object.entries(attrs)) {
        el.setAttribute(k, v);
    }

    return el;
}

// 背景
svg.appendChild(
    createSVG("rect", {
        width: 1000,
        height: 1000,
        fill: "#111",
    }),
);

// 多角形
const polygon = createSVG("polygon", {
    fill: "rgba(0,255,255,0.2)",
    stroke: "cyan",
    "stroke-width": 5,
});
svg.appendChild(polygon);

// π表示
const text = createSVG("text", {
    x: 500,
    y: 100,
    fill: "white",
    "font-size": 42,
    "text-anchor": "middle",
    "font-family": "monospace",
});
svg.appendChild(text);

// 顔文字
const face = createSVG("text", {
    x: 500,
    y: 520,
    fill: "orange",
    "font-size": 60,
    "text-anchor": "middle",
});
face.textContent = "(･ω･)";
svg.appendChild(face);

// ==============================
// 頂点生成
// ==============================
function getPoints(sides) {
    const pts = [];
    const r = 320;
    const cx = 500;
    const cy = 500;

    for (let i = 0; i < sides; i++) {
        const a = (i * Math.PI * 2) / sides - Math.PI / 2;

        pts.push({
            x: cx + r * Math.cos(a),
            y: cy + r * Math.sin(a),
        });
    }

    return pts;
}

// ==============================
// 頂点数を合わせる
// ==============================
function resample(points, n) {
    const result = [];

    for (let i = 0; i < n; i++) {
        const j = (i / n) * points.length;
        const a = Math.floor(j);
        const b = (a + 1) % points.length;
        const t = j - a;

        const p1 = points[a];
        const p2 = points[b];

        result.push({
            x: p1.x + (p2.x - p1.x) * t,
            y: p1.y + (p2.y - p1.y) * t,
        });
    }

    return result;
}

// ==============================
// モーフィング
// ==============================
let sides = 6;
let nextSides = 7;
let t = 0;

function animate() {
    const n = Math.max(sides, nextSides);

    const p1 = resample(getPoints(sides), n);
    const p2 = resample(getPoints(nextSides), n);

    const pts = [];

    for (let i = 0; i < n; i++) {
        const x = p1[i].x + (p2[i].x - p1[i].x) * t;

        const y = p1[i].y + (p2[i].y - p1[i].y) * t;

        pts.push(`${x},${y}`);
    }

    polygon.setAttribute("points", pts.join(" "));

    const displaySides = sides + t;

    const piApprox = displaySides * Math.sin(Math.PI / displaySides);

    text.textContent = `π=${piApprox.toFixed(4)}　${~~displaySides}角形`;

    const progress = sides / 500;
    const speed = 0.002 + 0.2 * Math.sqrt(progress);

    t += speed;

    if (t >= 1) {
        t = 0;
        sides++;
        nextSides++;

        if (nextSides > 500) {
            sides = 500;
            nextSides = 501;
        }
    }

    requestAnimationFrame(animate);
}

setTimeout(animate, 300);
