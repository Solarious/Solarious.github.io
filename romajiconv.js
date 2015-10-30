function isSmallY(cha) {
	return (cha == 'ゃ' || cha == "ゅ" || cha == "ょ");
}

function isShChJ(cha) {
	return (cha == 'し') || (cha == 'じ') || (cha == 'ち');
}

function hiraganaToRomaji(word) {
	var romaji = [];
	var pointer = 0;
	var length = word.length
	var dc = false;
	
	while (pointer < length) {
		var sl;
		if ((pointer + 1 < length) && isShChJ(word.charAt(pointer)) && isSmallY(word.charAt(pointer + 1))) {
			sl = 2;
		} else if (word.charAt(pointer) == "っ") {
			dc = true;
			pointer += 1;
			continue;
		} else {
			sl = 1;
		}
		
		var selection = word.substr(pointer, sl);
		var next = htor[selection];
		if (dc) {
			next = next.charAt(0) + next;
			dc = false;
		}
		if (isSmallY(selection)) {
			var prev = romaji.pop();
			romaji.push(prev.slice(0,-1));
		}
		romaji.push(next);
		pointer += sl;
	}
	
	return romaji.join("");
}

function test() {
	var romaji = hiraganaToRomaji(document.getElementById("userInput").value);
	document.getElementById("textA").textContent = romaji;
}

htor = {
	"あ": "a",
	"い": "i",
	"う": "u",
	"え": "e",
	"お": "o",
	
	"か": "ka",
	"き": "ki",
	"く": "ku",
	"け": "ke",
	"こ": "ko",
	
	"さ": "sa",
	"し": "shi",
	"しゃ": "sha",
	"しゅ": "shu",
	"しょ": "sho",
	"す": "su",
	"せ": "se",
	"そ": "so",
	
	"た": "ta",
	"ち": "chi",
	"ちゃ": "cha",
	"ちゅ": "chu",
	"ちょ": "cho",
	"つ": "tsu",
	"て": "te",
	"と": "to",
	
	"な": "na",
	"に": "ni",
	"ぬ": "nu",
	"ね": "ne",
	"の": "no",
	
	"は": "ha",
	"ひ": "hi",
	"ふ": "fu",
	"へ": "he",
	"ほ": "ho",
	
	"ま": "ma",
	"み": "mi",
	"む": "mu",
	"め": "me",
	"も": "mo",
	
	"や": "ya",
	"ゆ": "yu",
	"よ": "yo",
	
	"ゃ": "ya",
	"ゅ": "yu",
	"ょ": "yo",
	
	"ら": "ra",
	"り": "ri",
	"る": "ru",
	"れ": "re",
	"ろ": "ro",
	
	"わ": "wa",
	"を": "wo",
	"ん": "n",
	
	"が": "ga",
	"ぎ": "gi",
	"ぐ": "gu",
	"げ": "ge",
	"ご": "go",
	
	"だ": "da",
	"で": "de",
	"ど": "do",
	
	"ざ": "za",
	"じ": "ji",
	"じゃ": "ja",
	"じゅ": "ju",
	"じょ": "jo",
	"ず": "zu",
	"ぜ": "ze",
	"ぞ": "zo",
	
	"ば": "ba",
	"び": "bi",
	"ぶ": "bu",
	"べ": "be",
	"ぼ": "bo",
	
	"ぱ": "pa",
	"ぴ": "pi",
	"ぷ": "pu",
	"ぺ": "pe",
	"ぽ": "po",
	
	"（": "(",
	"）": ")",
	"(": "(",
	")": ")",
	"～": "~",
};