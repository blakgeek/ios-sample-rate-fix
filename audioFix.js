(function () {

    var correctSampleRate = 44100;
    var AudioCtor = window.AudioContext || window.webkitAudioContext;
    var context;

    if (!AudioCtor) return;

    context = new AudioCtor();

    // Check if hack is necessary. Only occurs in iOS6+ devices
    // and only when you first boot the iPhone, or play a audio/video
    // with a different sample rate
    if (/(iPhone|iPad)/i.test(navigator.userAgent) && context.sampleRate !== correctSampleRate) {
        var buffer = context.createBuffer(1, 1, correctSampleRate);
        var dummy = context.createBufferSource();
        dummy.buffer = buffer;
        dummy.connect(context.destination);
        dummy.start(0);
        dummy.disconnect();

        context.close(); // dispose old context
    }
})();