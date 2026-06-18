document.addEventListener("DOMContentLoaded", () => {
  const svg = document.getElementById("svg");

  let S = Math.min(window.innerWidth, window.innerHeight);

  svg.setAttribute("viewBox", `0 0 ${S} ${S}`);
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  svg.style.display = "block";

  const NS = "http://www.w3.org/2000/svg";

  // 背景
  const bg = document.createElementNS(NS, "rect");
  bg.setAttribute("width", S);
  bg.setAttribute("height", S);
  bg.setAttribute("fill", "#0f172a");
  svg.appendChild(bg);

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
    const pos = generatePositions();

    for (let i = 0; i < faces.length; i++) {
      const text = document.createElementNS(NS, "text");

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
        x: pos[i][0],
        y: pos[i][1],
        phase: Math.random() * Math.PI * 2,
        gPhase: Math.random() * Math.PI * 2,
      });
    }
  }

  let t = 0;

  function animate() {
    t += 0.012;

    for (const obj of objects) {
      let x = obj.x;
      let y = obj.y;

      // 微揺れ
      x += Math.sin(t * 10 + obj.gPhase) * 0.2;
      y += Math.cos(t * 12 + obj.gPhase) * 0.2;

      if (obj.face === "(´・ω・｀)") {
        x += Math.sin(t * 1.2 + obj.phase) * (S * 0.05);
        y += Math.cos(t * 1.0 + obj.phase) * (S * 0.04);
      } else if (obj.face === "(ﾟ∀ﾟ)") {
        x += Math.sin(t * 3 + obj.phase) * (S * 0.1);
        y += Math.sin(t * 9 + obj.phase) * (S * 0.12);
      } else {
        x += Math.sin(t * 50 + obj.phase) * 3;
        y += Math.cos(t * 100 + obj.phase) * 3;

        x += (Math.random() - 0.5) * 4;
        y += (Math.random() - 0.5) * 4;
      }

      obj.el.setAttribute("transform", `translate(${x},${y})`);
    }

    requestAnimationFrame(animate);
  }

  createObjects();
  animate();
});
