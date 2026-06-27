// ==============================
// SVGを取得
// （index.svg の場合は document.documentElement）
// ==============================
const svg = document.documentElement;

// ==============================
// 画面いっぱいの正方形にする
// viewBox は常に 1000 × 1000
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
// SVG要素を簡単に作る関数
// ==============================
function createSVG(tag, attrs = {}) {
    const el = document.createElementNS(svg.namespaceURI, tag);

    for (const [key, value] of Object.entries(attrs)) {
        el.setAttribute(key, value);
    }

    return el;
}

//画面中央に円を配置
// 円
const circle = createSVG("circle", {
    cx: 500,
    cy: 500,
    r: 100,
    fill: "none",
    stroke: "black",
    "stroke-width": 5,
});
svg.appendChild(circle);

// 顔文字
const face = createSVG("text", {
    x: 500,
    y: 500,
    "text-anchor": "middle", // 横方向中央揃え
    "dominant-baseline": "middle", // 縦方向中央揃え
    "font-size": 40,
});
face.textContent = "(´・ω・`)";
svg.appendChild(face);

// アニメーション
function animate(t) {
    // 半径を変化
    const r = 125 + 75 * Math.sin(t * 0.002);

    circle.setAttribute("r", r);

    // 文字サイズも半径に合わせて変化
    const fontSize = r * 0.35;
    face.setAttribute("font-size", fontSize);

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
