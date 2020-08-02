var searchTerm = document.querySelector(".searchTerm");
var searchButton = document.querySelector(".searchButton");

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

var grammar = "#JSGF V1.0;";

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = "en-US";
recognition.interimResults = false;

recognition.onresult = function (event) {
  speechSynthesis.cancel();

  var last = event.results.length - 1;
  var command = event.results[last][0].transcript;
  var commandLower = command.toLowerCase();
  var dotFixed = commandLower.split("dot").join(".");
  var emailConvert = dotFixed.split("at the rate").join("@");
  var mailTo = emailConvert.split(" ").join("");
  searchTerm.setAttribute("value", mailTo);
  console.log(mailTo);

  // Text to speech
  const msg = new SpeechSynthesisUtterance();
  let voices = [];
  const voicesDropdown = document.querySelector('[name="voice"]');
  const speakButton = document.querySelector("#speak");
  const stopButton = document.querySelector("#stop");

  msg.text = `Alright, we have sent an email to ${mailTo}. They will soon be joining the video conference.`;

  function populateVoices() {
    voices = this.getVoices();
    voicesDropdown.innerHTML = voices
      .map(
        (voice) =>
          `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
      )
      .join("");
  }

  function setVoice() {
    msg.voice = voices.find((voice) => voice.name === this.value);
    toggle();
  }

  function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
      speechSynthesis.speak(msg);
    }
  }

  speechSynthesis.addEventListener("voiceschanged", populateVoices);
  voicesDropdown.addEventListener("change", setVoice);
  speakButton.addEventListener("click", toggle);
  stopButton.addEventListener("click", () => toggle(false));

  // sent();
  toggle();
  searchButton.setAttribute("href", "/" + ROOM_ID + "/" + mailTo);
  searchButton.click();
};

recognition.onerror = function (event) {
  message.textContent = "Error occurred in recognition: " + event.error;
};

// Activating speech recognition

// mouse click activated
// document.addEventListener("click", () => {
//   recognition.start();
// });
document.addEventListener("keydown", function (zEvent) {
  // ctrl key activated
  if (zEvent.ctrlKey) {
    recognition.start();
  }
  // spacebar activated
  if (zEvent.keyCode == 32) {
    recognition.start();
  }
});
