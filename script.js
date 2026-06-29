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
// 中央シーソー
// ==============================

// 支点（三角形）
const pivot = createSVG("polygon", {
    points: "500,470 470,520 530,520",
    fill: "#555",
});

// シーソー板
const plank = createSVG("rect", {
    x: 100,
    y: 450, // 少し上にして支点に“乗る”見た目へ
    width: 800,
    height: 20,
    fill: "dimgray",
    transform: "rotate(0 500 470)", // 支点基準
});

// 顔文字（左・右端）
const faceA = createSVG("text", {
    x: 150,
    y: 430,
    "font-size": 60,
    "text-anchor": "middle",
    "font-weight": "bold",
    fill: "olive",
});
faceA.textContent = "(･ω･)";

const faceB = createSVG("text", {
    x: 850,
    y: 430,
    "font-size": 60,
    "text-anchor": "middle",
    "font-weight": "bold",
    fill: "teal",
});
faceB.textContent = "(･ω･)";

// SVGに追加（支点が上に見えるよう順序も重要）
svg.appendChild(plank);
svg.appendChild(pivot);
svg.appendChild(faceA);
svg.appendChild(faceB);

// ==============================
// アニメーション（シーソー）
// ==============================
let t = 0;

const cx = 500;
const cy = 470; // ★支点の頂点に統一

function animate() {
    t += 0.02;

    const angle = Math.sin(t) * 0.35; // 揺れ角

    const deg = angle * 35;

    // シーソー回転（支点基準）
    plank.setAttribute("transform", `rotate(${deg} ${cx} ${cy})`);
    faceA.setAttribute("transform", `rotate(${deg} ${cx} ${cy})`);
    faceB.setAttribute("transform", `rotate(${deg} ${cx} ${cy})`);

    requestAnimationFrame(animate);
}

animate();
