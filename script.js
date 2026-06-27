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

const rectGenerator = (rectSize) => {
    const rect = createSVG("rect", {
        x: 500 - rectSize / 2,
        y: 500 - rectSize / 2,
        width: rectSize,
        height: rectSize,
        fill: "none",
        stroke: "black",
    });

    svg.appendChild(rect);
};

const text = createSVG("text", {
    x: 500,
    y: 500,
    fill: "black",
    "text-anchor": "middle",
    "dominant-baseline": "middle",
    "font-size": 70,
});

text.textContent = "(´・ω・`)";
svg.appendChild(text);

let size = 800;
function animate() {
    if (size >= 10) {
        size -= 3;
    } else {
        size = 800;
        svg.replaceChildren();
        svg.appendChild(text);
        text.textContent = "(´・ω・`)";
        text.setAttribute("fill", "black");
    }
    rectGenerator(size);

    if (size <= 400) {
        text.textContent = "(ﾟ∀ﾟ)";
        text.setAttribute("fill", "gold");
    }
    if (size <= 200) {
        text.setAttribute("fill", "red");
    }

    requestAnimationFrame(animate);
}

animate();
