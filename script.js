// svg要素を取得する
const svg = document.documentElement;

// ==============================
// 表示範囲を正方形にして、レスポンシブ対応
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

// ==============================
// タイトル
// ==============================
const formula = createSVG("text", {
    x: 500,
    y: 80,
    "text-anchor": "middle",
    "font-size": 32,
});

formula.textContent = "赤線が同じ長さになった時の角度が1ラジアン";
svg.appendChild(formula);

// ==============================
// 大きい円
// ==============================
const R = 400;

const circle = createSVG("circle", {
    cx: 500,
    cy: 500,
    r: R,
    fill: "none",
    stroke: "black",
    "stroke-width": 2,
});
svg.appendChild(circle);

// 固定された半径
const rLine = createSVG("line", {
    x1: 500,
    y1: 500,
    x2: 900,
    y2: 500,
    stroke: "black",
    "stroke-width": 6,
});
svg.appendChild(rLine);

// 動く半径
const line = createSVG("line", {
    x1: 500,
    y1: 500,
    x2: 900,
    y2: 500,
    stroke: "red",
    "stroke-width": 6,
});
svg.appendChild(line);

// ==============================
// 大きい円の弧
// ==============================
const arc = createSVG("circle", {
    cx: 500,
    cy: 500,
    r: R,
    fill: "none",
    stroke: "red",
    "stroke-width": 6,
});

svg.appendChild(arc);

const circumference = 2 * Math.PI * R;
arc.style.strokeDasharray = `0 ${circumference}`;

// ==============================
// 小さい円の弧
// ==============================
const a = 80;

const smallArc = createSVG("circle", {
    cx: 500,
    cy: 500,
    r: a,
    fill: "none",
    stroke: "blue",
    "stroke-width": 6,
});

svg.appendChild(smallArc);

const smallCircumference = 2 * Math.PI * a;
smallArc.style.strokeDasharray = `0 ${smallCircumference}`;

// ==============================
// 顔文字
// ==============================
const faceBaseX = 500;
const faceBaseY = 400;

const face = createSVG("text", {
    x: faceBaseX,
    y: faceBaseY,
    "text-anchor": "middle",
    "dominant-baseline": "middle",
    "font-size": 80,
    fill: "teal",
});

face.textContent = "(･ω･)";
svg.appendChild(face);

// ==============================
// ブルブルアニメーション
// ==============================
let shaking = false;

function shakeFace() {
    if (!shaking) return;

    const dx = (Math.random() - 0.5) * 20;
    const dy = (Math.random() - 0.5) * 20;

    face.setAttribute("x", faceBaseX + dx);
    face.setAttribute("y", faceBaseY + dy);

    requestAnimationFrame(shakeFace);
}

// ==============================
// メインアニメーション
// ==============================
let angle = 0;

function animateRadian() {
    angle += 0.005;

    // 赤い半径を回転
    const x = 500 + Math.cos(angle) * R;
    const y = 500 + Math.sin(angle) * R;

    line.setAttribute("x2", x);
    line.setAttribute("y2", y);

    // 大きい円の弧
    const bigArcLength = R * angle;
    arc.style.strokeDasharray = `${bigArcLength} ${circumference}`;

    // 小さい円の弧
    const smallArcLength = a * angle;
    smallArc.style.strokeDasharray = `${smallArcLength} ${smallCircumference}`;

    // 1ラジアン到達
    if (angle >= 1) {
        angle = 0;

        face.textContent = "(ﾟ∀ﾟ)";
        face.setAttribute("fill", "gold");

        shaking = true;
        shakeFace();

        setTimeout(() => {
            shaking = false;

            face.setAttribute("x", faceBaseX);
            face.setAttribute("y", faceBaseY);

            face.textContent = "(･ω･)";
            face.setAttribute("fill", "teal");

            requestAnimationFrame(animateRadian);
        }, 2000);

        return;
    }

    requestAnimationFrame(animateRadian);
}

animateRadian();
