window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded() {
  canvasApp();
}

function canvasApp() {

  var following;
  var upperLimit = 0.42;
  var lowerLimit = 0.32;

  function drawScreen() {
    context.fillStyle = '#EEEEEE';

    var currHorVal = parseFloat($("#corr1").text()).toFixed(4);
    var currVerVal = parseFloat($("#corr2").text()).toFixed(4);

   if (((currHorVal > upperLimit || currHorVal < -(upperLimit)) && currVerVal > upperLimit || currVerVal < -(upperLimit))){
      context.fillStyle = '#90ffcc';
      following = true;
    } else if ((currHorVal > lowerLimit || currHorVal < -(lowerLimit)) && (currVerVal > lowerLimit || currVerVal < -(lowerLimit)) && following) {
      context.fillStyle = '#90ffcc';
    } else {
      following = false;
    }

    context.fillRect(0, 0, theCanvas.width, theCanvas.height);
    //Box
    context.strokeStyle = '#000000';
    context.strokeRect(1, 1, theCanvas.width - 2, theCanvas.height - 2);

    var movement;
    if (ball.x > 50 && ball.x < 800) {
      movement = ball.speed * ball.direction;
    } else if (ball.x <= 50) {
      ball.direction = 1;
      movement = ball.speed * ball.direction;
    } else if (ball.x >= 800) {
      ball.direction = -1;
      movement = ball.speed * ball.direction;
    }

    //console.log(ball);

    ball.x = ball.x + movement;
    ball.y = ball.y + movement;

    // save coordinates
    saveCircleCoordinates(ball.x, ball.y);

    /*context.fillStyle = "#000000";
    context.beginPath();
    context.arc(ball.x, ball.y, 10, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();*/
    
    context.beginPath();
    context.moveTo(ball.x,ball.y);
  context.lineTo(ball.x + parseInt($("#corr3").text()*0.99), ball.y);
    context.lineWidth=5;
    context.stroke();
    
    context.beginPath();
    context.moveTo(500, 500);
  context.lineTo(parseFloat($("#corr3").text()*0.9+500).toFixed(2), 500);
    context.stroke();
    
    //var nakki = ball.x + parseInt($("#corr3").text()*0.9);
    //console.log(nakki);
    
    context.beginPath();
    context.moveTo(500,500);
  context.lineTo(500, parseFloat($("#corr4").text()*0.99+480).toFixed(2));
    context.stroke();
    
    context.beginPath();
    context.moveTo(ball.x, ball.y);
  context.lineTo(ball.x, ball.y - parseFloat($("#corr4").text() -50));
    context.stroke();
    
    //ilmeisesti täytyy ottaa abs
    
    context.lineWidth=1;
    
    context.closePath();
    context.fill();

  }

  theCanvas = document.getElementById("canvasOne");
  context = theCanvas.getContext("2d");

  var ball = {
    x: 150,
    y: 150,
    speed: 30,
    direction: 1
  };

  setInterval(drawScreen, 33);

}


var circleXCoordinates = [];
var circleYCoordinates = [];
var memoryLength = 70;

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
