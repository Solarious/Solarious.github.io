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

function getRandom(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function genString() {
	var string = "";
	for (var i = 0; i < arguments.length; i++) {
		string += arguments[i];
	}
	return string;
}

function genStringWS() {
	var string = "";
	for (var i = 0; i < arguments.length; i++) {
		if (i != 0) {string += " ";}
		string += arguments[i];
	}
	return string;
}

function orderIsKanaToEnglish() {
	return isChecked("radioKtoE");
}

function checkedRadioNumber() {
	if (isChecked("radioKtoE")) {
		return 1;
	} else if (isChecked("radioEtoK")) {
		return 2;
	} else if (isChecked("radioSL")) {
		return 3;
	} else {
		return 0;
	}
}

// Returns an array of the ids of all the checked checkboxes in the element/div with id=id
function getAllChecked(id) {
	
}

//------------------------------------------------------

var groups = {};
groups["Chapter 3: Likes"] = generateLikes;
groups["Chapter 4: Colours"] = generateCarColours;
groups["Chapter 5: Locations"] = generateLocation;
groups["Chapter 7: Days and Months"] = generateDaysAndMonths;

var fieldsOfStudy = [
	["きょういくがく", "education"],
	["せいじがく", "politics"],
	["けいえいがく", "management"],
	["ほうりつ", "law"],
	["けいざいがく", "economics"],
	["ぶんがく", "literature"],
	["かいけいがく", "accounting"],
	["れきし", "history"],
	["アジアけんきゅう", "asian studies"],
	["にほんけんきゅう", "japanese studies"],
	["コンピュータ", "konpyuuta", "computing"],
	["にほんご", "japanese"]
];

var options = [
	["すき", "like"],
	["だいすき", "love"],
	["きらい", "dislike"],
	["だいきらい", "hate"]
];

var locationWords = [
	["うえ", "above"],
	["した", "below"],
	["まえ", "in front of"],
	["うしろ", "behind"],
	["なか", "inside"],
	["そと", "outside"],
	["みぎ", "right of"],
	["ひだり", "left of"],
	["となり", "next to"],
	["ちかく", "nearby"]
];

var nounsAnimate = [
	["あのひと", "that person"],
	["せんせい", "the teacher"],
	["ねこ", "the cat"],
	["いぬ", "the dog"],
	["さかな", "the fish"]
];

var nounsInanimate = [
	["かさ", "the umbrella"],
	["くるま", "the car"],
	["ざっし", "the magazine"],
	["しんぶん", "the newspaper"],
	["とけい", "the clock"],
	["ジャケット", "the jacket"],
	["テキスト", "the textbook"],
	["ビール", "the beer"],
	["ほん", "the book"]
];

var colours = [
	["しろ", "しろい", "white"],
	["くろ", "くろい", "black"],
	["あか", "あかい", "red"],
	["あお", "あおい", "blue"],
	["しゃいろ", "しゃいろい", "brown"],
	["みどり", "みどりの", "green"],
	["きいろ", "きいろい", "yellow"],
	["むらさき", "むらさきの", "purple"]
];

function generateLikes() {
	var noun = getRandom(fieldsOfStudy);
	var option = getRandom(options);
	
	var sentenceJap = genString(noun[0], "は", option[0], "です");
	var sentenceEng = genStringWS("I", option[1], noun[1]);
	return [sentenceJap, sentenceEng];
}

function generateLocation() {
	var animate = getRandom([true, false]);
	if (animate)
		var noun1 = getRandom(nounsAnimate);
	else
		var noun1 = getRandom(nounsInanimate);
	var noun2 = getRandom(nounsAnimate.concat(nounsInanimate));
	var location = getRandom(locationWords);
	
	if (animate) {
		var sentenceJap = genString(noun1[0], "は", noun2[0], "の", location[0], "にいます");
	} else {
		var sentenceJap = genString(noun1[0], "は", noun2[0], "の", location[0], "にあります");
	}
	var sentenceEng = genStringWS(noun1[1], "is", location[1], noun2[1]);
	return [sentenceJap, sentenceEng];
}

function generateCarColours() {
	var colour = getRandom(colours);
	
	var sentenceJapA = genString("あのくるまは", colour[0], "です");
	var sentenceEngA = genStringWS("That car is", colour[2]);
	var sentenceA = [sentenceJapA, sentenceEngA];
	
	var sentenceJapB = genString("あれは", colour[1], "くるまです");
	var sentenceEngB = genStringWS("That is a", colour[2], "car");
	var sentenceB = [sentenceJapB, sentenceEngB];
	
	return getRandom([sentenceA, sentenceB]);
}

function generateDaysAndMonths() {
	var months = words["Chapter 7: Months of the year"];
	months.shift(); // remove the first element from months
	var month = getRandom(months);
	
	var days = words["Chapter 7: Days of the month"];
	days.shift(); // remove the first element from days
	var day = getRandom(days);
	
	var sentenceJap = genStringWS(month[0], day[0]);
	var sentenceEng = genStringWS("The", day[2], "of", month[2]);
	
	return [sentenceJap, sentenceEng];
}

//------------------------------------------------------

var stage = 0;
var sentence;

var textA = "textX";
var textB = "textY";
var submitButton = "submitButton";
var playButton = "playSoundButton";
var checkBoxes = "checkBoxes";
var checkBoxGroup = "checkboxGroup";
var speechSpeedInput = "speechSpeedInput";

function setup() {
	var nodeCheckBoxes = document.getElementById(checkBoxes);
	var n = 0;
	// Each checkbox is placed into groups of npg
	var npg = 4;
	var nodeDivGroup;
	
	for (key in groups) {
		if (n%npg == 0) {
			nodeDivGroup = document.createElement("div");
			nodeDivGroup.className = checkBoxGroup;
			nodeCheckBoxes.appendChild(nodeDivGroup);
		}
		
		// Create a checkbox with id = word group name i.e. "Chapter 3: Likes", then adds it to nodeDivGroup
		var nodeInput = document.createElement("input");
		nodeInput.type = "checkbox";
		nodeInput.id = key;
		nodeDivGroup.appendChild(nodeInput);
		
		// Creates a label for the checkbox
		var nodeLabel = document.createElement("label");
		nodeLabel.htmlFor = key;
		nodeLabel.textContent = key;
		nodeDivGroup.appendChild(nodeLabel);
		
		// Adds a line break element
		nodeDivGroup.appendChild(document.createElement("br"));
		
		n++;
	}
}

// Stage 0: textA and textB both empty (exercise not started yet) or both contain text (answer revealed, press next button for next question)
// Stage 1: With (Hiragana/Katakana to English)/(English to Hiragana/Katakana) textA contains text. With Sentence Listening, text boxes are empty

function next() {
	if (stage == 0) {
		setElementText(textA, "");
		setElementText(textB, "");
		
		var selection = []
		for (key in groups) {
			if (document.getElementById(key).checked) {
				selection.push(key);
			}
		}
		
		if (selection.length == 0) {
			setElementText(textA, "Select at least one");
			setElementText(textB, "word group");
			return false;
		}
		
		var fun = groups[getRandom(selection)];
		sentence = fun();
		
		if (checkedRadioNumber() == 1) {
			setElementText(textA, sentence[0]);
			getElement(playButton).disabled = true;
		} else if (checkedRadioNumber() == 2) {
			setElementText(textA, sentence[1]);
			getElement(playButton).disabled = true;
		} else if (checkedRadioNumber() == 3) {
			setElementText(textA, "");
			setElementText(textB, "");
			playWord();
		}
		setElementValue("submitButton", "Reveal");
		
		stage = 1;
	} else {
		if (checkedRadioNumber() == 1) {
			setElementText(textB, sentence[1]);
			getElement(playButton).disabled = true;
		} else if (checkedRadioNumber() == 2) {
			setElementText(textB, sentence[0]);
			getElement(playButton).disabled = true;
		} else if (checkedRadioNumber() == 3) {
			setElementText(textA, sentence[0]);
			setElementText(textB, sentence[1]);
		}
		setElementValue("submitButton", "Next");
		
		stage = 0;
	}
}

// Called when the playWord button is pressed
function playWord() {
	getElement(submitButton).disabled = true;
	getElement(playButton).disabled = true;
	var speed = getElement(speechSpeedInput).value;
	speakJap(sentence[0], speed, onAudioEnd);
}

function onAudioEnd() {
	getElement(submitButton).disabled = false;
	getElement(playButton).disabled = false;
}