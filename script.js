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
// 歯車グループ
// ==============================
const gearGroup = createSVG("g");
svg.appendChild(gearGroup);

// 歯車の中心
const cx = 500;
const cy = 500;

// ------------------------------
// 歯車本体
// ------------------------------
const gear = createSVG("path", {
    fill: "teal",
    stroke: "black",
});
gearGroup.appendChild(gear);

// ------------------------------
// 中央の顔文字
// ------------------------------
const face = createSVG("text", {
    x: cx,
    y: cy,
    "text-anchor": "middle",
    "dominant-baseline": "middle",
    "font-size": 100,
    "font-weight": "bold",
    fill: "tan",
});
face.textContent = "(･ω･)";
gearGroup.appendChild(face);

// ==============================
// 歯車の形を作る
// ==============================
function makeGear(teeth = 20, rootR = 240, tipR = 300) {
    let d = "";
    const step = (Math.PI * 2) / teeth;

    for (let i = 0; i < teeth; i++) {
        const a1 = i * step;
        const a2 = a1 + step * 0.25;
        const a3 = a1 + step * 0.75;
        const a4 = a1 + step;

        // 根元
        const x1 = cx + rootR * Math.cos(a1);
        const y1 = cy + rootR * Math.sin(a1);

        // 歯の左側（半径方向）
        const x2 = cx + tipR * Math.cos(a2);
        const y2 = cy + tipR * Math.sin(a2);

        // 歯の右側（半径方向）
        const x3 = cx + tipR * Math.cos(a3);
        const y3 = cy + tipR * Math.sin(a3);

        // 次の根元
        const x4 = cx + rootR * Math.cos(a4);
        const y4 = cy + rootR * Math.sin(a4);

        if (i === 0) {
            d += `M ${x1} ${y1} `;
        }

        d += `
            L ${x2} ${y2}
            L ${x3} ${y3}
            L ${x4} ${y4}
        `;
    }

    d += "Z";

    gear.setAttribute("d", d);
}

makeGear();

// ==============================
// 回転アニメーション
// ==============================
let angle = 0;

function animate() {
    angle += 1;

    gearGroup.setAttribute("transform", `rotate(${angle} ${cx} ${cy})`);

    requestAnimationFrame(animate);
}

animate();
