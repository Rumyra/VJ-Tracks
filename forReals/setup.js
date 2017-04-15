var shapeCount = 16;

const audioApi = new window.AudioContext;

// variables
var audioBuffer,
    analyserNode,
    frequencyData = new Uint8Array(2048);

// create an audio API analyser node and connect to source
function createAnalyserNode(audioSource) {
  analyserNode = audioApi.createAnalyser();
  analyserNode.fftSize = 4096;
  audioSource.connect(analyserNode);
}

// getUserMedia success callback -> pipe audio stream into audio API
function gotStream(stream) {
    // Create an audio input from the stream.
    var audioSource = audioApi.createMediaStreamSource(stream);
    createAnalyserNode(audioSource);
    draw();
}

function adjustFreqData() {
  analyserNode.getByteFrequencyData(frequencyData);
  var removed = frequencyData.slice(0,512);
  
  var newFreqs = [], prevRangeStart = 0, prevItemCount = 0;
  // looping for my new 16 items
  for (let j=1; j<17; j++) {
    var pow, itemCount, rangeStart;
    if (j%2 === 1) {
      pow = (j-1)/2;
    } else {
      pow = j/2;
    }
    itemCount = Math.pow(2, pow);
    if (prevItemCount === 1) {
      rangeStart = 0;
    } else {
      rangeStart = prevRangeStart + (prevItemCount/2);
    }

    var newValue = 0, total = 0;
    for (let k=rangeStart; k<rangeStart+itemCount; k++) {
      // add up items and divide by total
      total += frequencyData[k];
      newValue = total/itemCount;
    }
    newFreqs.push(newValue);

    prevItemCount = itemCount;
    prevRangeStart = rangeStart;
  }
  return newFreqs;
}

// pipe in analysing to getUserMedia
navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then(gotStream);