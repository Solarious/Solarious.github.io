// Notes:
// useKatakana and reversed should be set to true or false in another script

function shuffle(array) {
	for (var i = array.length-1; i > 0; i--) {
		var rand = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[rand];
		array[rand] = temp;
	}
	return array;
}

function setElementText(id, text) {
	document.getElementById(id).textContent = text;
}

var soundsBasic = ['a', 'i', 'u', 'e', 'o',
         'ka', 'ki', 'ku', 'ke', 'ko',
         'sa', 'shi', 'su', 'se', 'so',
         'ta', 'chi', 'tsu', 'te', 'to',
         'na', 'ni', 'nu', 'ne', 'no',
         'ha', 'hi', 'fu', 'he', 'ho',
         'ma', 'mi', 'mu', 'me', 'mo',
         'ya', 'yu', 'yo',
         'ra', 'ri', 'ru', 're', 'ro',
         'wa', 'wo', 'n'];
var soundsAdv = ['ga', 'gi', 'gu', 'ge', 'go',
               'za', 'ji', 'zu', 'ze', 'zo',
               'da', 'de', 'do',
               'ba', 'bi', 'bu', 'be', 'bo',
               'pa', 'pi', 'pu', 'pe', 'po'];
var hiraganaBasic = ['あ', 'い', 'う', 'え', 'お',
                 'か', 'き', 'く', 'け', 'こ',
                 'さ', 'し', 'す', 'せ', 'そ',
                 'た', 'ち', 'つ', 'て', 'と',
                 'な', 'に', 'ぬ', 'ね', 'の',
                 'は', 'ひ', 'ふ', 'へ', 'ほ',
                 'ま', 'み', 'む', 'め', 'も',
                 'や', 'ゆ', 'よ',
                 'ら', 'り', 'る', 'れ', 'ろ',
                 'わ', 'を', 'ん'];
var hiraganaAdv = ['が', 'ぎ', 'ぐ', 'げ', 'ご',
               'ざ', 'じ', 'ず', 'ぜ', 'ぞ',
               'だ', 'で', 'ど',
               'ば', 'び', 'ぶ', 'べ', 'ぼ',
               'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'];
var katakanaBasic = ['ア', 'イ', 'ウ', 'エ', 'オ',
                 'カ', 'キ', 'ク', 'ケ', 'コ',
                 'サ', 'シ', 'ス', 'セ', 'ソ',
                 'タ', 'チ', 'ツ', 'テ', 'ト',
                 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
                 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
                 'マ', 'ミ', 'ム', 'メ', 'モ',
                 'ヤ', 'ユ', 'ヨ',
                 'ラ', 'リ', 'ル', 'レ', 'ロ',
                 'ワ', 'ヲ', 'ン'];
var katakanaAdv = ['ガ', 'ギ', 'グ', 'ゲ', 'ゴ',
               'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ',
               'ダ', 'デ', 'ド',
               'バ', 'ビ', 'ブ', 'ベ', 'ボ',
               'パ', 'ピ', 'プ', 'ペ', 'ポ'];
var tuples;
var num; // part of tuples we are up to
var revealed; // true is textB has text in it, false if empty
var started;
var numCorrect;
var numTotal;
var useKatakana = false;
var reversed = false;

function setup() {
	num = -1;
	revealed = true;
	started = false;
	numCorrect = 0;
	numTotal = 0;
	setElementText("textA", " ");
	setElementText("textB", " ");
	if (!reversed)
		setElementText("numCorrect", "");
	var nodeSub = document.getElementById("submitButton");
	nodeSub.value = "Start";
}

function start() {
	tuples = [];
	var kanasBasic;
	var kanasAdv;
	if (useKatakana) {
		kanasBasic = katakanaBasic;
		kanasAdv = katakanaAdv;
	} else {
		kanasBasic = hiraganaBasic;
		kanasAdv = hiraganaAdv;
	}
	for (var i = 0; i < soundsBasic.length; i++) {
		tuples.push([kanasBasic[i], soundsBasic[i]]);
	}
	if (document.getElementById("dhCheckbox").checked) {
		for (var i = 0; i < soundsAdv.length; i++) {
			tuples.push([kanasAdv[i], soundsAdv[i]]);
		}
	}
	tuples = shuffle(tuples);
	num = 0;
	revealed = false;
	started = true;
	numCorrect = 0;
	numTotal = 0;
	if (reversed)
		setElementText("textA", tuples[num][1]);
	else
		setElementText("textA", tuples[num][0]);
	setElementText("textB", " ");
	var nodeSub = document.getElementById("submitButton");
	if (reversed)
		nodeSub.value = "Reveal";
	else
		nodeSub.value = "Enter";
}

function next() {
	if (!started) {
		start();
	} else if (!revealed) {
		var nodeB = document.getElementById("textB");
		if (reversed)
			nodeB.textContent = tuples[num][0];
		else
			nodeB.textContent = tuples[num][1];
		var nodeSub = document.getElementById("submitButton");
		nodeSub.value = "Next";
		if (!reversed) {
			var nodeUserInput = document.getElementById("userInput")
			if (nodeUserInput.value == tuples[num][1]) {
				nodeB.style.color = "#00FF00";
				numCorrect++;
			} else {
				nodeB.style.color = "#FF0000";
			}
			numTotal++;
			var text = "" + numCorrect + " out of " + numTotal + " correct";
			setElementText("numCorrect", text);
		}
		revealed = true;
	} else {
		num++;
		if (num >= tuples.length) {
			setElementText("textA", "Done");
			setElementText("textB", " ");
		} else {
			if (reversed)
				setElementText("textA", tuples[num][1]);
			else
				setElementText("textA", tuples[num][0]);
			setElementText("textB", " ");
			var nodeSub = document.getElementById("submitButton");
			if (reversed) {
				nodeSub.value = "Reveal";
			} else {
				nodeSub.value = "Enter";
				var nodeUserInput = document.getElementById("userInput")
				nodeUserInput.value = "";
			}
			revealed = false;
		}
	}
}