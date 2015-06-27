function speakJap(text, onEndFunction) {
	if (browserSupportsNaiveSpeech()) {
		speakJapNaive(text, onEndFunction);
	} else {
		speakJapGoogle(text, onEndFunction);
	}
}

function browserSupportsNaiveSpeech() {
	return (window.SpeechSynthesisUtterance != undefined);
}

function speakJapNaive(text, onEndFunction) {
	var u = new SpeechSynthesisUtterance();
	u.text = text;
	u.lang = 'ja-JP';
	u.rate = 1;
	u.onerror = function(e) {
		alert("speakJap had an error");
	}
	speechSynthesis.speak(u);
	if (arguments.length >= 2) {
		u.onend = onEndFunction
	}
}

function speakJapGoogle(text, onEndFunction) {
	var audio = new Audio();
	var audioText = 'http://translate.google.com/translate_tts?ie=utf-8&tl=ja&q=' + encodeURIComponent(text);
	audio.src = audioText;
	audio.play();
	if (arguments.length >= 2) {
		audio.onended = onEndFunction;
	}
}

function speakFromText() {
	speakJap(document.getElementById("textBox").value);
}