let bgLayer,collageBuffer
let cutOutPieces=[]
let overlay
let mousePos=[]
let previous,next
let blonde, haerin, barbie, peach, vs, vogue, chanel
let selector, tap, tapped, cutter,hand,placed,done
let artwork
let p1,p2,p3,p4,p5,p6,p7
let pages=[]
let state=1
let currentX=-1000,currentY=-1000
let putDown=false
let index=0

const ARTWORK_WIDTH = 360;
const ARTWORK_HEIGHT = 480;

const SELECTION_WIDTH = 75;
const SELECTION_HEIGHT = 100;

function preload (){

  previous = loadImage("images/left_arrow.png")
  next = loadImage("images/right_arrow.png")  
  selector = loadImage("images/selector.png")  
  tap = loadImage("images/tap.png")
  tapped = loadImage("images/tapped.png")
  cutter = loadImage("images/cutter.png") 
  hand = loadImage("images/hand.png") 
  placed = loadImage("images/placed.png") 
  done = loadImage("images/done.png") 


  blonde = loadImage("images/blonde.jpeg")
  haerin = loadImage("images/haerin.jpeg")
  barbie = loadImage("images/barbie.jpeg")
  peach = loadImage("images/peach.jpeg")
  vs = loadImage("images/vs.jpeg")
  vogue = loadImage("images/vogue.jpeg")
  chanel = loadImage("images/chanel.jpeg")

  }


function setup() {

  pixelDensity(1)

  bgLayer = createCanvas(1280,620)
  collageBuffer=createGraphics(1280,620)

  bgLayer.style('width', '100%');
  bgLayer.style('height', '100%');
  bgLayer.parent("#canvas")

  noStroke()

  overlay = new Overlay(ARTWORK_WIDTH, ARTWORK_HEIGHT, 0, 0);


  p1=new page(155,haerin)
  p2=new page(305,barbie)
  p3=new page(455,peach)
  p4=new page(605,chanel)
  p5=new page(755,vs)
  p6=new page(905,vogue)
  p7=new page(1055,blonde)
  pages.push(p1,p2,p3,p4,p5,p6,p7)



}

function draw() {

  background(248,246,240)
  image(collageBuffer,0,0)
  noCursor()
  stroke(0)
  noFill()
  rect(600,height-115,85,110)
  noStroke()


  image(previous,30,height-90,50,50)
  image(next,width-80,height-90,50,50)
  //image(selector,617,height-70,50,50)

  // if (state == 0) {
  //   start();
  // }
  // else if (state == 1) {
  //   playing();
  // }

  // else {
  //   end();
  // }


  for(let i = 0; i < pages.length; i++){
    pages[i].display()
    if (pages[i].x==605){
      artwork=pages[i].graphic
    }
  }



  if (cutOutPieces.length!=0){
    cutOutPieces[index-1].display()
  }

  image(artwork,0,0);

  if (mouseX>0 && mouseX<ARTWORK_WIDTH && mouseY>0 && mouseY<ARTWORK_HEIGHT){
    image(cutter,mouseX,mouseY, 30,30)
  }

  else if ((mouseX>30 && mouseX <80 && mouseY>height-90 && mouseY<height-40) ||(mouseX>width-80 && mouseX <width-30 && mouseY>height-90 && mouseY<height-40)){
    if (mouseIsPressed){
      image(tapped,mouseX-15,mouseY, 20,20)
    }
    else{
      image(tap,mouseX-15,mouseY, 20,20)
    }
  }

  else if (mouseY>0){
    if (mouseIsPressed){
      image(placed,mouseX-15,mouseY, 20,20)
    }
    else{
      image(hand,mouseX-15,mouseY, 20,20)
    }
  }


  if (mouseIsPressed && state==1 && mouseX>0 && mouseX<ARTWORK_WIDTH && mouseY>0 && mouseY<ARTWORK_HEIGHT) {
    overlay.addPoint(mouseX, mouseY);
    overlay.display(0, 0);
  }

}




function mousePressed(){  

  //detect if the user is cutting on the page. If yes, add points
  if (state==1 && mouseX>0 && mouseX<ARTWORK_WIDTH && mouseY>0 && mouseY<ARTWORK_HEIGHT){
    // let temp = new dropPoints
    // mousePos.push(temp)
    overlay.startDrawing()
  }

  //press the previous button?
  if( state==1 && mouseX>30 && mouseX<80 && mouseY>(height-90) && mouseY<(height-40)){
    for(let i = 0; i < pages.length; i++){
      pages[i].movePrevious()
    }
  }

  else if(state==1 && mouseX>(width-80) && mouseX<(width-30) && mouseY>(height-90) && mouseY<(height-40)){
    for(let i = 0; i < pages.length; i++){
      pages[i].moveNext()
    }
  }

  else if (state==1 && mouseX>ARTWORK_WIDTH){
    currentX=mouseX
    currentY=mouseY
  }
}


function mouseReleased() {
  // clear the canvas
  clear();
  putDown=false
  if (state==1 && mouseX>30 && mouseX<(30+ARTWORK_WIDTH) && mouseY>30 && mouseY<(30+ARTWORK_HEIGHT)){

  // when the mouse is relased we should stop adding points to our overlay
  overlay.stopDrawing();
  overlay.display(0,0);


  let img = overlay.generateCutoutImage(artwork);
  let paper = overlay.generateCutoutPaper();
  let temp=new piece(img, paper,index)
  cutOutPieces.push(temp)
  index+=1

  // draw the image to the screen
  // let x = random(-10,10)
  // let y = random(-10,10)
  // collageBuffer.image(paper,x,y)
  // collageBuffer.image(img, 0, 0);
}

}

function mouseClicked(){
  if (cutOutPieces.length!=0){
    cutOutPieces[index-1].putDown()
  }

}

function saveCollage(){
  collageBuffer.save('collage.png')
}

function clearCollage(){
  if (cutOutPieces.length!=0){
    cutOutPieces.splice(0,cutOutPieces.length)
  }
  index=0
  collageBuffer.clear()
}


class piece{
  constructor(img, paper,i){
    this.img=img;
    this.paper=paper
    this.x = random(-10,10)
    this.y = random(-10,10)
    this.index=i
  }

  display(){
    if (mouseX>360 && mouseX< width-70 && mouseY>0 && mouseY<height-190){
      image(this.paper,mouseX+this.x,mouseY+this.y)
      image(this.img, mouseX, mouseY);
    }
  }

  putDown(){
    if (mouseX>360 && mouseX<width-70 && mouseY>0 && mouseY<height-190){
    collageBuffer.image(this.paper,mouseX+this.x,mouseY+this.y)
    collageBuffer.image(this.img, mouseX, mouseY);
  }
  }
}

class page{
  constructor(x,graphic){
    this.x=x
    this.originalX=x
    this.graphic=graphic
  }

  display(){
    if (this.x<155){
      this.x= 1055
    }

    if (this.x>1055){
      this.x=155
    }

    image(this.graphic,this.x,height-110,SELECTION_WIDTH,SELECTION_HEIGHT)

  }

  movePrevious(){
    this.x-=150

  }

  moveNext(){
    this.x+=150
  }
}

// overlay class for dealing with cutouts and extractions
class Overlay {

  // store our width & height, along with our x & y position on the screen
  constructor(w,h,x,y) {
    this.x = x;
    this.y = y;

    // create a graphics buffer for ourselves with the correct dimensions
    this.buffer = createGraphics(w,h);

    // store previously drawn points
    this.points = [];

    // control variable keeping track of if we are in drawing mode or not
    this.overlayDrawing = false;
  }

  // add a new point to our array
  addPoint(x,y) {
    if (this.overlayDrawing) {
      this.points.push({x: x, y: y});
    }
  }

  // sets us up for a new drawing
  startDrawing() {
    this.overlayDrawing = true;
    this.points = [];
  }

  // stops drawing
  stopDrawing() {
    this.overlayDrawing = false;
  }

  // draws the current set of points to the screen using a grey cutout color
  display(x,y) {
    this.buffer.clear();

    if (this.points.length == 0) {
      return;
    }

    this.buffer.stroke(131,0,31);
    this.buffer.strokeWeight(3);

    if (this.overlayDrawing == false) {
      this.buffer.fill(128);
      this.buffer.beginShape();
      this.buffer.vertex(this.points[0].x, this.points[0].y);
    }

    for(let i = 1; i < this.points.length; i++) {

      this.buffer.line(this.points[i].x, this.points[i].y, this.points[i-1].x, this.points[i-1].y);
      if (this.overlayDrawing == false) {
        this.buffer.vertex(this.points[i].x, this.points[i].y);
      }
    }

    if (this.overlayDrawing == false) {
      this.buffer.endShape();
    }

    image(this.buffer, this.x, this.y);
  }

  // figures out the top, bottom, left and right most grey pixels
  getBoundingBoxOfCutout() {
    let top = undefined;
    let bottom = undefined;
    let left = undefined;
    let right = undefined;
    this.buffer.loadPixels();

    let location = 0;
    let foundPixels = [];
    for (let x = 0; x < this.buffer.width; x++) {
      for (let y = 0; y < this.buffer.height; y++) {

        // compute array location of this pixel
        location = (x + y*this.buffer.width) * 4;

        if (this.buffer.pixels[location] == 128) {
          foundPixels.push({x: x, y: y});
          if (!top || top > y) {
            top = y;
          }
          if (!bottom || bottom < y) {
            bottom = y;
          }
          if (!left || left > x) {
            left = x;
          }
          if (!right || right < x) {
            right = x;
          }
        }

      }
    }

    return {top: top, bottom: bottom, left: left, right: right, foundPixels: foundPixels};
  }

  // given a source image, uses the current set of points to cut out the image
  generateCutoutImage(sourceImage) {
    // figure out the bounding box of the image we are cutting
    let boxInfo = this.getBoundingBoxOfCutout();

    // compute width and height of our cutout
    let w = boxInfo.right - boxInfo.left;
    let h = boxInfo.bottom - boxInfo.top;

    // create a buffer for this image
    let tempBuffer = createGraphics(w,h);
    tempBuffer.loadPixels();
    sourceImage.loadPixels();

    // copy over found pixels into our temp buffer
    for (let i = 0; i < boxInfo.foundPixels.length; i++) {
      // isolate screen pixel at this location
      let sourceLocationX = boxInfo.foundPixels[i].x;
      let sourceLocationY = boxInfo.foundPixels[i].y;

      // get the color here
      let c = sourceImage.get(sourceLocationX, sourceLocationY);

      // compute buffer location
      let bufferLocationX = boxInfo.foundPixels[i].x - boxInfo.left;
      let bufferLocationY = h - (boxInfo.bottom - boxInfo.foundPixels[i].y);

      tempBuffer.set(bufferLocationX, bufferLocationY, c);
    }

    tempBuffer.updatePixels();

    return tempBuffer;
  }


  generateCutoutPaper() {
    // figure out the bounding box of the image we are cutting
    let boxInfo = this.getBoundingBoxOfCutout();

    // compute width and height of our cutout
    let w = boxInfo.right - boxInfo.left;
    let h = boxInfo.bottom - boxInfo.top;

    // create a buffer for this image
    let paperBuffer = createGraphics(w,h);
    paperBuffer.loadPixels();


    // copy over found pixels into our temp buffer
    for (let i = 0; i < boxInfo.foundPixels.length; i++) {
      // set the paper color
      let c = color(255)

      // compute buffer location
      let bufferLocationX = boxInfo.foundPixels[i].x - boxInfo.left;
      let bufferLocationY = h - (boxInfo.bottom - boxInfo.foundPixels[i].y);

      paperBuffer.set(bufferLocationX, bufferLocationY, c);
    }

    paperBuffer.updatePixels();

    return paperBuffer;
  }


}















