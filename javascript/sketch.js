var w = window.innerWidth, h = window.innerHeight*1.1;
var cnv;

var r = 50; //(w < h)?w/3:h/3;
var x_off = 1000,y_off = 1000,z_off = 1000;
var vertices_amount = 120;

var px_offset = 20;    // amplitude, 50
var NOISE_SCALE = 120;  // the higher the softer, originally 80
var U_SCALE = h/30; //w/40; //h/15;

var Z_SPEED = .01; // noise change per frame

var X_SPEED = .05;
var Y_SPEED = .1;

var prevTime;
var color_x,
    color_speed = .8 //-.25

var MOUSE_FORCE = 5; // positive 'push', negative 'pull'

// scales and constants
let U1_OFFSET_X = w*1/3-U_SCALE*2;
let U1_OFFSET_Y = h*0.6; //h/2.2;
let U2_OFFSET_X = w*2/3+U_SCALE*2;
let U2_OFFSET_Y = h*0.6;//h/2.2;

// u-net settings
var u1, u2;
var myColor = '#eeee00';

var hue_palette = [60, 0, 120, 240, 300, 360];
// var operations = ['preserve original', 'add', 'multiply', 'substitute (all)', 'substitute (width vector)', 'substitute (height vector)'];
// var operations_skpcn = ['preserve', 'cut off', 'add', 'multiply'];
var operations = ['원본대로', '더하기', '곱하기', '전체화면에서 빼기'];
var operations_skpcn = ['원본대로', '자르기', '더하기', '곱하기'];
var background_params = {
  red_channel: 200,
  green_channel: 200,
  blue_channel: 0
};

// background & controllers
var background_color = myColor;
var background_color_string = background_color.toString();
var controllers= [];
var controller_options = [];
var controller_panes;
var tick = 0;
var turn_num = 0;

// button
var button_w = 6*U_SCALE;
var button_h = 2*U_SCALE;
let button_x_left_end = w/2 - button_w/2;
let button_y_upper_end = h-button_h-U_SCALE;

function setup() {
  frameRate(40);

  cnv = createCanvas(w, h);
  cnv.mouseClicked(canvasClicked);

  // set canvas as a child of '#main' div
  let cnv_element = document.getElementsByTagName('canvas')[0];
  let main_div = document.getElementById('main_div');
  main_div.appendChild(cnv_element);

  // create U-net
  sliderRange(0, 100, 1);
  u1 = new Unet(U_SCALE, 20, px_offset, 0);
  u2 = new Unet(U_SCALE, 20, px_offset, 1);

  strokeJoin(ROUND);

  // background controller
  let controller_labeltexts = ["빨간색", "초록색", "파란색"];
  document.body.style.backgroundColor = myColor;
  sliderRange(0, 200, 1);
  background_controller = createGui('비디오의 필터 색깔을 정해주세요');
  background_controller.addObject(background_params, controller_labeltexts);
  background_controller.on = false;
  controllers.push(background_controller);

  // bind onclick events
  controller_panes = Array.from(document.getElementsByClassName('qs_main'));
  controller_panes[8].onchange = setBackgroundValue; // background controller
  setBackgroundValue();
  for (let i = 0; i < controller_panes.length-1; i++) {
    // controller_panes[i].onchange = "setChangeValue("+i+")";
    controller_panes[i].addEventListener('change', function(){
      setChangeValue(this);
    });
    setChangeValue(controller_panes[i]);
  }

  // hide all controllers
  for (let i=0; i<controllers.length; i++) {
    controllers[i].hide();
  }
}

function draw() {
  colorMode(HSB);
  background(color(background_color_string));

  // if (mouseX  || mouseY) {
  //   // var mouseVector = createVector(mouseX/w-.5, mouseY/h-.5);
  //   // mouseVector.mult(MOUSE_FORCE);
  //   X_SPEED = mouseVector.x;
  //   Y_SPEED = mouseVector.y;
  // }

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

  // // button
  // buttonDisplay();
  
  // update NOISE offsets
  z_off += Z_SPEED;
  x_off += X_SPEED;
  y_off += Y_SPEED;
  if(color_x > 255 || color_x < 0) {
    color_speed *= -1;
  }
  color_x += color_speed;

  // check hovered
  unetHovered();
}

function canvasClicked() {
  for (let i=0; i<controllers.length; i++) {
    controllers[i].hide();
  }

  // Check clicked
  if (u1.clicked(mouseX-U1_OFFSET_X, mouseY-U1_OFFSET_Y)
    || u2.clicked(mouseX-U2_OFFSET_X, mouseY-U2_OFFSET_Y)) {
    return;
  } else {
    // Change background color by background controller
    if(background_controller.on===false) {
      // TODO: adjust controller positions
      // Just hard coded the positions for the sake of time.
      background_controller.setPosition(mouseX+0.2*U_SCALE, mouseY-U_SCALE*4.3);
      background_controller.show();
      background_controller.on = true;
    } else {
      background_controller.on = false;
    }
  }
}

function unetHovered() {
  u1.hovered(mouseX-U1_OFFSET_X, mouseY-U1_OFFSET_Y);
  u2.hovered(mouseX-U2_OFFSET_X, mouseY-U2_OFFSET_Y);  
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
