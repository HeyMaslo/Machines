var innerDeg = 0;
var outerknob = document.getElementById('outerknob');
var simspeed	= 5;
var firstpush = true;
var langdeg;

  m1     = 10;
  m2     = 10;
  Phi1   = 90/180*(Math.PI);
  Phi2   = 90/180*(Math.PI);
  d2Phi1 = 0;
  d2Phi2 = 0;
  dPhi1  = 0;
  dPhi2  = 0;

var oldSpeed;
mouseTrack();
function mouseTrack(){ //reset mousespeed to 0 even after listening stop
	if(mouseSpeed == oldSpeed){
		mouseSpeed=0;
		clearInterval(init);
	}
	oldSpeed = mouseSpeed;
	setTimeout(mouseTrack, 100);	
}
outerknob.addEventListener("mousedown", function(){ //click on knob one shot
	document.onmousemove = function(){ //mouse moves continuous shot
		if(mouseSpeed>0){ //mouse moves fast
			run();
		}else{ //mouse don't move fast
			clearInterval(init); //stop simulation
		} 
	};    
});

document.addEventListener("mouseup", function(){ //unclick
	
	document.onmousemove = null; //stop mouse sensing
	clearInterval(init); //stop simulation
});


function drawCircle(myCircle, context) {
  context.beginPath();
  context.arc(myCircle.x, myCircle.y, myCircle.mass, 0, 2 * Math.PI, false);
  context.fillStyle = 'rgba(255,255,255,1)';
  context.fill();
}

function drawLine(myLine, context) {
  context.beginPath();
  context.moveTo(myLine.x0, myLine.y0);
  context.lineTo(myLine.x, myLine.y);
  context.lineWidth = 0;
  context.stroke();
}
function angle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}


function animate(myCircle1, myCircle2, myLine1, myLine2, canvas, context) {
  mu      =  1+m1/m2;
  d2Phi1  =  (g*(Math.sin(Phi2)*Math.cos(Phi1-Phi2)-mu*Math.sin(Phi1))-(l2*dPhi2*dPhi2+l1*dPhi1*dPhi1*Math.cos(Phi1-Phi2))*Math.sin(Phi1-Phi2))/(l1*(mu-Math.cos(Phi1-Phi2)*Math.cos(Phi1-Phi2)));
  d2Phi2  =  (mu*g*(Math.sin(Phi1)*Math.cos(Phi1-Phi2)-Math.sin(Phi2))+(mu*l1*dPhi1*dPhi1+l2*dPhi2*dPhi2*Math.cos(Phi1-Phi2))*Math.sin(Phi1-Phi2))/(l2*(mu-Math.cos(Phi1-Phi2)*Math.cos(Phi1-Phi2)));
  dPhi1   += d2Phi1*time;
  dPhi2   += d2Phi2*time;
  Phi1    += dPhi1*time;
  Phi2    += dPhi2*time;

  myCircle1.x = X0+l1*Math.sin(Phi1);
  myCircle1.y = Y0+l1*Math.cos(Phi1);
  myCircle2.x = X0+l1*Math.sin(Phi1)+l2*Math.sin(Phi2);
  myCircle2.y = Y0+l1*Math.cos(Phi1)+l2*Math.cos(Phi2);

  myLine1.x  = myCircle1.x;
  myLine1.y  = myCircle1.y;
  myLine2.x0 = myCircle1.x;
  myLine2.y0 = myCircle1.y;
  myLine2.x  = myCircle2.x;
  myLine2.y  = myCircle2.y;

  context.clearRect(0, 0, canvas.width, canvas.height);

  drawLine(myLine1, context);
  drawLine(myLine2, context);
  drawCircle(myCircle1, context);
  drawCircle(myCircle2, context);
	
	innerDeg = angle(myCircle1.x, myCircle1.y, myCircle2.x, myCircle2.y)*2+180;	

	
	
$('#innerknob').css({
  transform: 'rotate(' + innerDeg + 'deg)' 	
});
	//normalize langDeg
	if(innerDeg >= 360){
		langDeg = innerDeg-360;
	}else if(innerDeg < 0){
		langDeg = innerDeg+360;
	}else{
		langDeg = innerDeg;
	}
}

//Physics Constants
var d2Phi1 = 0;
var d2Phi2 = 0;
var dPhi1  = 0;
var dPhi2  = 0;
var Phi1   = 0*(Math.PI)/2;
var Phi2   = 1.99*(Math.PI)/2;
var m2     = 10;
var l1     = 100;
var l2     = 100;
var X0     = 200;
var Y0     = 100;
var g      = 9.8;
var time   = 0.05;

var canvas  = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var init    = {};


function run(){
	if(firstpush == true){
		//Phi2   = (1.99-speedX/100)*(Math.PI)/2
		firstpush = false;
		//alert(1.99-speedX/200);
	}
  var myLine1 = {x0: X0, y0: Y0, x: 0, y: 0};
  var myLine2 = {x0: 0, y0: 0, x: 0, y: 0};
  var myCircle1 = {x: X0+l1*Math.sin(Phi1), y: Y0+l1*Math.cos(Phi1), mass: m1};
  var myCircle2 = {x: X0+l1*Math.sin(Phi1)+l2*Math.sin(Phi2), y: Y0+l1*Math.cos(Phi1)+l2*Math.cos(Phi2), mass: m2};

  clearInterval(init);
  context.clearRect(0, 0, canvas.width, canvas.height);
  init = setInterval(function(){
    animate(myCircle1, myCircle2, myLine1, myLine2, canvas, context);
  }, simspeed);

}



var timestamp = null;
var lastMouseX = null;
var lastMouseY = null;
var speedX;
var speedY;
var mouseSpeed;


document.body.addEventListener("mousemove", function(e) {
    if (timestamp === null) {
        timestamp = Date.now();
        lastMouseX = e.screenX;
        lastMouseY = e.screenY;
        return;
    }

    var now = Date.now();
    var dt =  now - timestamp;
    var dx = e.screenX - lastMouseX;
    var dy = e.screenY - lastMouseY;
    speedX = Math.round(dx / dt * 100);
    speedY = Math.round(dy / dt * 100);
	

    timestamp = now;
    lastMouseX = e.screenX;
    lastMouseY = e.screenY;
	mouseSpeed = Math.abs(speedX+speedY);
	
});