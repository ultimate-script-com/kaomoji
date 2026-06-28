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

const face = createSVG("text", {
    x: 500,
    y: 500,
    "text-anchor": "middle", // 横中央揃え
    "dominant-baseline": "middle", // 縦中央揃え
    "font-size": 100,
    "font-weight": "bold",
    fill: "teal",
});

face.textContent = "(･ω･)";
svg.appendChild(face);

let hue = 0;
const circleGenerator = (r) => {
    hue = (hue + 1) % 360;
    // 円を作成
    const circle = createSVG("circle", {
        cx: 500, // 中心X
        cy: 500, // 中心Y
        r: r, // 半径
        fill: "none",
        stroke: `hsl(${hue}, 100%, 50%)`,
    });

    // SVGに追加
    svg.appendChild(circle);
};

let r = 450;
let t = 0;
function animate() {
    if (r < 250) {
        face.textContent = "(ﾟ∀ﾟ)";
        face.setAttribute("fill", "orange");

        t++;

        face.setAttribute("x", 500 + Math.sin(t) * 2);
        face.setAttribute("y", 500 + Math.cos(t) * 2);
    }

    if (r > 0) {
        r--;
    } else {
        r = 450;
        svg.innerHTML = "";
        face.textContent = "(･ω･)";
        face.setAttribute("fill", "teal");
        svg.appendChild(face);
    }
    circleGenerator(r);

    requestAnimationFrame(animate);
}

animate();
