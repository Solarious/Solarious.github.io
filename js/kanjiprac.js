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

function getHiragana(wordGroup) {
	return wordGroup[0];
}

function getKanji(wordGroup) {
	return wordGroup[1];
}

function orderHiraganaToKanji() {
	if (isChecked("radioHtoK")) {
		return true;
	} else if (isChecked("radioKtoH")) {
		return false;
	}
}


// a subset of kanji. Contains all the words from the word groups selected by the user
var tuples;
// the number of the next word-tuple in wordTuples
var num;
// The current stage of the program
var stage;
var checkBoxesAdded = false;
var textA = "textX";
var textB = "textY";
var submitButton = "submitButton";
var checkBoxes = "checkBoxes";
var checkBoxGroup = "checkboxGroup";

// Called when body loads
function setup() {
	nextKanjiNum = -1;
	stage = 0;
	setElementText(textA, "");
	setElementText(textB, "");
	setElementValue(submitButton, "Start");
	if (!checkBoxesAdded) {
		addCheckBoxes();
		checkBoxesAdded = true;
	}
}

function addCheckBoxes() {
	var parts = [];
	// Converts kanji into an array
	for (part in kanji) {
		parts.push(part);
	}
	
	var nodeCheckBoxes = getElement(checkBoxes);
	// Each checkbox is placed into groups of npg
	var npg = 4;
	var nodeDivGroup;
	
	for (n in parts) {
		if (n%npg == 0) {
			nodeDivGroup = document.createElement("div");
			nodeDivGroup.className = checkBoxGroup;
			nodeCheckBoxes.appendChild(nodeDivGroup);
		}
		
		// Create a checkbox with id = word group name i.e. "Chapter 1: Basic", then adds it to nodeDivGroup
		var nodeInput = document.createElement("input");
		nodeInput.type = "checkbox";
		nodeInput.id = parts[n];
		nodeDivGroup.appendChild(nodeInput);
		
		// Creates a label for the checkbox
		var nodeLabel = document.createElement("label");
		nodeLabel.htmlFor = nodeInput.id;
		nodeLabel.textContent = nodeInput.id;
		nodeDivGroup.appendChild(nodeLabel);
		
		// Adds a line break element
		nodeDivGroup.appendChild(document.createElement("br"));
	}
}

// Called when start button is pressed at stage 0 or 10, or when the restart button is pressed
function start() {
	// Empty tuples, then add to it all the kanji that have their checkbox selected
	tuples = [];
	for (key in kanji) {
		if (getElement(key).checked) {
			for (i in kanji[key]) {
				var group = [];
				for (j in kanji[key][i]) {
					group.push(kanji[key][i][j]);
				}
				tuples.push(group);
			}
		}
	}
	
	if (tuples.length == 0) {
		setElementText(textA, "Select at least one");
		setElementText(textB, "kanji group");
		return false;
	}
	tuples = shuffle(tuples);
	num = 0;
	stage = 1;
	if (orderHiraganaToKanji()) {
		setElementText(textA, getHiragana(tuples[num]));
	} else {
		setElementText(textA, getKanji(tuples[num]));
	}
	setElementText(textB, "");
	setElementValue(submitButton, "Reveal");
}

// When orderHiraganaToKanji() = true
// Stage 0: all text boxes empty, game not started yet
// Stage 1: textA contains hiragana
// Stage 2: textB contains kanji
// Stage 10: Text boxes contain "complete"

// When orderHiraganaToKanji() = false
// Stage 0: all text boxes empty, game not started yet
// Stage 1: textA contains Kanji
// Stage 2: textB contains Hiragana
// Stage 10: Text boxes contain "complete"

// Called when the next button is pressed
function next() {
	if (orderHiraganaToKanji()) {
		nextHiraganaToKanji();
	} else {
		nextKanjiToHiragana();
	}
}

function nextHiraganaToKanji() {
	if (stage == 0) {
		if (start()) {
			stage = 1;
		}
	} else if (stage == 1) {
		stage = 2;
		
		setElementText(textB, getKanji(tuples[num]));
		setElementValue(submitButton, "Next");
	} else if (stage == 2) {
		stage = 1;
		num++;
		
		if (num >= tuples.length) {
			setElementText(textA, "Complete");
			setElementText(textB, "Press Start to try again");
			setElementValue(submitButton, "Start");
			stage = 0;
			return;
		}
		
		setElementText(textA, getHiragana(tuples[num]));

		setElementText(textB, "");
		setElementValue(submitButton, "Reveal");
	}
}

function nextKanjiToHiragana() {
	if (stage == 0) {
		if (start()) {
			stage = 1;
		}
	} else if (stage == 1) {
		stage = 2;
		
		setElementText(textB, getHiragana(tuples[num]));
		setElementValue(submitButton, "Next");
	} else if (stage == 2) {
		stage = 1;
		num++;
		
		if (num >= tuples.length) {
			setElementText(textA, "Complete");
			setElementText(textB, "Press Start to try again");
			setElementValue(submitButton, "Start");
			stage = 0;
			return;
		}
		
		setElementText(textA, getKanji(tuples[num]));

		setElementText(textB, "");
		setElementValue(submitButton, "Reveal");
	}
}