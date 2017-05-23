var shapeCount = 16;


const audioApi = new window.AudioContext;

// variables
var audioBuffer,
    analyserNode,
    frequencyData = new Uint8Array(4096);

// create an audio API analyser node and connect to source
function createAnalyserNode(audioSource) {
  analyserNode = audioApi.createAnalyser();
  analyserNode.fftSize = 8192;
  audioSource.connect(analyserNode);
}

// getUserMedia success callback -> pipe audio stream into audio API
function gotStream(stream) {
    // Create an audio input from the stream.
    var audioSource = audioApi.createMediaStreamSource(stream);
    createAnalyserNode(audioSource);
    draw();
}

function adjustFreqData(shapeNo) {
  analyserNode.getByteFrequencyData(frequencyData);
  var removed = frequencyData.slice(0,1024);
  
  var newFreqs = [], prevRangeStart = 0, prevItemCount = 0;

  // set up the maxPow & thus ratio based on shapeCount
  var maxPow = Math.pow(2,shapeNo/2);
  var ratio = 1024/maxPow;
  
  // looping - get values for new array based on shapeCount
  for (let j=1; j<shapeNo+1; j++) {
    var itemCount, rangeStart;

    var pow = j/2;

    // use ratio to get itemCount (round)
    itemCount = Math.ceil( ((Math.pow(2, pow))*ratio)/2 );

    rangeStart = prevRangeStart + Math.ceil(prevItemCount/2);
     // get new values
    var newValue = 0, total = 0;
    for (let k=rangeStart; k<rangeStart+itemCount; k++) {
      // add up items and divide by total
      total += frequencyData[k];
      newValue = parseInt(total/itemCount);
    }
    // add to new array
    newFreqs.push(newValue);

    prevItemCount = itemCount;
    prevRangeStart = rangeStart;
  }
  
  return newFreqs;
}

// pipe in analysing to getUserMedia
navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then(gotStream);