//streaming the video
function getVideo(){
  var video = document.getElementById('video');
  var play = document.getElementById('play');
  var stop = document.getElementById('stop');

  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
    navigator.mediaDevices.getUserMedia({video: true})
    .then(function(stream){     //only grabs video if user says yes
      video.srcObject = stream;
      video.play();
    }).catch(function(err) { //logs the error to the console
      console.log("Video capture error: ", error.code);
    });
    play.style.zIndex = "-1";
    stop.style.zIndex = "4"
  }
}
//stops each track and ends video streaming
function endVideo(){
  var play = document.getElementById('play');
  var stop = document.getElementById('stop');
  var videoStream = video.srcObject;
  var tracks = videoStream.getTracks();
  //stops all tracks of the video stream
  for (var x = 0; x < tracks.length; x++){
    var track = tracks[x];
    track.stop();
  }
  play.style.zIndex = "4";
  stop.style.zIndex = "-1"
  video.srcObject = null;
}
//clear the photo from the canvas
function clearphoto() {
  canvas = document.getElementById('canvas');
  photo = document.getElementById('photo');
  var area = canvas.getContext('2d');
  area.fillStyle = "#3B3B3B";
  area.fillRect(0, 0, canvas.width, canvas.height);
  play.style.zIndex = "-1";
  stop.style.zIndex = "4"
}

//taking picture functionality
void function takePic(){
  var width = window.innerWidth * 0.40;
  var height = 0;
  var streaming = false;
  var video = null;
  var canvas = null;
  var photo = null;
  var start = null;

  function startup(){
    //setting the canvas size
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    start = document.getElementById('start');
    stop = document.getElementById('stop')

    getVideo();

    //checking if compatible with usermedia
    video.addEventListener('canplay', function(){
      if(!streaming){
        height = video.videoHeight / (video.videoWidth/width);
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    start.addEventListener('click', function(ev){
      takepicture();
      ev.preventDefault(); //so that it doesn't open link
    }, false);
  }

  function takepicture() {
    var context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    //can save image as png
    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);

    //endVideo();
  }

  window.addEventListener('load', startup, false); //waits for window to load completely
}();
