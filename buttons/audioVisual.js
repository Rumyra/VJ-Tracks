// set up audio context
var audioContext = (window.AudioContext || window.webkitAudioContext);
// create audio class
if (audioContext) {
  // Web Audio API is available.
  var audioAPI = new audioContext();
} else {
  // Web Audio API is not available. Ask the user to use a supported browser.
  alert("Oh nos! It appears your browser does not support the Web Audio API, please upgrade or use a different browser");
}

// variables
var analyserNode,
    frequencyData = new Uint8Array(64);
const screen = document.querySelector('#screen');
console.log(screen);
    

// create an audio API analyser node and connect to source
function createAnalyserNode(audioSource) {
  analyserNode = audioAPI.createAnalyser();
  analyserNode.fftSize = 128;
  audioSource.connect(analyserNode);
}


function animate() {
  requestAnimationFrame(animate);
  analyserNode.getByteFrequencyData(frequencyData);
  animateDom();
}

// getUserMedia success callback -> pipe audio stream into audio API
var gotStream = function(stream) {
  // Create an audio input from the stream.
  var audioSource = audioAPI.createMediaStreamSource(stream);
  createAnalyserNode(audioSource);
  animate();
}

// pipe in analysing to getUserMedia
navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then(gotStream);

