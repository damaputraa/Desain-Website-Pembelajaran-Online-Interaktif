function PlaySound(soundobj) {
  var thissound=document.getElementById(soundobj);
  thissound.play();
}

function Play2Sound(soundobj) {
  var thissound=document.getElementById(soundobj);
  thissound.play();
}

function PlaySoundBurger(soundobj) {
  var thissound=document.getElementById(soundobj);
  thissound.play();
}

function StopSound(soundobj) {
  var thissound=document.getElementById(soundobj);
  thissound.pause();
  thissound.currentTime = 0;
}