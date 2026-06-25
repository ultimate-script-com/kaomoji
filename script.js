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

// ==============================
// デカルト座標の原点
//
// 数学上の原点は (0,0)
// SVG上では中央の (500,500)
// ==============================
const ORIGIN_X = 500;
const ORIGIN_Y = 500;

// ==============================
// 数学座標 → SVG座標へ変換
//
// x軸：右が +
// y軸：上が +
// SVG：下が +
// ==============================
function toSvgX(x) {
    return ORIGIN_X + x;
}

function toSvgY(y) {
    return ORIGIN_Y - y;
}

// ==============================
// x軸（矢印付き）
// ==============================
svg.appendChild(
    createSVG("line", {
        x1: 20,
        y1: ORIGIN_Y,
        x2: 980,
        y2: ORIGIN_Y,
        stroke: "#e53935",
        "stroke-width": 2,
    }),
);
// ==============================
// y軸（矢印付き）
// ==============================
svg.appendChild(
    createSVG("line", {
        x1: ORIGIN_X,
        y1: 980,
        x2: ORIGIN_X,
        y2: 20,
        stroke: "#1e88e5",
        "stroke-width": 2,
    }),
);

// ==============================
// 目盛り
// ==============================
for (let i = -400; i <= 400; i += 100) {
    const px = toSvgX(i);
    const py = toSvgY(i);

    // x軸の目盛り線
    svg.appendChild(
        createSVG("line", {
            x1: px,
            y1: ORIGIN_Y - 10,
            x2: px,
            y2: ORIGIN_Y + 10,
            stroke: "#e53935",
        }),
    );

    // y軸の目盛り線
    svg.appendChild(
        createSVG("line", {
            x1: ORIGIN_X - 10,
            y1: py,
            x2: ORIGIN_X + 10,
            y2: py,
            stroke: "#1e88e5",
        }),
    );
}

// 原点の表示
const zero = createSVG("text", {
    x: ORIGIN_X + 10,
    y: ORIGIN_Y + 30,
    "font-size": 18,
});

zero.textContent = "0";
svg.appendChild(zero);

// ==============================
// 軌跡
// ==============================
const path = createSVG("path", {
    fill: "none",
    stroke: "black",
    "stroke-width": 3,
    opacity: 0.4,
});

svg.appendChild(path);

let d = "";

// ==============================
// 顔文字
// ==============================
const face = createSVG("text", {
    "font-size": 50,
    "text-anchor": "middle",
    "dominant-baseline": "middle",
});

face.textContent = "(´・ω・`)";

svg.appendChild(face);

// ==============================
// 情報表示（(x, y)のみ）
// ==============================
const label = createSVG("text", {
    x: 20,
    y: 60,
    "font-size": 50,
    fill: "dimgray",
});

svg.appendChild(label);

// ==============================
// 対数螺旋の式
//
// r = a × e^(bθ)
// ==============================
const a = 5;
const b = 0.08;

// 数学上の中心
const cx = 0;
const cy = 0;

// 角度
let theta = 0;

// 外向きか内向きか
let inward = false;

// 一定速度
const speed = 2;

// ==============================
// アニメーション
// ==============================
function animate() {
    // --------------------------
    // 半径を計算
    // --------------------------
    const exponent = inward ? -b * theta : b * theta;

    const r = a * Math.exp(exponent);

    // --------------------------
    // 数学座標を計算
    // --------------------------
    const x = cx + r * Math.cos(theta);

    const y = cy + r * Math.sin(theta);

    // --------------------------
    // 軌跡を描く
    // --------------------------
    const sx = toSvgX(x);
    const sy = toSvgY(y);

    if (d === "") {
        d = `M ${sx} ${sy}`;
    } else {
        d += ` L ${sx} ${sy}`;
    }

    path.setAttribute("d", d);

    // --------------------------
    // 顔文字を移動
    // --------------------------
    face.setAttribute("transform", `translate(${sx},${sy})`);

    // --------------------------
    // 計算式を表示
    // --------------------------

    label.textContent = `θ = ${theta.toFixed(1)} rad`;

    // --------------------------
    // 一定速度で動く
    //
    // ds = r√(1+b²)dθ
    // dθ = speed / (r√(1+b²))
    // --------------------------
    theta += speed / (r * Math.sqrt(1 + b * b));

    // --------------------------
    // 外側まで行ったら
    // 中心へ向かう
    // --------------------------
    if (!inward && r > 420) {
        inward = true;
        theta = 0;

        d = "";
        path.setAttribute("d", "");
    }

    // --------------------------
    // 中心まで戻ったら
    // 再び外へ向かう
    // --------------------------
    if (inward && r < 5.5) {
        inward = false;
        theta = 0;

        d = "";
        path.setAttribute("d", "");
    }

    requestAnimationFrame(animate);
}

// ==============================
// アニメーション開始
// ==============================
animate();
