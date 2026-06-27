//svg要素を取得する
const svg = document.documentElement;

// ==============================
// 表示範囲を正方形にして、レスポンシブ対応
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

const formula = createSVG("text", {
    x: 300,
    y: 200,
    "text-anchor": "middle",
    "font-style": "italic",
    "font-family": "Cambria Math, STIX Two Math, serif",
    "font-size": 150,
});

formula.textContent = "y = x";
svg.appendChild(formula);

const face = createSVG("text", {
    x: 500,
    y: 500,
    "font-size": 32,
    fill: "teal",
});

face.textContent = "(･ω･)";
svg.appendChild(face);

const info = createSVG("text", {
    x: 300,
    y: 350,
    "text-anchor": "middle",
    "font-size": 50,
});

svg.appendChild(info);

let x = 0;
const animate = () => {
    if (x < 500) {
        x++;
    } else {
        x = 0;
    }

    const y = x;

    face.setAttribute("x", 500 + x);
    face.setAttribute("y", 500 - y);

    // xとyをリアルタイム表示
    info.textContent = `x = ${x} , y = ${y}`;

    requestAnimationFrame(animate);
};
animate();
