var audioSetup = function(window, navigator) {

  var params = {
    finalArrCount: 256,
    lowFreqCutoff: 85, // 256 over 3
    highFreqCutoff: 170, // work out mid freqs based on both cut offs later
    beatPeak: 150 // value av has to pass to send beat event
  }

  var getStreamData = function(ctx, node) {
    // pipe in analysing to getUserMedia
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(stream => ctx.createMediaStreamSource(stream))
      .then(source => {
        source.connect(node);
        console.log('got stream');
      });
  }

  var init = function() {
    const context = new window.AudioContext();
    let data = new Uint8Array(256),
      analyserNode = context.createAnalyser();
    analyserNode.fftSize = 512;

    getStreamData(context, analyserNode);
  }

  // analysis here
  var 

  return {
    params: params,
    init: init,
  }


}(window, navigator);
