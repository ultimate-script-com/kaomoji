console.log("(･ω･)"); //用いる絵文字、絶対消すな！！

const svg = document.documentElement;

// ====================
// レスポンシブ
// ====================
function resize() {
    const s = Math.min(innerWidth, innerHeight) * 0.95;
    svg.setAttribute("width", s);
    svg.setAttribute("height", s);
    svg.setAttribute("viewBox", "0 0 1000 1000");
}
resize();
addEventListener("resize", resize);

// ====================
// SVG生成関数
// ====================
const el = (t, a = {}) => {
    const n = document.createElementNS("http://www.w3.org/2000/svg", t);
    Object.entries(a).forEach(([k, v]) => n.setAttribute(k, v));
    return n;
};

// ====================
// 背景
// ====================
svg.append(
    el("rect", {
        width: 1000,
        height: 1000,
        fill: "#111",
    }),
);

// ====================
// 雷レイヤー
// ====================
const lightningLayer = el("g");
svg.append(lightningLayer);

const lightningCount = 8;
const lightnings = [];

for (let i = 0; i < lightningCount; i++) {
    const path = el("path", {
        fill: "none",
        stroke: "#fff",
        "stroke-width": 3,
        opacity: 0,
    });

    lightningLayer.append(path);

    lightnings.push({
        el: path,
        active: false,
        time: 0,
        duration: 0,
        startX: 0,
        endX: 0,
    });
}

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function createLightning(L) {
    const { el } = L;

    const startX = rand(100, 900);
    const endX = startX + rand(-80, 80);

    let x = startX;
    let y = rand(-100, -50);

    const segments = [];
    segments.push(`${x},${y}`);

    const points = Math.floor(rand(6, 12));

    for (let i = 0; i < points; i++) {
        y += rand(80, 150);
        x += rand(-60, 60);
        segments.push(`${x},${y}`);
    }

    segments.push(`${endX},${1000 + 100}`);

    el.setAttribute("d", "M " + segments.join(" L "));

    L.active = true;
    L.time = 0;
    L.duration = rand(20, 40); // フレーム数
    L.startX = startX;
    L.endX = endX;

    el.setAttribute("stroke-width", rand(2, 4));

    el.setAttribute("opacity", rand(0.6, 1));
}

// ====================
// 顔文字グループ
// ====================
const boss = el("g");
svg.append(boss);

const shadow = el("text", {
    x: 500,
    y: 505,
    "text-anchor": "middle",
    "dominant-baseline": "middle",
    "font-size": 120,
    "font-family": "monospace",
    "font-weight": "bold",
    fill: "#000",
    opacity: 0.6,
});
shadow.textContent = "(･ω･)";
boss.append(shadow);

const face = el("text", {
    x: 500,
    y: 500,
    "text-anchor": "middle",
    "dominant-baseline": "middle",
    "font-size": 120,
    "font-family": "monospace",
    "font-weight": "bold",
});

const chars = ["(", "･", "ω", "･", ")"];
const spans = [];

chars.forEach((c) => {
    const t = el("tspan");
    t.textContent = c;
    face.append(t);
    spans.push(t);
});

boss.append(face);

// ====================
// レインボー色
// ====================
let hue = 0;

function rainbowColor(h) {
    let l = 70;

    if (h >= 180 && h <= 300) {
        l = 80;
    }

    return `hsl(${h},100%,${l}%)`;
}

// ====================
// アニメーション
// ====================
let t = 0;

function animate() {
    t += 0.02;
    hue = (hue + 1) % 360;

    // ボスの鼓動
    const scale = 1 + Math.sin(t * 2.5) * 0.05;

    const y = Math.sin(t * 2) * 10;

    boss.setAttribute(
        "transform",
        `translate(500 ${500 + y})
         scale(${scale})
         translate(-500 -500)`,
    );

    // 顔文字を虹色発光
    spans.forEach((sp, i) => {
        const h = (hue + i * 72) % 360;

        const color = rainbowColor(h);

        sp.setAttribute("fill", color);

        sp.setAttribute(
            "filter",
            `drop-shadow(0 0 10px ${color})
             drop-shadow(0 0 20px ${color})
             drop-shadow(0 0 35px ${color})`,
        );
    });

    // ランダムで雷を落とす
    if (Math.random() < 0.05) {
        const L = lightnings.find((l) => !l.active);

        if (L) {
            createLightning(L);
        }
    }

    // 雷アニメーション
    lightnings.forEach((L) => {
        if (!L.active) return;

        L.time++;

        const alpha = 1 - L.time / L.duration;

        L.el.setAttribute("opacity", alpha);

        // 点滅
        if (Math.random() < 0.4) {
            L.el.setAttribute("opacity", alpha * 0.3);
        }

        // 雷の色
        const c = rainbowColor((hue + L.startX / 3) % 360);

        L.el.setAttribute("stroke", c);

        L.el.setAttribute(
            "filter",
            `drop-shadow(0 0 8px ${c})
             drop-shadow(0 0 16px ${c})
             drop-shadow(0 0 30px ${c})`,
        );

        if (L.time >= L.duration) {
            L.active = false;
            L.el.setAttribute("opacity", 0);
        }
    });

    requestAnimationFrame(animate);
}

animate();
