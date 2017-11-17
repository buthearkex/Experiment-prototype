

var lightsOn;

var displayResult = function(result) {
    console.log(result);
};

var displayError = function(err) {
    console.esrror(err);
};

var displayStatus = function(status) {
    console.log(JSON.stringify(status, null, 2));
    lightsOn = status.state.on;
};

var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var host = "192.168.0.100",
    username = "i50Ln3peN5rPLmHbluyXVmb60dpKXNIp1CWaF0Sp",
    api = new HueApi(host, username),
    state = lightState.create();

startState = lightState.create().on().white(350, 50);

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
