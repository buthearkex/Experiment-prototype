window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded() {
  canvasApp();
}

// helper array for setTimer
var timerArr = [];

// function to track that user continuously follows movement. Following is interpreted to have stopped if correlation drops under limit for 300ms
//draw screen called every 100ms, so this is being called 10 in a second
function setTimer(following){
  if(following){
    //empty array
    timerArr.length = 0;
  }else{
    timerArr.push('f');
    if (timerArr.length >= 3){
      socket.emit('following', 'stopped');
      timerArr.length = 0;
      /*setTimeout(function() {
        // do nothing
      }, 1000);*/
    }
    
  }
}


function canvasApp() {
  
  var following1;
  var following2;
  var upperLimit = 0.9;
  var lowerLimit = 0.7;

  function drawScreen() {

    var currLed = parseInt($("#led").text());
    
    
    context.fillStyle = '#EEEEEE';
    
    var currHorVal = parseFloat($("#corr1").text()).toFixed(4);
    //var currVerVal = parseFloat($("#corr2").text()).toFixed(4);

    if ((currHorVal > upperLimit)) {
      context.fillStyle = '#90ffcc';
      following1 = true;
      setTimer(true);
      socket.emit('following', 'started');
    } else if ((currHorVal > lowerLimit) && following1) {
      context.fillStyle = '#90ffcc';
      setTimer(true);
      socket.emit('following', 'started');
    } else {
      following1 = false;
      setTimer(false);
      //socket.emit('following', 'stopped');
    }

    if ((currHorVal < -(upperLimit))) {
      context.fillStyle = '#90ffcc';
      following2 = true;
      setTimer(true);
      socket.emit('following', 'started');
    } else if ((currHorVal < -(lowerLimit)) && following2) {
      context.fillStyle = '#90ffcc';
      setTimer(true);
      socket.emit('following', 'started');
    } else {
      following2 = false;
      setTimer(false);
      //socket.emit('following', 'stopped');
    }

    context.fillRect(0, 0, theCanvas.width, theCanvas.height);
    //Box
    context.strokeStyle = '#000000';
    context.strokeRect(1, 1, theCanvas.width - 2, theCanvas.height - 2);
    
    context.beginPath();

    context.closePath();
    context.fill();

  }

  theCanvas = document.getElementById("canvasOne");
  context = theCanvas.getContext("2d");
  
  var circles = [];
  
  for (i = 0; i < 60; i++){
    var circle = {
      centerX: (theCanvas.width / 60) * i + 10,
      centerY: 300,
    }
    circles.push(circle);
  }

  setInterval(drawScreen, 100);

}

/*
TODO: 
- improve signal by averaging
- clean useless stuff
- huono versio: normi valo kirkas koko ajan?!
*/
