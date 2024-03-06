var synthesis = window.speechSynthesis;
if ('speechSynthesis' in window) {
    var synthesis = window.speechSynthesis;
  
    // Regex to match all English language tags e.g en, en-US, en-GB
    var langRegex = /^en(-[a-z]{2})?$/i;
  
    // Get the available voices and filter the list to only have English speakers
    var voices = synthesis
      .getVoices()
      .filter((voice) => langRegex.test(voice.lang));
  
    // Log the properties of the voices in the list
    voices.forEach(function (voice) {
      console.log({
        name: voice.name,
        lang: voice.lang,
        uri: voice.voiceURI,
        local: voice.localService,
        default: voice.default,
      });
    });
  } else {
    console.log('Text-to-speech not supported.');
  }