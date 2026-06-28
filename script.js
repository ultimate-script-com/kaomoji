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
// パラメータ
// ==============================
const g = 0.6;
const bounce = 0.75;
const floor = 950;

const faces = [];

// ランダム色
function randomColor() {
    return `hsl(${Math.random() * 360}, 80%, 50%)`;
}

// ==============================
// 10個生成
// ==============================
for (let i = 0; i < 10; i++) {
    const el = createSVG("text", {
        x: Math.random() * 900 + 50,
        y: Math.random() * 200,
        fill: randomColor(),
        "font-size": 48,
        "font-weight": "bold",
    });

    const emojiList = ["(･ω･)", "(ﾟ∀ﾟ)", "(｀・ω・´)"];
    el.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];

    svg.appendChild(el);

    faces.push({
        el,
        x: parseFloat(el.getAttribute("x")),
        y: parseFloat(el.getAttribute("y")),
        v: 0,
        color: el.getAttribute("fill"),
    });
}

// ==============================
// アニメーション
// ==============================
function animate() {
    for (const f of faces) {
        f.v += g;
        f.y += f.v;

        if (f.y > floor) {
            f.y = floor;
            f.v = -f.v * bounce;

            // 止まりそうならリセット＆色変更
            if (Math.abs(f.v) < 0.5) {
                f.y = Math.random() * -300;
                f.v = 0;
                f.x = Math.random() * 900 + 50;

                f.el.setAttribute("fill", randomColor());
                f.el.setAttribute("x", f.x);
            }
        }

        f.el.setAttribute("y", f.y);
    }

    requestAnimationFrame(animate);
}

animate();
