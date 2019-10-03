var w = window.innerWidth, h = window.innerHeight;

var r = 50; //(w < h)?w/3:h/3;
var x_off = 1000,y_off = 1000,z_off = 1000;
var vertices_amount = 120;

var px_offset = 50;    // amplitude, 50
var NOISE_SCALE = 120;  // the higher the softer, originally 80

var Z_SPEED = .01; // noise change per frame

var X_SPEED = .05;
var Y_SPEED = .1;


var MOUSE_FORCE = 5; 
// positive 'push', negative 'pull'

var dom_fps = document.getElementById("fps");
var prevTime;
var color_x,
    color_speed = .8 //-.25

function setup() {
  createCanvas(w, h);
  frameRate(60);
  color_x = random(360);
}

function draw() {
  colorMode(HSB);
  background(255);

  // if (mouseX  || mouseY) {
  //   var mouseVector = createVector(mouseX/w-.5, mouseY/h-.5);
  //   mouseVector.mult(MOUSE_FORCE);
  //   X_SPEED = mouseVector.x;
  //   Y_SPEED = mouseVector.y;
  // }

  X_SPEED = random(-0.5, 0.5);
  Y_SPEED = random(-0.5, 0.5);
  
  // draw shape:
  push();
  translate(w/4, h/4);
  strokeWeight(24);
  stroke(0);
  fill(color_x,255,255);
  
  beginShape();

  var U_SCALE = 25;
  var vertices_gap = 1; //vertices_amount;

  var x_left_end = -5.9 * U_SCALE;
  var x_right_end = 5.9 * U_SCALE;
  var x_right_inner = 2.1 * U_SCALE;
  var x_left_inner = -2.1 * U_SCALE;
  var y_upper_end = -6.5 * U_SCALE;

  // Part 1
  for (var step=0; step < 8*U_SCALE; step += 8*U_SCALE/vertices_gap) {
    var new_x = x_left_end;
    var new_y = y_upper_end + step;
    vertex(new_x, new_y);
  }

  // Part 2
  var r = 6 * U_SCALE;

  for (var a=PI*1.5; a<PI*2.5;a+=PI/vertices_amount) {
    var x = r*sin(a);
    var y = 8*U_SCALE + r*cos(a);
    
    var new_x = x + ( noise(((x_off+x)/NOISE_SCALE), ((y_off+y)/NOISE_SCALE), z_off)
                      * px_offset
                      * sin(a) );
    
    var new_y = y + ( noise(((x_off+x)/NOISE_SCALE), ((y_off+y)/NOISE_SCALE), z_off)
                      * px_offset
                      * cos(a));
    vertex(new_x,new_y);
  }

  // Part 3
  for (var step=0; step < 8*U_SCALE; step += 8*U_SCALE/vertices_gap) {
    var new_x = x_right_end;
    var new_y = y_upper_end + 8*U_SCALE - step;
    vertex(new_x, new_y);
  }

  // Part 4
  for (var step=0; step < 3.8*U_SCALE; step+=3.8*U_SCALE/vertices_gap) {
    var new_x = x_right_end - step;
    var new_y = y_upper_end;
    vertex(new_x, new_y);
  }

  // Part 5
  for (var step=0; step < 8*U_SCALE; step += 8*U_SCALE/vertices_gap) {
    var new_x = x_right_inner;
    var new_y = y_upper_end + step;
    vertex(new_x, new_y);
  }

  // Part 6
  r = 2 * U_SCALE
  for (var a=PI*2.5; a > PI*1.5; a -= PI/vertices_amount) {
    var x = r*sin(a);
    var y = 8*U_SCALE + r*cos(a);
    
    var new_x = x + ( noise(((x_off+x)/NOISE_SCALE), ((y_off+y)/NOISE_SCALE), z_off)
                      * px_offset
                      * sin(a) );
    
    var new_y = y + ( noise(((x_off+x)/NOISE_SCALE), ((y_off+y)/NOISE_SCALE), z_off)
                      * px_offset
                      * cos(a));
    vertex(new_x,new_y);
  }

  // Part 7
  for (var step=0; step < 8*U_SCALE; step += 8*U_SCALE/vertices_gap) {
    var new_x = x_left_inner;
    var new_y = y_upper_end + 8*U_SCALE - step;
    vertex(new_x, new_y);
  }

  // Part 8
  for (var step=0; step < 3.8*U_SCALE; step += 3.8*U_SCALE/vertices_gap) {
    var new_x = x_left_inner - step;
    var new_y = y_upper_end;
    vertex(new_x, new_y);
  }

  vertex(x_left_end, y_upper_end);

  endShape();
  
  pop();
  
  
  // update NOISE offsets
  z_off += Z_SPEED;
  x_off += X_SPEED;
  y_off += Y_SPEED;
  if(color_x > 255 || color_x < 0) {
    color_speed *= -1;
  }
  color_x += color_speed;

  // FPS counter for debugging
  //if (typeof prevTime !== "undefined") {
  //  var now = Date.now();
  //  dom_fps.innerHTML = (Math.round(1000/(now-prevTime)));
  //}
  //prevTime = Date.now();
}