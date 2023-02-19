let pi;
let index = 0;
let digits;
let colors;
let density = 10000;

function preload() {
  loadStrings("./pi-10million.txt", piLoaded);
}

function piLoaded(result) {
  pi = result[0];
}

function setup() {
  createCanvas(900, 900);
  colors = ["#FF4C4C", "#FFA24C", "#FFFF4C", "#A5FF4C", "#4CFF4C", "#4CFFA2", "#4CFFFF", "#4CA5FF", "#4C4CFF", "#A24CFF"];
  digits = int(pi.split(""));
  background(0);
  stroke(255);
  fill(255);

  translate(width / 2, height / 2);
  textAlign(CENTER, CENTER);
  textSize(69);
  text("π", 0, 0);
  noFill();
  for (let j = 0; j < 30; j++) {
    for (let i = 0; i < 10; i++) {
      let aoffset = PI / 6;
      stroke(colors[i]);
      strokeWeight(1);
      let a = (PI / 5) * i;
      arc(0, 0, (width - 70+j), (height - 70+j), a, a+aoffset);
    }
  }

  strokeWeight(1);
  for (let i = 0; i < 10; i++) {
    textSize(18);
    let aoffset = PI / 12;
    let a = map(i, 0, 10, 0, TWO_PI) + aoffset;

    let x1 = (width / 2 - 10) * cos(a);
    let y1 = (height / 2 - 10) * sin(a);

    noStroke();
    fill(colors[i])
    text(i, x1, y1);
  }
  noFill();
}

function draw() {
  translate(width / 2, height / 2);
  let digit = digits[index];
  let nextdigit = digits[index + 1];
  index++;

  let aoffset = (PI / (density * 6)) * index;
  let a1 = map(digit, 0, 10, 0, TWO_PI) + aoffset;
  let a2 = map(nextdigit, 0, 10, 0, TWO_PI) + aoffset;

  let x1 = (width / 2 - 50) * cos(a1);
  let y1 = (height / 2 - 50) * sin(a1);

  let x2 = (width / 2 - 50) * cos(a2);
  let y2 = (height / 2 - 50) * sin(a2);

  stroke(colors[digit]);
  strokeWeight(0.1)

  if (abs(digit - nextdigit) == 5) {
    let a3 = (a1 + a2) / 2;
    let x3 = cos(a3) * (digit - nextdigit) * 25;
    let y3 = sin(a3) * (digit - nextdigit) * 25;
    beginShape();
    vertex(x1, y1);
    quadraticVertex(x3, y3, x2, y2);
    endShape();
  } else if (digit == nextdigit) {
    line(x1, y1, x2, y2);
  } else {
    beginShape();
    vertex(x1, y1);
    quadraticVertex(0, 0, x2, y2);
    endShape();
  }

  if (index > density) {
    noLoop();
    console.log("done");
    saveCanvas("piVisualization", "png");
  }
}