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

function getRomaji(wordGroup) {
	return wordGroup[1];
}

function getEnglish(wordGroup) {
	return wordGroup[2];
}

function getKanji(wordGroup) {
	return wordGroup[3];
}

function hasKanji(wordGroup) {
	return wordGroup.length > 3;
}


// a subset of words. Contains all the words from the word groups selected by the user
var wordTuples;
// the number of the next word-tuple in wordTuples
var num;
// The current stage of the program
var stage;
var checkBoxesAdded = false;
var textA = "textX";
var textB = "textY";
var textC = "textZ";
var submitButton = "submitButton";
var playButton = "playSoundButton";
var checkBoxes = "checkBoxes";
var checkBoxGroup = "checkboxGroup";
var orderKanaToEnglish = true;

// Called when body loads
function setup() {
	nextWordNum = -1;
	stage = 0;
	setElementText(textA, "");
	setElementText(textB, "");
	setElementText(textC, "");
	getElement(submitButton).disabled = false;
	getElement(playButton).disabled = true;
	setElementValue(submitButton, "Start");
	if (!checkBoxesAdded) {
		addCheckBoxes();
		checkBoxesAdded = true;
	}
}

function addCheckBoxes() {
	var parts = [];
	// Converts words into an array
	for (part in words) {
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
	// Empty tuples, then add to it all the words that have their checkbox selected
	tuples = [];
	for (key in words) {
		if (getElement(key).checked) {
			for (i in words[key]) {
				var group = [];
				for (j in words[key][i]) {
					group.push(words[key][i][j]);
				}
				tuples.push(group);
			}
		}
	}
	
	if (tuples.length == 0) {
		setElementText(textA, "Select at least one");
		setElementText(textB, "word group");
		return false;
	}
	tuples = shuffle(tuples);
	num = 0;
	stage = 1;
	
	setElementText(textA, "");
	setElementText(textB, "");
	setElementText(textC, "");
	setElementValue(submitButton, "Reveal");
	getElement(submitButton).disabled = false;
	getElement(playButton).disabled = false;
	
	return true;
}

// Stage 0: all text boxes empty, game not started yet
// Stage 1: textA contains "Press play word button"
// Stage 2: textA/textB contains Kanji/Hiragana/katakana, textC contains english
// Stage 10: Text boxes contain "complete"

// Called when the next button is pressed
function next() {
	if (stage == 0) {
		if (start()) {
			stage = 1;
			playWord();
		}
	} else if (stage == 1) {
		stage = 2
		
		if (hasKanji(tuples[num])) {
			setElementText(textA, getKanji(tuples[num]));
			setElementText(textB, getHiragana(tuples[num]));
			setElementValue(submitButton, "Next");
		} else {
			setElementText(textA, getHiragana(tuples[num]));
			setElementText(textB, "");
		}
		setElementText(textC, getEnglish(tuples[num]));
		setElementValue(submitButton, "Next");
	} else if (stage == 2) {
		stage = 1;
		num++;
		
		if (num >= tuples.length) {
			setElementText(textA, "Complete");
			setElementText(textB, "Press Start to");
			setElementText(textC, "try again");
			setElementValue(submitButton, "Start");
			getElement(submitButton).disabled = false;
			getElement(playButton).disabled = true;
			stage = 0;
			return;
		}
		
		setElementText(textA, "");
		setElementText(textB, "");
		setElementText(textC, "");
		setElementValue(submitButton, "Reveal");
		getElement(submitButton).disabled = false;
		getElement(playButton).disabled = false;
		playWord();
	}
}

// Called when the playWord button is pressed
function playWord() {
	getElement(submitButton).disabled = true;
	getElement(playButton).disabled = true;
	if (hasKanji(tuples[num])) {
		speakJap(getKanji(tuples[num]), onAudioEnd);
	} else {
		speakJap(getHiragana(tuples[num]), onAudioEnd);
	}
}

function onAudioEnd() {
	getElement(submitButton).disabled = false;
	getElement(playButton).disabled = false;
}