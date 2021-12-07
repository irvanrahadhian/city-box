let is_color

let colors_full = [
    'rgba(208, 210, 196, 1)',
    'rgba(84,  176, 189, 1)',
    'rgba(7,   111, 138, 1)',
    'rgba(214,  57,  50, 1)',
    'rgba(3,    142,  147, 1)'
  ];

let colors_bw = [
    'rgba(0, 0, 0, 0.1)',
    'rgba(0, 0, 0, 0.15)',
    'rgba(0, 0, 0, 0.2)',
    'rgba(0, 0, 0, 0.25)',
    'rgba(0, 0, 0, 0.3)'
];

if (fxrand() > 0.25){
    colors = colors_full
    is_color = true
}else {
    colors = colors_bw
    is_color = false
}

let buildings = [];
let N_building = parseInt(fxrand() * 165);

if (N_building < 50){
    N_building += 30; 
}

var w = window.innerWidth /// 2;
var h = window.innerHeight /// 1.2;  

var cnv;

function setup() {
    // createCanvas(windowWidth, windowHeight);
    cnv = createCanvas(w, h);
    for (let i = 0; i < N_building; i++) {
        let c = new Growth();
        buildings.push(c);
    }
    // background(20);
    background(255);
    // noFill();
    strokeWeight(1);
    stroke('rgba(255, 255, 255, .1)');
    rectMode(CENTER);
    // saveFrames('a/iso', 'png', 2, 30);
}

function draw() {
    buildings.forEach(function(c) {
        c.update();
        if (c.life > 0) c.render();
        
        // }else{
        //     // noLoop();
        //     console.log("comment out no loop")
        // }
    });
}

function windowResized() {
    // resizeCanvas(windowWidth, windowHeight);
    buildings = [];
    setup();
    centerCanvas();
}

function Growth() {
    this.x = fxrand() * width;
    this.y = fxrand() * height;
    this.proportion = fxrand() * 10;
    this.vx = 0;
    this.vy = random(-.2, -.6);
    this.w = fxrand() * 20 + 20 // random(5, 50);
    this.h = fxrand() * 30 + 30// random(10, 50);
    this.life = fxrand() * 500
    // this.stroke = colors[floor(random(colors.length))];
    this.stroke = colors[Math.floor(fxrand()*colors.length)];

    this.update = function() {
        this.x += this.vx;
        this.y += this.vy;
        // this.proportion += random(-0.05, 0.05);
        this.proportion = constrain(this.proportion, 0.25, 1);
        this.life--;
    }
    this.render = function() {
        stroke(this.stroke);
        push();
        translate(this.x, this.y);

        scale(this.proportion);
        rotate(-PI / 6);
        scale(1, .86062); // scale vertical 86.062%
        shearX(PI / 6); // skew 30 degrees


        rect(0, 0, this.w, this.h);
        pop();
    }
}

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
}

window.$fxhashFeatures = {
    "Colors Buildings": is_color,
    "Building count": N_building
}