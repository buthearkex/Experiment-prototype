var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/line', function(req,res){
  res.sendFile(__dirname + '/line.html');
});

app.get('/leds', function(req,res){
  res.sendFile(__dirname + '/leds.html');
});

app.get('/snap', function(req,res){
  res.sendFile(__dirname + '/snap.html');
});

app.get('/linechart', function(req,res){
  res.sendFile(__dirname + '/mikkos_linechart.html');
});

app.get('/instructions', function(req,res){
  res.sendFile(__dirname + '/instructions.html');
});

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  socket.on('message', function (msg) {
    io.emit('message', msg);
  });
  
  socket.on('leds', function(msg){
    io.emit('leds', msg);
  });
  
  var lastTime = 0;
  
  socket.on('following', function(msg){
    io.emit('following', msg);
    console.log(msg);
    if(msg === "started"){
      if((new Date() - lastTime)/60000 > 0.05){
        toggleLights();
        lastTime =  new Date();
      }
    }
  });

});

http.listen(3000, '0.0.0.0', function () {
  console.log('listening on *:3000');
});


/*=========== CONTROL FOR PHILIPS HUE BELOW ==============*/

var lightsOn;

var displayResult = function(result) {
    console.log(result);
};

var displayError = function(err) {
    console.error(err);
};

var displayStatus = function(status) {
    console.log(JSON.stringify(status, null, 2));
    lightsOn = status.state.on;
};

var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var host = "", //this needs to be generated for the network
    username = "", //this needs to be generated for the network
    api = new HueApi(host, username),
    state = lightState.create();

startState = lightState.create().on().white(350, 100);

function turnLightsOff(){
  api.setLightState(1, state.off())
	.then(displayResult)
    .fail(displayError)
    .done();
  lightsOn = false;
}

function turnLightsOn(){
  api.setLightState(1, startState)
	.then(displayResult)
    .fail(displayError)
    .done();
  lightsOn = true;
}

function toggleLights(){
  api.lightStatus(1, function(err, result) {
    if (err) throw err;
    displayStatus(result);
    if(lightsOn){
      turnLightsOff();
    }else{
      turnLightsOn();
    }
  });
}

function increaseBrightness(){
  newState = lightState.create().bri_inc(20);
  api.setLightState(1, newState)
	.then(displayResult)
    .fail(displayError)
    .done();
}

function decreaseBrightness(){
  newState = lightState.create().bri_inc(-20);
  api.setLightState(1, newState)
	.then(displayResult)
    .fail(displayError)
    .done();
}

//toggles light at start
toggleLights();

/////////////////////////
