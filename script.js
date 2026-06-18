const svg = document.documentElement;

const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

circle.setAttribute("r", 50);
circle.setAttribute("cx", 100);
circle.setAttribute("cy", 100);

svg.appendChild(circle);
