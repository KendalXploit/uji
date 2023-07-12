const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(sentence) {
  const speech = new SpeechSynthesisUtterance(sentence);
  speech.volume = 1;
  speech.pitch = 1;
  speech.rate = 1;
  speech.lang = 'ja-JP';
  window.speechSynthesis.speak(speech);
}

function wishMe() {
  const day = new Date();
  const hr = day.getHours();

  if (hr >= 0 && hr < 12) {
    speak("おはようございます、ボス");
  } else if (hr == 12) {
    speak("こんにちは、ボス");
  } else if (hr > 12 && hr <= 17) {
    speak("こんにちは、ボス");
  } else {
    speak("こんばんは、ボス");
  }
}

window.addEventListener('load', () => {
  speak("Activating himico");
  speak("Going online");
  wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  content.textContent = transcript;
  speakThis(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
  recognition.start();
});

function speakThis(message) {
  if (message.includes("hei") || message.includes("hello")) {
    const finalText = "こんにちは、ボス";
    speak(finalText);
  } else if (message.includes("how are you")) {
    const finalText = "元気です、ボス。どのようにお手伝いしましょうか？";
    speak(finalText);
  } else if (message.includes("name")) {
    const finalText = "私の名前はヒミコです";
    speak(finalText);
  } else if (message.includes("nganu")) {
    const finalText = "ごめんなさい、それは理解できません";
    speak(finalText);
  } else if (message.includes("sayang")) {
    const finalText = "何かご用ですか？";
    speak(finalText);
  } else if (message.includes("open google")) {
    window.open("https://google.com", "_blank");
    const finalText = "Googleを開いています";
    speak(finalText);
  } else if (message.includes("open instagram")) {
    window.open("https://instagram.com", "_blank");
    const finalText = "Instagramを開いています";
    speak(finalText);
  } else if (message.includes("what is") || message.includes("who is") || message.includes("what are")) {
    window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
    const finalText = message + "についての情報を見つけました";
    speak(finalText);
  } else if (message.includes("wikipedia")) {
    window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
    const finalText = message + "に関するウィキペディアの情報を見つけました";
    speak(finalText);
  } else if (message.includes("jam")) {
    const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
    const finalText = time;
    speak(finalText);
  } else if (message.includes("tanggal")) {
    const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
    const finalText = date;
    speak(finalText);
  } else if (message.includes("calculator")) {
    window.open("Calculator:///");
    const finalText = "電卓を開いています";
    speak(finalText);
  } else {
    window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
    const finalText = message + "に関する情報を見つけました";
    speak(finalText);
  }
}
