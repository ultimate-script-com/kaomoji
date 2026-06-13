const svg = document.getElementById("svg");

// =====================================
// サイズ
// =====================================

let S = Math.min(window.innerWidth, window.innerHeight);

svg.setAttribute("viewBox", `0 0 ${S} ${S}`);
svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

svg.style.width = "100vw";
svg.style.height = "100vh";
svg.style.display = "block";

// =====================================
// 背景（標準ダークテーマ単色）
// =====================================
// 参考：GitHub Dark (#0d1117), Material Dark (#121212), Slate (#0f172a)
// → 中間のUI汎用ダーク

const bgColor = "#0f172a"; // ★汎用ダークテーマ（slate系・UI定番）

const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
bg.setAttribute("width", S);
bg.setAttribute("height", S);
bg.setAttribute("fill", bgColor);
svg.appendChild(bg);

// =====================================
// 顔文字
// =====================================

const faces = ["(´・ω・｀)", "(ﾟ∀ﾟ)", "(；ﾟДﾟ)"];
const objects = [];

function generatePositions() {
  return [
    [S * 0.3, S * 0.25],
    [S * 0.7, S * 0.4],
    [S * 0.5, S * 0.7],
  ];
}

function createObjects() {
  for (let i = 0; i < 3; i++) {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

    const face = faces[i];
    text.textContent = face;

    const size = S * 0.07;

    text.setAttribute("font-size", size);
    text.setAttribute("font-family", "monospace");
    text.setAttribute("text-anchor", "middle");

    const color =
      face === "(´・ω・｀)"
        ? "#7dd3ff"
        : face === "(ﾟ∀ﾟ)"
          ? "#ffd166"
          : "#ff6b6b";

    text.setAttribute("fill", color);

    svg.appendChild(text);

    objects.push({
      el: text,
      face,
      phase: Math.random() * Math.PI * 2,
      baseX: 0,
      baseY: 0,
      glitch: 0,
      gPhase: Math.random() * Math.PI * 2,
    });
  }

  updatePositions();
}

function updatePositions() {
  const pos = generatePositions();

  for (let i = 0; i < objects.length; i++) {
    objects[i].baseX = pos[i][0];
    objects[i].baseY = pos[i][1];
  }
}

// =====================================
// グリッチ（控えめ）
// =====================================

function triggerGlitch(obj) {
  obj.glitch = 0.25;
}

setInterval(() => {
  const obj = objects[Math.floor(Math.random() * objects.length)];
  if (obj) triggerGlitch(obj);
}, 1500);

// =====================================
// アニメーション
// =====================================

let t = 0;

function animate() {
  t += 0.012;

  for (const obj of objects) {
    let x = obj.baseX;
    let y = obj.baseY;

    let rot = 0;
    let scale = 1;

    // 微弱ノイズ（最小限）
    x += Math.sin(t * 10 + obj.gPhase) * 0.2;
    y += Math.cos(t * 12 + obj.gPhase) * 0.2;

    if (obj.face === "(´・ω・｀)") {
      x += Math.sin(t * 1.2 + obj.phase) * (S * 0.05);
      y += Math.cos(t * 1.0 + obj.phase) * (S * 0.04);
    } else if (obj.face === "(ﾟ∀ﾟ)") {
      x += Math.sin(t * 3.5 + obj.phase) * (S * 0.1);
      y += Math.sin(t * 5 + obj.phase) * (S * 0.08);
      rot = Math.sin(t * 6) * 20;
      scale = 1.2 + Math.sin(t * 4) * 0.15;
    } else {
      x += Math.sin(t * 2.5 + obj.phase) * (S * 0.05);
      y += Math.cos(t * 3.5 + obj.phase) * (S * 0.04);

      x += (Math.random() - 0.5) * 5;
      y += (Math.random() - 0.5) * 5;
    }

    // グリッチ（弱）
    if (obj.glitch > 0) {
      const g = obj.glitch;

      x += (Math.random() - 0.5) * 4 * g;
      y += (Math.random() - 0.5) * 4 * g;
      rot += (Math.random() - 0.5) * 6 * g;
      scale += (Math.random() - 0.5) * 0.05 * g;

      obj.glitch *= 0.9;
      if (obj.glitch < 0.01) obj.glitch = 0;
    }

    obj.el.setAttribute(
      "transform",
      `translate(${x},${y}) rotate(${rot}) scale(${scale})`,
    );
  }

  requestAnimationFrame(animate);
}

// =====================================
// start
// =====================================

createObjects();
animate();
