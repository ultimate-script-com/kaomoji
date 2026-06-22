const svg = document.querySelector("svg");

// ====================================
// 設定
// ====================================

const SPEED = 1;
const AMP = 60;

// ====================================
// 顔文字
// ====================================

const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

text.textContent = "Σ(ﾟДﾟ；≡；ﾟдﾟ)";
text.setAttribute("x", 256);
text.setAttribute("y", 50);
text.setAttribute("text-anchor", "middle");
text.setAttribute("font-size", "32");

svg.appendChild(text);

// ====================================
// 単位円
// ====================================

const cx = 256;
const cy = 220;
const r = 100;

const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

circle.setAttribute("cx", cx);
circle.setAttribute("cy", cy);
circle.setAttribute("r", r);
circle.setAttribute("fill", "none");
circle.setAttribute("stroke", "black");

svg.appendChild(circle);

// 円周上を動く点
const circlePoint = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "circle",
);

circlePoint.setAttribute("r", "5");
circlePoint.setAttribute("fill", "red");

svg.appendChild(circlePoint);

// 半径
const radius = document.createElementNS("http://www.w3.org/2000/svg", "line");

radius.setAttribute("stroke", "red");
radius.setAttribute("stroke-width", "2");

svg.appendChild(radius);

// 円の中心
const centerPoint = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "circle",
);

centerPoint.setAttribute("cx", cx);
centerPoint.setAttribute("cy", cy);
centerPoint.setAttribute("r", "3");
centerPoint.setAttribute("fill", "black");

svg.appendChild(centerPoint);

// ====================================
// sinグラフの座標系
// ====================================

const graphX = 20;
const graphY = 432;
const graphWidth = 472;

// x軸
const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");

xAxis.setAttribute("x1", graphX);
xAxis.setAttribute("y1", graphY);
xAxis.setAttribute("x2", graphX + graphWidth);
xAxis.setAttribute("y2", graphY);
xAxis.setAttribute("stroke", "blue");

svg.appendChild(xAxis);

// y=1、0、-1 の補助線
[graphY - AMP, graphY, graphY + AMP].forEach((y) => {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

  line.setAttribute("x1", graphX);
  line.setAttribute("x2", graphX + graphWidth);
  line.setAttribute("y1", y);
  line.setAttribute("y2", y);
  line.setAttribute("stroke", "#cccccc");

  if (y === graphY) {
    line.setAttribute("stroke-dasharray", "5");
  }

  svg.appendChild(line);
});

// ====================================
// y軸ラベル
// ====================================

[
  { y: graphY - AMP, txt: "1" },
  { y: graphY, txt: "0" },
  { y: graphY + AMP, txt: "-1" },
].forEach((v) => {
  const t = document.createElementNS("http://www.w3.org/2000/svg", "text");

  t.textContent = v.txt;
  t.setAttribute("x", 5);
  t.setAttribute("y", v.y + 7);
  t.setAttribute("font-size", "22");

  svg.appendChild(t);
});

// ====================================
// πの目盛り
// ====================================

const labels = ["", "π/2", "π", "3π/2", "2π", "5π/2", "3π"];

labels.forEach((txt, i) => {
  const x = graphX + i * 78;

  if (i === 0) return;

  const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");

  tick.setAttribute("x1", x);
  tick.setAttribute("x2", x);
  tick.setAttribute("y1", graphY - AMP - 5);
  tick.setAttribute("y2", graphY + AMP + 5);
  tick.setAttribute("stroke", "#dddddd");

  svg.appendChild(tick);

  const t = document.createElementNS("http://www.w3.org/2000/svg", "text");

  t.textContent = txt;
  t.setAttribute("x", x - 20);
  t.setAttribute("y", graphY - AMP - 18);
  t.setAttribute("font-size", "22");
  t.setAttribute("fill", "green");

  svg.appendChild(t);
});

// ====================================
// グラフタイトル
// ====================================

const title = document.createElementNS("http://www.w3.org/2000/svg", "text");

title.textContent = "y = sin(x)";
title.setAttribute("x", 360);
title.setAttribute("y", 320);
title.setAttribute("font-size", "32");
title.setAttribute("font-weight", "bold");

svg.appendChild(title);

// ====================================
// sin波
// ====================================

const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

path.setAttribute("fill", "none");
path.setAttribute("stroke", "gray");
path.setAttribute("stroke-width", "2");

svg.appendChild(path);

// グラフ上の点
const point = document.createElementNS("http://www.w3.org/2000/svg", "circle");

point.setAttribute("r", "5");
point.setAttribute("fill", "red");

svg.appendChild(point);

// 円とグラフを結ぶ補助線
const guide = document.createElementNS("http://www.w3.org/2000/svg", "line");

guide.setAttribute("stroke", "gray");
guide.setAttribute("stroke-dasharray", "5");

svg.appendChild(guide);

// ====================================
// sin波を3周期描画
// ====================================

let d = "";

for (let i = 0; i <= 1080; i++) {
  const x = graphX + i * 0.45;

  const y = graphY - Math.sin(((i * Math.PI) / 180) * SPEED) * AMP;

  if (i === 0) {
    d += `M ${x} ${y}`;
  } else {
    d += ` L ${x} ${y}`;
  }
}

path.setAttribute("d", d);

// ====================================
// アニメーション
// ====================================

let t = 0;

function animate() {
  t += 0.03;

  const s = t * SPEED;

  // 顔文字
  const faceX = 256 + Math.sin(s) * 120;

  text.setAttribute("x", faceX);

  // 円運動
  const px = cx + Math.cos(s) * r;

  const py = cy - Math.sin(s) * r;

  circlePoint.setAttribute("cx", px);
  circlePoint.setAttribute("cy", py);

  radius.setAttribute("x1", cx);
  radius.setAttribute("y1", cy);
  radius.setAttribute("x2", px);
  radius.setAttribute("y2", py);

  // グラフ上の点
  const deg = ((s * 180) / Math.PI) % 1080;

  const gx = graphX + deg * 0.45;

  const gy = graphY - Math.sin(s) * AMP;

  point.setAttribute("cx", gx);
  point.setAttribute("cy", gy);

  // 円とsin波を結ぶ補助線
  guide.setAttribute("x1", px);
  guide.setAttribute("y1", py);
  guide.setAttribute("x2", gx);
  guide.setAttribute("y2", gy);

  requestAnimationFrame(animate);
}

animate();
