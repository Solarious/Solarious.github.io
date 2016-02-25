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

function setElementValue(id, text) {
	document.getElementById(id).value = text;
}

function getElement(id) {
	return document.getElementById(id);
}

function isChecked(id) {
	var element = document.getElementById(id);
	if (element == null) return false;
	return document.getElementById(id).checked;
}

function getHiragana(sound) {
	return sound[1];
}

function getKatakana(sound) {
	return sound[2];
}

function getKana(sound) {
	if (useKatakana)
		return sound[2];
	else
		return sound[1];
}

function getRomaji(sound) {
	return sound[0];
}

var sounds = {};

sounds["idVowels"] = [['a', 'あ', 'ア'], ['i', 'い', 'イ'], ['u', 'う', 'ウ'], ['e', 'え', 'エ'], ['o', 'お', 'オ']];
sounds["idK"] = [['ka', 'か', 'カ'], ['ki', 'き', 'キ'], ['ku', 'く', 'ク'], ['ke', 'け', 'ケ'], ['ko', 'こ', 'コ']];
sounds["idS"] = [['sa', 'さ', 'サ'], ['shi', 'し', 'シ'], ['su', 'す', 'ス'], ['se', 'せ', 'セ'], ['so', 'そ', 'ソ']];
sounds["idT"]= [['ta', 'た', 'タ'], ['chi', 'ち', 'チ'], ['tsu', 'つ', 'ツ'], ['te', 'て', 'テ'], ['to', 'と', 'ト']];
sounds["idN"] = [['na', 'な', 'ナ'], ['ni', 'に', 'ニ'], ['nu', 'ぬ', 'ヌ'], ['ne', 'ね', 'ネ'], ['no', 'の', 'ノ']];
sounds["idH"] = [['ha', 'は', 'ハ'], ['hi', 'ひ', 'ヒ'], ['fu', 'ふ', 'フ'], ['he', 'へ', 'ヘ'], ['ho', 'ほ', 'ホ']];
sounds["idM"] = [['ma', 'ま', 'マ'], ['mi', 'み', 'ミ'], ['mu', 'む', 'ム'], ['me', 'め', 'メ'], ['mo', 'も', 'モ']];
sounds["idY"] = [['ya', 'や', 'ヤ'], ['yu', 'ゆ', 'ユ'], ['yo', 'よ', 'ヨ']];
sounds["idR"] = [['ra', 'ら', 'ラ'], ['ri', 'り', 'リ'], ['ru', 'る', 'ル'], ['re', 'れ', 'レ'], ['ro', 'ろ', 'ロ']];
sounds["idW"] = [['wa', 'わ', 'ワ'], ['wo', 'を', 'ヲ'], ['n', 'ん', 'ン']];

sounds["idG"] = [['ga', 'が', 'ガ'], ['gi', 'ぎ', 'ギ'], ['gu', 'ぐ', 'グ'], ['ge', 'げ', 'ゲ'], ['go', 'ご', 'ゴ']];
sounds["idZ"] = [['za', 'ざ', 'ザ'], ['ji', 'じ', 'ジ'], ['zu', 'ず', 'ズ'], ['ze', 'ぜ', 'ゼ'], ['zo', 'ぞ', 'ゾ']];
sounds["idD"] = [['da', 'だ', 'ダ'], ['de', 'で', 'デ'], ['do', 'ど', 'ド']];
sounds["idB"] = [['ba', 'ば', 'バ'], ['bi', 'び', 'ビ'], ['bu', 'ぶ', 'ブ'], ['be', 'べ', 'ベ'], ['bo', 'ぼ', 'ボ']];
sounds["idP"] = [['pa', 'ぱ', 'パ'], ['pi', 'ぴ', 'ピ'], ['pu', 'ぷ', 'プ'], ['pe', 'ぺ', 'ペ'], ['po', 'ぽ', 'ポ']];

function showAlert(message) {
	return function () {alert(message)};
}

function doNothing() {
	return;
}

function setClassCheckedToSelf(className) {
	return function (event) {
		event = event || window.event;
		var checkboxes = document.getElementsByClassName(className);
		for (var i = 0; i < checkboxes.length; i++) {
			checkboxes[i].checked = event.target.checked;
		}
	}
}

function setUncheckedIfSelfUnchecked(id) {
	return function (event) {
		event = event || window.event;
		if (!event.target.checked) {
			getElement(id).checked = false;
		}
	}
}

// if event.target is unchecked, set element with given id to checked=false.
// else (is checked), if all elements in class className are checked,
// set element with given id to checked=true.
function complicatedEventHandler(id, className) {
	return function (event) {
		event = event || window.event;
		if (!event.target.checked) {
			getElement(id).checked = false;
		} else {
			var checkboxes = document.getElementsByClassName(className);
			var allChecked = true;
			for (var i = 0; i < checkboxes.length; i++) {
				if (!checkboxes[i].checked) {
					allChecked = false;
				}
			}
			if (allChecked) {
				getElement(id).checked = true;
			}
		}
	}
}

function hideShowText() {
	var labels = document.getElementsByTagName("label");
	var value = getElement("idHideText").checked;
	
	for (var i = 0; i < labels.length; i++) {
		if (labels[i].className != "classDoNotHideThisLabel") {
			labels[i].hidden = value;
		}
	}
	
	updateLabelsHK();
}

/*function hideTextIfBoxSelected() {
	if (getElement("idHideText").checked) {
		var labels = document.getElementsByTagName("label");
		for (var i = 0; i < labels.length; i++) {
			if (labels[i].className != "classDoNotHideThisLabel") {
				labels[i].hidden = true
			}
		}
	}
}*/

function updateLabelsHK() {
	if (getElement("idHideText").checked) {
		return;
	}
	
	var hValue = getElement("radioH").checked;
	var kValue = getElement("radioK").checked;
	
	useKatakana = kValue;
	
	var labelsH = document.getElementsByClassName("classH");
	for (var i = 0; i < labelsH.length; i++) {
		labelsH[i].hidden = !hValue;
	}
	
	var labelsK = document.getElementsByClassName("classK");
	for (var i = 0; i < labelsK.length; i++) {
		labelsK[i].hidden = !kValue;
	}
	
	updateHeader();
}

function updateHeader() {
	var hkText = getElement("radioH").checked ? "Hiragana" : "Katakana";
	if (getElement("radioKtoR").checked) {
		setElementText("idHeader1", hkText + " to Romaji");
	} else {
		setElementText("idHeader1", "Romaji to " + hkText);
	}
}

function updateOrder() {
	if (getElement("radioKtoR").checked) {
		getElement(userInput).hidden = false;
		orderRomajiToKana = false;
		setElementText("idInstructions", "Type the rōmaji:");
	} else {
		getElement(userInput).hidden = true;
		orderRomajiToKana = true;
		setElementText("idInstructions", "This Exercise is designed to be used along with a pen and paper. As each romaji appears, write down the correct Kana");
		getElement(textB).style.color = "#000000";
		setElementText(numCorrectArea, "");
	}
	
	updateHeader()
}

function addCheckBox(parent, id, className, onChange, labelText, labelTextHiragana, labelTextKatakana) {
	labelTextHiragana = labelTextHiragana || "";
	labelTextKatakana = labelTextKatakana || "";
	
	var cb = document.createElement("input");
	cb.type = "checkbox";
	cb.id = id;
	cb.className = className;
	cb.addEventListener("change", onChange, true);
	
	var cbLabel = document.createElement("label");
	cbLabel.htmlFor = id;
	cbLabel.textContent = labelText;
	
	var cbLabelHiragana = document.createElement("label");
	cbLabelHiragana.htmlFor = id;
	cbLabelHiragana.className = "classH";
	cbLabelHiragana.textContent = (labelTextHiragana != "") ? " (" + labelTextHiragana + ")" : "";
	
	var cbLabelKatanana = document.createElement("label");
	cbLabelKatanana.htmlFor = id;
	cbLabelKatanana.className = "classK";
	cbLabelKatanana.textContent = (labelTextKatakana != "") ? " (" + labelTextKatakana + ")" : "";
	
	parent.appendChild(cb);
	parent.appendChild(cbLabel);
	parent.appendChild(cbLabelHiragana);
	parent.appendChild(cbLabelKatanana);
}

function addCheckBoxInLI(ul, id, className, onChange, labelText, labelTextHiragana, labelTextKatakana) {
	var li = document.createElement("li");
	addCheckBox(li, id, className, onChange, labelText, labelTextHiragana, labelTextKatakana);
	ul.appendChild(li);
}

function createCheckboxes(id1, id2) {
	var divNode = getElement(id1);
	
	addCheckBox(divNode, "idAllBasic", "", setClassCheckedToSelf("classBasic"), "All Basic");
	
	var allBasicUL = document.createElement("ul");
	allBasicUL.id = "idUlBasic";
	divNode.appendChild(allBasicUL);
	
	addCheckBoxInLI(allBasicUL, "idVowels", "classBasic", complicatedEventHandler("idAllBasic", "classBasic"), "a i u e o", "あいうえお", "アイウエオ");
	addCheckBoxInLI(allBasicUL, "idK", "classBasic", complicatedEventHandler("idAllBasic", "classBasic"), "ka ki ku ke ko", "かきくけこ", "カキクケコ");
	addCheckBoxInLI(allBasicUL, "idS", "classBasic", complicatedEventHandler("idAllBasic", "classBasic"), "sa shi su se so", "さしすせそ", "サシスセソ");
	addCheckBoxInLI(allBasicUL, "idT", "classBasic", complicatedEventHandler("idAllBasic", "classBasic"), "ta chi tsu te to", "たちつてと", "タチツテト");
	addCheckBoxInLI(allBasicUL, "idN", "classBasic", complicatedEventHandler("idAllBasic", "classBasic"), "na ni nu ne no", "なにぬねの", "ナニヌネノ");
	addCheckBoxInLI(allBasicUL, "idH", "classBasic", complicatedEventHandler("idAllBasic", "classBasic"), "ha hi fu he ho", "はひふへほ", "ハヒフヘホ");
	addCheckBoxInLI(allBasicUL, "idM", "classBasic", complicatedEventHandler("idAllBasic", "classBasic"), "ma mi mu me mo", "まみむめも", "マミムメモ");
	addCheckBoxInLI(allBasicUL, "idY", "classBasic", complicatedEventHandler("idAllBasic", "classBasic"), "ya yu yo", "やゆよ", "ヤユヨ");
	addCheckBoxInLI(allBasicUL, "idR", "classBasic", complicatedEventHandler("idAllBasic", "classBasic"), "ra ri ru re ro", "らりるれろ", "ラリルレロ");
	addCheckBoxInLI(allBasicUL, "idW", "classBasic", complicatedEventHandler("idAllBasic", "classBasic"), "wa wo n", "わをん", "ワヲン");
	
	divNode = document.getElementById(id2);
	
	addCheckBox(divNode, "idAllDandH", "", setClassCheckedToSelf("classDandH"), "All Dakuten/Handakuten");
	
	var allDandHUL = document.createElement("ul");
	allDandHUL.id = "idUlDandH";
	divNode.appendChild(allDandHUL);
	
	addCheckBoxInLI(allDandHUL, "idG", "classDandH", complicatedEventHandler("idAllDandH", "classDandH"), "ga gi gu ge go", "がぎぐげご", "ガギグゲゴ");
	addCheckBoxInLI(allDandHUL, "idZ", "classDandH", complicatedEventHandler("idAllDandH", "classDandH"), "za ji zu ze zo", "ざじずぜぞ", "ザジズゼゾ");
	addCheckBoxInLI(allDandHUL, "idD", "classDandH", complicatedEventHandler("idAllDandH", "classDandH"), "da de do", "だでど", "ダデド");
	addCheckBoxInLI(allDandHUL, "idB", "classDandH", complicatedEventHandler("idAllDandH", "classDandH"), "ba bi bu be bo", "ばびぶべぼ", "バビブベボ");
	addCheckBoxInLI(allDandHUL, "idP", "classDandH", complicatedEventHandler("idAllDandH", "classDandH"), "pa pi pu pe po", "ぱぴぷぺぽ", "パピプペポ");
}

var tuples; // an array of [romanji, hiragana, katakana] 'objects'
var num; // part of tuples we are up to
var stage;
var numCorrect;
var numTotal;
var useKatakana = false;
var orderRomajiToKana = false;
var checkBoxesAdded = false;

var textA = "textA";
var textB = "textB";
var submitButton = "submitButton";
var numCorrectArea = "numCorrect";
var userInput = "userInput";

function setup() {
	if (!checkBoxesAdded) {
		createCheckboxes("checkboxesDiv1", "checkboxesDiv2");
		checkBoxesAdded = true;
	}
	updateLabelsHK();
	
	num = -1;
	stage = 0;
	numCorrect = 0;
	numTotal = 0;
	setElementText(textA, " ");
	setElementText(textB, " ");
	if (!orderRomajiToKana)
		setElementText(numCorrectArea, "");
	setElementValue(submitButton, "Start");
}

function start() {
	tuples = [];
	for (var key in sounds) {
		if (isChecked(key)) {
			tuples = tuples.concat(sounds[key]);
		}
	}
	
	if (tuples.length == 0) {
		setElementText(textA, "Select at least one word group");
		setElementText(textB, " ");
		return;
	}
	
	tuples = shuffle(tuples)
	num = 0;
	stage = 1;
	numCorrect = 0;
	numTotal = 0;
	if (orderRomajiToKana) {
		setElementText(textA, getRomaji(tuples[num]));
		setElementValue(submitButton, "Reveal");
	} else {
		setElementText(textA, getKana(tuples[num]));
		setElementValue(submitButton, "Enter");
	}
	setElementText(textB, " ");
	setElementText(numCorrectArea, "");
}

// when orderRomajiToKana is true:
// Stage 0: all text boxes empty, game not started yet || Text boxes contain "complete"
// Stage 1: textA contains romaji
// Stage 2: textA contains romaji, textB contains hiragana/katakana

// when orderRomajiToKana is false:
// Stage 0: all text boxes empty, game not started yet || Text boxes contain "complete"
// Stage 1: textA contains hiragana/katakana, score displayed
// Stage 2: textA contains hiragana/katakana, textB contains romaji, score displayed

// Called when the next button is pressed
function next() {
	if (stage == 0) {
		start();
	} else if (orderRomajiToKana) {
		romajiToKanaNext();
	} else {
		kanaToRomajiNext();
	}
}

function romajiToKanaNext() {
	if (stage == 1) {
		stage = 2;
		
		setElementText(textA, getRomaji(tuples[num]));
		setElementText(textB, getKana(tuples[num]));
		setElementValue(submitButton, "Next");
	} else if (stage == 2) {
		stage = 1;
		num++;
		
		if (num >= tuples.length) {
			setElementText(textA, "Complete, press Start to try again");
			setElementText(textB, " ");
			setElementValue(submitButton, "Start");
			stage = 0;
			return;
		}
		
		setElementText(textA, getRomaji(tuples[num]));
		setElementText(textB, " ");
		setElementValue(submitButton, "Reveal");
	}
}

function kanaToRomajiNext() {
	if (stage == 1) {
		stage = 2;
		
		setElementText(textA, getKana(tuples[num]));
		setElementText(textB, getRomaji(tuples[num]));
		setElementValue(submitButton, "Next");
		
		if (getElement(userInput).value == getRomaji(tuples[num])) {
			getElement(textB).style.color = "#00FF00";
			numCorrect++;
		} else {
			getElement(textB).style.color = "#FF0000";
		}
		numTotal++;
		var text = "" + numCorrect + " out of " + numTotal + " correct";
		setElementText(numCorrectArea, text);
	} else if (stage == 2) {
		stage = 1;
		num++;
		
		if (num >= tuples.length) {
			setElementText(textA, "Complete, press Start to try again");
			setElementText(textB, " ");
			setElementValue(submitButton, "Start");
			setElementValue(userInput, "");
			stage = 0;
			return;
		}
		
		setElementText(textA, getKana(tuples[num]));
		setElementText(textB, " ");
		setElementValue(submitButton, "Enter");
		setElementValue(userInput, "");
	}
}