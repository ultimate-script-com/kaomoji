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

const ball = createSVG("circle", {
    cx: 100,
    cy: 500,
    r: 16,
    fill: "tan",
});
svg.appendChild(ball);

// 二次関数の設定
const a = 1 / 200;
let x = -400;
let y = 0;

// スケール（見やすくするため）
const scaleX = 1;
const scaleY = 1;

const face = createSVG("text", {
    x: 300 + 400 * scaleX,
    y: 100 + a * 400 ** 2 * scaleY,
    "font-size": 64,
    "font-weight": "bold",
});
svg.appendChild(face);

let t = 0;

const animation = () => {
    face.setAttribute("fill", "teal");
    face.textContent = "(･ω･)";

    y = a * x ** 2;
    const svgX = 400 + x * scaleX;
    const svgY = 100 + y * scaleY;
    x += 6;

    if (x >= 200) {
        t += 0.3;

        const shakeX = (Math.random() - 0.5) * 6; // ±3px
        const shakeY = (Math.random() - 0.5) * 6;

        face.setAttribute("transform", `translate(${shakeX}, ${shakeY})`);
        face.setAttribute("fill", "gold");
        face.textContent = "(ﾟ∀ﾟ)";
    }

    if (x >= 400) {
        x = -400;
    }

    ball.setAttribute("cx", svgX);
    ball.setAttribute("cy", svgY);

    requestAnimationFrame(animation);
};
animation();
