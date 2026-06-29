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

// ==============================
// 振り子
// ==============================
const group = createSVG("g");
svg.appendChild(group);

// 支点
const pivotX = 500;
const pivotY = 100;

// 糸の長さ
const length = 600;

// 糸
const rope = createSVG("line", {
    stroke: "peru",
    "stroke-width": 4,
    "stroke-linecap": "round",
});
group.appendChild(rope);

// 顔文字
const face = createSVG("text", {
    fill: "teal",
    "font-size": 50,
    "text-anchor": "middle",
    "dominant-baseline": "middle",
    "font-weight": "bold",
});
face.textContent = "(･ω･)";
group.appendChild(face);

// 支点の丸
const pivot = createSVG("circle", {
    cx: pivotX,
    cy: pivotY,
    r: 12,
    fill: "darkslategray",
});
group.appendChild(pivot);

// ==============================
// アニメーション
// ==============================
let t = 0;

function animate() {
    t += 0.02;

    // 振り子の角度（ラジアン）
    const angle = Math.sin(t) * 0.7;

    // 顔文字の位置
    const x = pivotX + Math.sin(angle) * length;
    const y = pivotY + Math.cos(angle) * length;

    // 糸更新
    rope.setAttribute("x1", pivotX);
    rope.setAttribute("y1", pivotY);
    rope.setAttribute("x2", x);
    rope.setAttribute("y2", y);

    // 顔文字更新
    face.setAttribute("x", x);
    face.setAttribute("y", y + 25);

    requestAnimationFrame(animate);
}

animate();
