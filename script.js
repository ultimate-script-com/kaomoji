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
// 正方形とテキスト
// ==============================
const square = createSVG("rect", {
    x: 250,
    y: 250,
    width: 0,
    height: 0,
    fill: "skyblue",
    stroke: "black",
    "stroke-width": 3,
});
svg.appendChild(square);

const areaText = createSVG("text", {
    x: 500,
    y: 500,
    "text-anchor": "middle",
    "dominant-baseline": "middle",
    "font-size": 100,
    "font-weight": "bold",
    fill: "black",
});
svg.appendChild(areaText);

const rootText = createSVG("text", {
    x: 500,
    y: 0,
    "text-anchor": "middle",
    "font-size": 64,
    "font-weight": "bold",
    fill: "teal",
});
svg.appendChild(rootText);

const approximate = createSVG("text", {
    x: 500,
    y: 900,
    "text-anchor": "middle",
    "dominant-baseline": "middle",
    "font-size": 64,
    "font-weight": "bold",
    fill: "teal",
});
svg.appendChild(approximate);

// ==============================
// アニメーション
// ==============================
let n = 1;
let start = null;
const duration = 1000; // 1秒

function animate(time) {
    if (!start) start = time;

    const t = (time - start) / duration;

    // 現在の面積から一辺を計算
    const side = Math.sqrt(n) * 150;

    const x = 500 - side / 2;
    const y = 500 - side / 2;

    square.setAttribute("width", side);
    square.setAttribute("height", side);
    square.setAttribute("x", x);
    square.setAttribute("y", y);

    // 面積を正方形の中央へ配置
    areaText.textContent = n;
    areaText.setAttribute("x", x + side / 2);
    areaText.setAttribute("y", y + side / 2);

    // √nを正方形の上辺へ配置
    rootText.textContent = `${Math.sqrt(n).toFixed(3)}`;
    rootText.setAttribute("x", x + side / 2);
    rootText.setAttribute("y", Math.max(40, y - 20));

    //ルートの近似値を表示
    approximate.textContent = `√${n} ≒ ${Math.sqrt(n).toFixed(3)}`;

    if (t >= 1) {
        n++;

        if (n > 10) {
            n = 1;
        }

        start = time;
    }

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
