var audio = new Audio("bumerang.mp3");
audio.play();

audio.volume = 0.5;



function increaseVolume(){
  if (audio.volume <= 0.99){
    audio.volume += 0.005;
  }
  //console.log(audio.volume);
};

function decreaseVolume(){
  if (audio.volume >= 0.01){
    audio.volume -= 0.005;
  }
  //console.log(audio.volume);
};