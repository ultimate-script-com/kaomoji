//普段用いる絵文字をメモ
console.log("(･ω･)");

// svg要素
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
// バウンドボール
// ==============================

const ball = createSVG("text", {
    x: 500,
    y: 100,
    fill: "teal",
    "font-size": "64",
    "font-weight": "bold",
});
ball.textContent = "(･ω･)";

svg.appendChild(ball);

// 物理パラメータ
const startY = 100;
const startX = 500;

let x = startX;
let y = startY;
let v = 0;

const g = 1;
const bounce = 0.8;
const floor = 950;

function animate() {
    v += g;
    y += v;

    // 着地
    if (y > floor) {
        y = floor;
        v = -v * bounce;

        // ほぼ止まったらリセット
        if (Math.abs(v) < 0.5) {
            reset();
        }
    }

    ball.setAttribute("y", y);

    requestAnimationFrame(animate);
}

function reset() {
    y = startY;
    v = 0;
}

animate();
