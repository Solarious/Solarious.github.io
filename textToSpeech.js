function speakJap(text) {
	if (browserSupportsNaiveSpeech()) {
		speakJapNaive(text);
	} else {
		speakJapGoogle(text);
	}
}

function browserSupportsNaiveSpeech() {
	return (window.SpeechSynthesisUtterance != undefined);
}

function speakJapNaive(text) {
	var u = new SpeechSynthesisUtterance();
	u.text = text;
	u.lang = 'ja-JP';
	u.rate = 1;
	u.onerror = function(e) {
		alert("speakJap had an error");
	}
	speechSynthesis.speak(u);
}

function speakJapGoogle(text) {
	var audio = new Audio();
	var audioText = 'http://translate.google.com/translate_tts?ie=utf-8&tl=ja&q=' + encodeURIComponent(text);
	audio.src = audioText;
	audio.play();
}

function speakFromText() {
	speakJap(document.getElementById("textBox").value);
}