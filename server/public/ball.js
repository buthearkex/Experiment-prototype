window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded() {
  canvasApp();
}

var rotation = 0.0;

function canvasApp() {

  var following1;
  var following2;
  var upperLimit = 0.7;
  var lowerLimit = 0.6;
  
  var lastTime = 0;

  function drawScreen() {

    context.fillStyle = '#ffffff';

    var currHorVal = parseFloat($("#corr1").text()).toFixed(4);
    var currVerVal = parseFloat($("#corr2").text()).toFixed(4);

    if ((currHorVal > upperLimit) && (currVerVal < -(upperLimit))) {
      
      following1 = true;
      decreaseVolume();
      decreaseRotation();
      lastTime =  new Date();
    } else if ((currHorVal > lowerLimit) && (currVerVal > lowerLimit) && following1) {
      
      decreaseVolume();
      decreaseRotation();
      lastTime =  new Date();
    } else {
      following1 = false;
    }

    if ((currHorVal < -(upperLimit)) && (currVerVal < -(upperLimit))) {
      
      following2 = true;
      increaseVolume();
      increseRotation();
      lastTime =  new Date();
    } else if ((currHorVal < -(lowerLimit)) && (currVerVal < -(lowerLimit)) && following2) {
      
      increaseVolume();
      increseRotation();
      lastTime =  new Date();
    } else {
      following2 = false;
    }

    context.fillRect(0, 0, theCanvas.width, theCanvas.height);
    context.strokeStyle = '#000000';


    ball.x = circle.centerX + Math.cos(circle.angle) * circle.radius;
    ball.y = circle.centerY + Math.sin(circle.angle) * circle.radius;

    ball2.x = circle.centerX - Math.cos(-circle.angle) * circle.radius;
    ball2.y = circle.centerY - Math.sin(-circle.angle) * circle.radius;

    saveCircleCoordinates(ball.x, ball.y);

    circle.angle += ball.speed;

    context.fillStyle = "#000000";
    context.beginPath();
    context.arc(ball.x, ball.y, 30, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
    
    context.fillStyle = "#797979";
    context.beginPath();
    context.arc(ball2.x, ball2.y, 15, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
    
    var image = document.getElementById('source');
    var image2 = document.getElementById('source2');
    //context.drawImage(image, 290, 280);//comment out this for variant A

    context.save(); // save current state
    
    if ( (new Date() - lastTime)/60000 < 0.0005 ) {
      console.log((new Date() - lastTime)/60000);
      context.shadowOffsetX = 5;
      context.shadowOffsetY = 10;
      context.shadowColor = 'grey';
      context.shadowBlur = 40;
    }else{
      console.log('bah');
      context.shadowColor = "transparent"
    }
    
    context.translate(theCanvas.width/2,theCanvas.height/2);
    context.fillRect(0,0,5,5);
    context.rotate(rotation);
    //context.drawImage(image2, -225, -225); //comment out this for variant A
    context.restore();
    context.shadowColor = "transparent";
  }

  var radius = 100;
  var circle = {
    centerX: 500,
    centerY: 500,
    radius: 400,
    angle: 0
  }
  var ball = {
    x: 0,
    y: 0,
    speed: .12
  };

  var ball2 = {
    x: 0,
    y: 0,
    speed: .12
  };

  theCanvas = document.getElementById("canvasOne");
  context = theCanvas.getContext("2d");

  setInterval(drawScreen, 33);

}

function increseRotation(){
  if(rotation < 2.6){
    rotation = rotation + 0.03;
  }
};

function decreaseRotation(){
  if(rotation > -2.6){
    rotation = rotation - 0.03;
  }
};

var circleXCoordinates = [];
var circleYCoordinates = [];
var memoryLength = 100;

function saveCircleCoordinates(xCoord, yCoord) {
  // x-coordinates first
  if (circleXCoordinates.length < memoryLength) {
    circleXCoordinates.push(xCoord);
  } else {
    circleXCoordinates.splice(0, 1);
    circleXCoordinates.push(xCoord);
  }
  // then y-coordinates
  if (circleYCoordinates.length < memoryLength) {
    circleYCoordinates.push(yCoord);
  } else {
    circleYCoordinates.splice(0, 1);
    circleYCoordinates.push(yCoord);
  }
};
