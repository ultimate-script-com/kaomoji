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
// コップ
// ==============================
const cupX = 200;
const cupY = 100;
const cupW = 500;
const cupH = 800;

// ==============================
// 水用クリップ
// ==============================
const defs = createSVG("defs");
svg.appendChild(defs);

const clip = createSVG("clipPath", {
    id: "waterClip",
});

clip.appendChild(
    createSVG("rect", {
        x: cupX + 10,
        y: cupY + 80,
        width: cupW - 20,
        height: cupH - 90,
    }),
);

defs.appendChild(clip);

// ==============================
// 水グループ
// ==============================
const waterGroup = createSVG("g", {
    "clip-path": "url(#waterClip)",
});

svg.appendChild(waterGroup);

// ==============================
// 水
// ==============================
const water = createSVG("path", {
    fill: "#69c8ff",
    opacity: 0.9,
});

waterGroup.appendChild(water);

// ==============================
// 顔文字
// ==============================
const kaomoji = createSVG("text", {
    x: 500,
    y: 500,
    "font-size": 64,
    "text-anchor": "middle",
    "dominant-baseline": "middle",
    "font-family": "monospace",
    "font-weight": "bold",
    fill: "teal",
});

kaomoji.textContent = "(･ω･)";
waterGroup.appendChild(kaomoji);

// ==============================
// コップ本体
// ==============================
svg.appendChild(
    createSVG("rect", {
        x: cupX,
        y: cupY,
        width: cupW,
        height: cupH,
        rx: 20,
        ry: 20,
        fill: "none",
        stroke: "#555",
        "stroke-width": 12,
    }),
);

// ハイライト
svg.appendChild(
    createSVG("rect", {
        x: cupX + 30,
        y: cupY + 40,
        width: 25,
        height: cupH - 80,
        rx: 10,
        fill: "white",
        opacity: 0.35,
    }),
);

// ==============================
// 泡
// ==============================
const bubbles = [];

for (let i = 0; i < 20; i++) {
    const r = 4 + Math.random() * 8;

    const b = createSVG("circle", {
        cx: cupX + 50 + Math.random() * (cupW - 100),
        cy: cupY + 120 + Math.random() * (cupH - 180),
        r,
        fill: "white",
        opacity: 0.3,
    });

    waterGroup.appendChild(b);

    bubbles.push({
        el: b,
        x: Number(b.getAttribute("cx")),
        y: Number(b.getAttribute("cy")),
        speed: 0.2 + Math.random() * 0.4,
    });
}

// ==============================
// 水面
// ==============================
let waterLevel = cupY + 270;

function createWave(time) {
    const amplitude = 12;
    const wavelength = 70;

    let d = `M ${cupX} ${cupY + cupH}`;
    d += ` L ${cupX} ${waterLevel}`;

    for (let x = cupX; x <= cupX + cupW; x += 5) {
        const y =
            waterLevel +
            Math.sin(x / wavelength + time) * amplitude +
            Math.sin(x / 40 + time * 1.5) * 3;

        d += ` L ${x} ${y}`;
    }

    d += ` L ${cupX + cupW} ${cupY + cupH}`;
    d += ` Z`;

    return d;
}

// ==============================
// 顔文字の位置
// ==============================
const faceX = cupX + cupW / 2;

// ==============================
// アニメーション
// ==============================
let t = 0;

function animate() {
    t += 0.04;

    // 水
    water.setAttribute("d", createWave(t));

    // 顔文字を浮かせる
    const faceY =
        waterLevel +
        Math.sin(faceX / 70 + t) * 12 +
        Math.sin(faceX / 40 + t * 1.5) * 3 -
        35;

    kaomoji.setAttribute("x", faceX + Math.sin(t * 1.5) * 20);

    kaomoji.setAttribute("y", faceY + Math.sin(t * 3) * 5);

    // 少し回転
    const angle = Math.sin(t * 2) * 8;

    kaomoji.setAttribute("transform", `rotate(${angle} ${faceX} ${faceY})`);

    // 泡
    bubbles.forEach((b, i) => {
        b.y -= b.speed;

        if (b.y < cupY + 120) {
            b.y = cupY + cupH - 40;
            b.x = cupX + 50 + Math.random() * (cupW - 100);
        }

        b.el.setAttribute("cx", b.x + Math.sin(t * 2 + i) * 5);

        b.el.setAttribute("cy", b.y);
    });

    requestAnimationFrame(animate);
}

animate();
