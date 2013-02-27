const SCREEN_WIDTH = 500;
const SCREEN_HEIGHT = 200;

var canvas = document.getElementById("clockCanvas");
var ctx = canvas.getContext("2d");


var clock_started = false;
var secs = 0;
var img = new Image();
img.src = "digitalNumbers.png";
var bgImg = new Image();
bgImg.src = "clock.png"


canvas.setAttribute('tabindex','0');


var image_locations = {
  "1": {"sx": 17, "sy": 9, "swidth":32, "sheight":45},
  "2": {"sx": 86, "sy": 10, "swidth":31, "sheight":46},
  "3": {"sx": 182, "sy": 7, "swidth":30, "sheight":46},
  "4": {"sx": 281, "sy": 6, "swidth":28, "sheight":45},
  "5": {"sx": 372, "sy": 8, "swidth":31, "sheight":46},
  "6": {"sx": 465, "sy": 12, "swidth":30, "sheight":46},
  "7": {"sx": 562, "sy": 9, "swidth":27, "sheight":44},
  "8": {"sx": 655, "sy": 13, "swidth":31, "sheight":46},
  "9": {"sx": 746, "sy": 6, "swidth":30, "sheight":46},
  "0": {"sx": 915, "sy": 7, "swidth":31, "sheight":46},
  "sep": {"sx": 842, "sy": 15, "swidth":7, "sheight":39}
}

img.onload = function(){
  firstDraw();
}

function firstDraw(){
  ctx.drawImage(bgImg, 0, 0);
  //HH
  ctx.drawImage(img, image_locations[getHourTens()].sx, image_locations[getHourTens()].sy, image_locations[getHourTens()].swidth, 
                image_locations[getHourTens()].sheight, 0+75, 75, image_locations[getHourTens()].swidth, image_locations[getHourTens()].sheight);
  ctx.drawImage(img, image_locations[getHourOnes()].sx, image_locations[getHourOnes()].sy, image_locations[getHourOnes()].swidth, 
                image_locations[getHourOnes()].sheight, 35+75, 75, image_locations[getHourOnes()].swidth, image_locations[getHourOnes()].sheight);
  //:
  ctx.drawImage(img, image_locations["sep"].sx, image_locations["sep"].sy, image_locations["sep"].swidth, image_locations["sep"].sheight, 
                     75+75, 85, image_locations["sep"].swidth, image_locations["sep"].sheight /1.5);
  //MM
  ctx.drawImage(img, image_locations[getMinTens()].sx, image_locations[getMinTens()].sy, image_locations[getMinTens()].swidth, 
                image_locations[getMinTens()].sheight, 89+75, 75, image_locations[getMinTens()].swidth, image_locations[getMinTens()].sheight);
  ctx.drawImage(img, image_locations[getMinOnes()].sx, image_locations[getMinOnes()].sy, image_locations[getMinOnes()].swidth, 
                image_locations[getMinOnes()].sheight, 124+75, 75, image_locations[getMinOnes()].swidth, image_locations[getMinOnes()].sheight);
  //:
  ctx.drawImage(img, image_locations["sep"].sx, image_locations["sep"].sy, image_locations["sep"].swidth, image_locations["sep"].sheight, 
                     164+75, 80, image_locations["sep"].swidth, (image_locations["sep"].sheight /1.5) / 2 );
  //SS
  ctx.drawImage(img, image_locations[getSecTens()].sx, image_locations[getSecTens()].sy, image_locations[getSecTens()].swidth, 
                image_locations[getSecTens()].sheight, 178+75, 75, image_locations[getSecTens()].swidth/2, image_locations[getSecTens()].sheight/2);
  ctx.drawImage(img, image_locations[getSecOnes()].sx, image_locations[getSecOnes()].sy, image_locations[getSecOnes()].swidth, 
                image_locations[getSecOnes()].sheight, 195+75, 75, image_locations[getSecOnes()].swidth/2, image_locations[getSecOnes()].sheight/2);
}

function startClock(){
	secs = 0;
	clock_started = true;
  firstDraw();
}

function stopClock(){
	clock_started = false;
	return secs;

}

function getSecOnes() {
  return secs % 10;
}

function getSecTens() {
  return ((secs % 60) - getSecOnes()) / 10;
}

function getMinOnes() {
  return ((secs - (secs % 60)) / 60) % 10;
}

function getMinTens() {
  return ((((secs - (secs % 60)) / 60) - getMinOnes()) / 10) % 6;
}

function getHourOnes() {
  return ((secs - (secs % 3600)) / 3600) % 10;
}

function getHourTens() {
  return ((((secs - (secs % 3600)) / 3600) - getHourOnes()) / 10) % 10;
}

function display() {
  console.log("Seconds :" + secs);
  console.log("HH:MM:SS");
  console.log("" + getHourTens() + getHourOnes() + ":" + getMinTens() + getMinOnes() + ":" + getSecTens() + getSecOnes());
}


function drawClock() {
  ctx.drawImage(bgImg, 0, 0);
  //HH
  ctx.drawImage(img, image_locations[getHourTens()].sx, image_locations[getHourTens()].sy, image_locations[getHourTens()].swidth, 
                image_locations[getHourTens()].sheight, 0+75, 75, image_locations[getHourTens()].swidth, image_locations[getHourTens()].sheight);
  ctx.drawImage(img, image_locations[getHourOnes()].sx, image_locations[getHourOnes()].sy, image_locations[getHourOnes()].swidth, 
                image_locations[getHourOnes()].sheight, 35+75, 75, image_locations[getHourOnes()].swidth, image_locations[getHourOnes()].sheight);
  //:
  ctx.drawImage(img, image_locations["sep"].sx, image_locations["sep"].sy, image_locations["sep"].swidth, image_locations["sep"].sheight, 
                     75+75, 85, image_locations["sep"].swidth, image_locations["sep"].sheight /1.5);
  //MM
  ctx.drawImage(img, image_locations[getMinTens()].sx, image_locations[getMinTens()].sy, image_locations[getMinTens()].swidth, 
                image_locations[getMinTens()].sheight, 89+75, 75, image_locations[getMinTens()].swidth, image_locations[getMinTens()].sheight);
  ctx.drawImage(img, image_locations[getMinOnes()].sx, image_locations[getMinOnes()].sy, image_locations[getMinOnes()].swidth, 
                image_locations[getMinOnes()].sheight, 124+75, 75, image_locations[getMinOnes()].swidth, image_locations[getMinOnes()].sheight);
  //:
  ctx.drawImage(img, image_locations["sep"].sx, image_locations["sep"].sy, image_locations["sep"].swidth, image_locations["sep"].sheight, 
                     164+75, 80, image_locations["sep"].swidth, (image_locations["sep"].sheight /1.5) / 2 );
  //SS
  ctx.drawImage(img, image_locations[getSecTens()].sx, image_locations[getSecTens()].sy, image_locations[getSecTens()].swidth, 
                image_locations[getSecTens()].sheight, 178+75, 75, image_locations[getSecTens()].swidth/2, image_locations[getSecTens()].sheight/2);
  ctx.drawImage(img, image_locations[getSecOnes()].sx, image_locations[getSecOnes()].sy, image_locations[getSecOnes()].swidth, 
                image_locations[getSecOnes()].sheight, 195+75, 75, image_locations[getSecOnes()].swidth/2, image_locations[getSecOnes()].sheight/2);
}

function loop(){
  if(clock_started) {
    secs++;
    if(secs < 359999) {
      ctx.clearRect ( 0 , 0 , 500 , 200);
      drawClock();
    }
    else if(secs === 359999) {
      ctx.clearRect ( 0 , 0 , 500 , 200);
      drawClock();
      // NEED CODE TO PUSH 359999 SECONDS ON TO SESSION ARRAY
      startClock();
    }
  }

}

window.setInterval(loop, 1000);
