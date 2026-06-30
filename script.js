console.log("(･ω･)");

const svg = document.documentElement;

// ====================
// レスポンシブ
// ====================
function resize() {
    const s = Math.min(innerWidth, innerHeight) * 0.95;
    svg.setAttribute("width", s);
    svg.setAttribute("height", s);
    svg.setAttribute("viewBox", "0 0 1000 1000");
}
resize();
addEventListener("resize", resize);

// ====================
// SVG生成関数
// ====================
const el = (t, a = {}) => {
    const n = document.createElementNS("http://www.w3.org/2000/svg", t);
    Object.entries(a).forEach(([k, v]) => n.setAttribute(k, v));
    return n;
};

// ====================
// 動かすキャラクター
// ====================
let px = 500;
let py = 300;

const face = el("text", {
    x: px,
    y: py,
    fill: "teal",
    "font-size": 100,
    "text-anchor": "middle",
    "dominant-baseline": "middle",
});

face.textContent = "(･ω･)";
svg.append(face);

function updateFace() {
    face.setAttribute("x", px);
    face.setAttribute("y", py);
}

// ====================
// 文字ボタン
// ====================
function textBtn(x, y, label, on) {
    const t = el("text", {
        x,
        y,
        "font-size": 120,
        fill: "olive",
        "text-anchor": "middle",
        "dominant-baseline": "middle",
        cursor: "pointer",
        "user-select": "none",
    });

    t.textContent = label;
    t.addEventListener("click", on);

    svg.append(t);
}

// ====================
// 移動量
// ====================
const d = 50;

// ↑
textBtn(500, 700, "▲", () => {
    py -= d;
    updateFace();
});

// ←
textBtn(350, 850, "◀", () => {
    px -= d;
    updateFace();
});

// ↓
textBtn(500, 850, "▼", () => {
    py += d;
    updateFace();
});

// →
textBtn(650, 850, "▶", () => {
    px += d;
    updateFace();
});
