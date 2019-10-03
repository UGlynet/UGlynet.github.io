var w = window.innerWidth*0.95, h = window.innerHeight*0.9;
var cnv;

var r = 50; //(w < h)?w/3:h/3;
var x_off = 1000,y_off = 1000,z_off = 1000;
var vertices_amount = 120;

var px_offset = 20;    // amplitude, 50
var NOISE_SCALE = 120;  // the higher the softer, originally 80
var U_SCALE = w/35; //h/15;

var Z_SPEED = .01; // noise change per frame

var X_SPEED = .05;
var Y_SPEED = .1;

var prevTime;
var color_x,
    color_speed = .8 //-.25

var MOUSE_FORCE = 5; // positive 'push', negative 'pull'

// scales and constants
let U1_OFFSET_X = w*1/3-U_SCALE*2;
let U1_OFFSET_Y = h/2.2;
let U2_OFFSET_X = w*2/3+U_SCALE*2;
let U2_OFFSET_Y = h/2.2;

// u-net settings
var u1, u2;
var myColor = '#eeee00';

var hue_palette = [60, 0, 120, 240, 300, 360];
var operations = ['preserve original', 'add', 'multiply', 'substitute (all)', 'substitute (width vector)', 'substitute (height vector)'];
var operations_skpcn = ['preserve', 'cut off', 'add', 'multiply'];
var background_params = {
  red_channel: 100,
  blue_channel: 100,
  green_channel: 100
};

var background_color = myColor;
var background_color_string = background_color.toString();
var controllers = [];
var tick = 0;
var turn_num = 0;

function setup() {
  cnv = createCanvas(w, h);
  cnv.mouseClicked(canvasClicked);

  // set canvas as a child of '#main' div
  let cnv_element = document.getElementsByTagName('canvas')[0];
  let main_div = document.getElementById('main_div');
  main_div.appendChild(cnv_element);


  // background
  document.body.style.backgroundColor = myColor;
  sliderRange(0, 200, 1);
  background_controller = createGui('Multipliers for RGB channels');
  background_controller.addObject(background_params);
  background_controller.on = false;
  controllers.push(background_controller);

  var bgcontroller = document.getElementsByClassName('qs_main')[0];
  bgcontroller.onchange = setBackgroundColor;


  // create U-net
  sliderRange(0, 100, 1);
  u1 = new Unet(U_SCALE, 20, px_offset, 0);
  u2 = new Unet(U_SCALE, 20, px_offset, 1);

  // hide all controllers
  for (let i=0; i<controllers.length; i++) {
    controllers[i].hide();
  }

  strokeJoin(ROUND);
}

function draw() {
  colorMode(HSB);
  background(color(background_color_string));

  if (mouseX  || mouseY) {
    var mouseVector = createVector(mouseX/w-.5, mouseY/h-.5);
    mouseVector.mult(MOUSE_FORCE);
    X_SPEED = mouseVector.x;
    Y_SPEED = mouseVector.y;
  }

  X_SPEED = random(-0.5, 0.5);
  Y_SPEED = random(-0.5, 0.5);

  // the line between 2 u-nets
  noFill();

  stroke(0);
  strokeWeight(8);
  arc((U1_OFFSET_X+U2_OFFSET_X)/2, (U1_OFFSET_Y+U2_OFFSET_Y)/2-4.4*U_SCALE,
        5*U_SCALE, 5*U_SCALE, -PI, PI);

  // brightness animation
  tick++;
  if(tick >= 50) {
    turn_num++;
    turn_num = turn_num > 20 ? 0 : turn_num;
    tick = 0;
  }

  // first u
  push();
  translate(U1_OFFSET_X, U1_OFFSET_Y);
  u1.display();
  pop();
  
  // second u
  push();
  translate(U2_OFFSET_X, U2_OFFSET_Y);
  u2.display();
  pop();

  // button
  buttonDisplay();
  
  // update NOISE offsets
  z_off += Z_SPEED;
  x_off += X_SPEED;
  y_off += Y_SPEED;
  if(color_x > 255 || color_x < 0) {
    color_speed *= -1;
  }
  color_x += color_speed;
}

function mouseClicked() {
  // background_color = color(30*random(8), 80*random(2), 80*random(2));
  // background_color = color('hsb(' + 30 * random(8) + "," + 100 * random(1) + "%," + 50 + "%)");
  // background_color_string = background_color.toString();

  // document.body.style.backgroundColor = background_color_string;
}

function canvasClicked() {
  for (let i=0; i<controllers.length; i++) {
    controllers[i].hide();
  }

  if (u1.clicked(mouseX-U1_OFFSET_X, mouseY-U1_OFFSET_Y)
    || u2.clicked(mouseX-U2_OFFSET_X, mouseY-U2_OFFSET_Y)) {
    return;
  } else {
    if(background_controller.on==false) {
      background_controller.setPosition(mouseX, mouseY);
      background_controller.show();
      background_controller.on = true;
    } else {
      background_controller.on = false;
    }
  }
}

function checkHover() {
  u1.hover(mouseX-U1_OFFSET_X, mouseY-U1_OFFSET_Y);
  u2.hover(mouseX-U2_OFFSET_X, mouseY-U2_OFFSET_Y);  
}

function toHsbString(h, s, b) {
  return 'hsb(' + h + ',' + s + '%,' + b + '%)';
}

function toRgbString(r, g, b) {
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}




function multiplierToRgb(multiplier) {
  return Math.floor(multiplier / 200 * 255);
}

function setBackgroundColor() {
  var params = [background_params.red_channel,
                background_params.green_channel,
                background_params.blue_channel];
  var rgbs = params.map(multiplierToRgb);

  background_color_string = toRgbString(rgbs[0], rgbs[1], rgbs[2]);
  document.body.style.backgroundColor = background_color_string;
};

// button helpers
function buttonDisplay() {
  var button_w = 6*U_SCALE;
  var button_h = 2*U_SCALE;
  let x_left_end = w/2 - button_w/2;
  let y_upper_end = h-button_h-U_SCALE;

  strokeWeight(6);
  fill('blue');
  rect(x_left_end, y_upper_end, button_w, button_h);

  noStroke();
  textAlign(CENTER);
  textStyle(ITALIC);
  fill('white');
  textSize(24);
  text("make video", w/2, y_upper_end+button_h/2+9);
}