function speakJap(text, speed, onEndFunction) {
	if (browserSupportsNaiveSpeech()) {
		speakJapNaive(text, speed, onEndFunction);
	} else {
		speakJapGoogle(text, speed, onEndFunction);
	}
}

function browserSupportsNaiveSpeech() {
	return (window.SpeechSynthesisUtterance != undefined);
}

function speakJapNaive(text, speed, onEndFunction) {
	var u = new SpeechSynthesisUtterance();
	u.text = text;
	u.lang = 'ja-JP';
	if (isNaN(speed)) {
		speed = 1;
	}
	u.rate = speed;
	u.onerror = function(e) {
		alert("speakJap had an error");
	}
	speechSynthesis.speak(u);
	if (arguments.length >= 2) {
		u.onend = onEndFunction
	}
}

function speakJapGoogle(text, speed, onEndFunction) {
	var audio = new Audio();
	if (isNaN(speed)) {
		speed = 1;
	}
	var audioText = 'http://translate.google.com/translate_tts?ie=utf-8&tl=ja&q=' + encodeURIComponent(text) + '&ttsspeed=' + speed;
	audio.src = audioText;
	audio.play();
	if (arguments.length >= 2) {
		audio.onended = onEndFunction;
	}
}

function speakFromText() {
	speakJap(document.getElementById("textBox").value, document.getElementById("speechSpeedInput").value);
}