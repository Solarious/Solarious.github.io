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
var tuples;
// the number of the next word-tuple in wordTuples
var num;
// The current stage of the program
var stage;
var checkBoxesAdded = false;
var textA = "textX";
var textB = "textY";
var textC = "textZ";
var submitButton = "submitButton";
var checkBoxes = "checkBoxes";
var checkBoxGroup = "checkboxGroup";
var useKanji = "useKanji";
var showRomajiKana = "showRomajiKana"
var orderKanaToEnglish = true;

// Called when body loads
function setup() {
	nextWordNum = -1;
	stage = 0;
	setElementText(textA, "");
	setElementText(textB, "");
	setElementText(textC, "");
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
	if (orderKanaToEnglish) {
		if (isChecked(useKanji) && hasKanji(tuples[num])) {
			setElementText(textA, getKanji(tuples[num]));
		} else {
			setElementText(textA, getHiragana(tuples[num]));
		}
	} else {
		setElementText(textA, getEnglish(tuples[num]));
	}
	setElementText(textB, "");
	setElementText(textC, "");
	setElementValue(submitButton, "Reveal");
	setElementValue(showRomajiKana, "Show Romaji");
}

// When orderKanaToEnglish = true
// Stage 0: all text boxes empty, game not started yet
// Stage 1: textA contains kanji or hiragana/katakana, depending on if useKanji is check and if kanji is available
// Stage 2: only entered if useKanji is checked and kanji is available. textA contains kanji. textB contains hiragana/katakana
// Stage 3: textC contains English. textA and textB text boxes retain previous contents
// Stage 10: Text boxes contain "complete"

// When orderKanaToEnglish = false
// Stage 0: all text boxes empty, game not started yet
// Stage 1: textA contains English
// Stage 2: textB contains Kanji or Hiragana/katakana
// Stage 3: only entered if textB contains Kanji. TextC contains hiragana
// Stage 10: Text boxes contain "complete"

// Called when the next button is pressed
function next() {
	if (orderKanaToEnglish) {
		nextKanaToEnglish();
	} else {
		nextEnglishToKana();
	}
}

function nextKanaToEnglish() {
	if (stage == 0) {
		if (start()) {
			stage = 1;
		}
	} else if (stage == 1) {
		stage = 2;
		
		// if using kanji is true, and the current word group has kanji, continue
		// otherwise go to stage 2 and call next()
		if (!(isChecked(useKanji) && hasKanji(tuples[num]))) {
			return next();
		}
		
		setElementText(textB, getHiragana(tuples[num]));
		setElementValue(submitButton, "Reveal");
	} else if (stage == 2) {
		stage = 3;
		
		setElementText(textC, getEnglish(tuples[num]));
		setElementValue(submitButton, "Next");
	} else if (stage == 3) {
		stage = 1;
		num++;
		
		if (num >= tuples.length) {
			setElementText(textA, "Complete");
			setElementText(textB, "Press Start to");
			setElementText(textC, "try again");
			setElementValue(submitButton, "Start");
			stage = 0;
			return;
		}
		
		if (isChecked(useKanji) && hasKanji(tuples[num])) {
			setElementText(textA, getKanji(tuples[num]));
		} else {
			setElementText(textA, getHiragana(tuples[num]));
		}
		setElementText(textB, "");
		setElementText(textC, "");
		setElementValue(submitButton, "Reveal");
		setElementValue(showRomajiKana, "Show Romaji");
	}
}

function nextEnglishToKana() {
	if (stage == 0) {
		if (start()) {
			stage = 1;
		}
	} else if (stage == 1) {
		stage = 2;
		
		if (isChecked(useKanji) && hasKanji(tuples[num])) {
			setElementText(textB, getKanji(tuples[num]));
			setElementValue(submitButton, "Reveal");
		} else {
			setElementText(textB, getHiragana(tuples[num]));
			setElementValue(submitButton, "Next");
		}
	} else if (stage == 2) {
		stage = 3;
		
		// if using kanji is true, and the current word group has kanji, continue
		// otherwise go to stage 3 and call next()
		if (isChecked(useKanji) && hasKanji(tuples[num])) {
			//in case useKanji is selected between stages 2 and 3
			setElementText(textB, getKanji(tuples[num]));
			setElementText(textC, getHiragana(tuples[num]));
			setElementValue(submitButton, "Next");
			setElementValue(showRomajiKana, "Show Romaji");
		} else {
			return next();
		}		
	} else if (stage == 3) {
		stage = 1;
		num++;
		
		if (num >= tuples.length) {
			setElementText(textA, "Complete");
			setElementText(textB, "Press Start to");
			setElementText(textC, "try again");
			setElementValue(submitButton, "Start");
			stage = 0;
			return;
		}
		
		setElementText(textA, getEnglish(tuples[num]));
		setElementText(textB, "");
		setElementText(textC, "");
		setElementValue(submitButton, "Reveal");
		setElementValue(showRomajiKana, "Show Romaji");
	}
}

// fuction for when the showRomajiKana button is pressed when orderKanaToEnglish is true
function showRomajiA() {
	if (stage == 1 || stage == 2 || stage == 3) {
		var romaji = getRomaji(tuples[num]);
		if (getElement(textB).textContent == romaji) {
			// If textA already has romaji
			
			if (isChecked(useKanji) && hasKanji(tuples[num])) {
				// If kanji in textA, switch back to hiragana
				setElementText(textB, getHiragana(tuples[num]));
				setElementValue(showRomajiKana, "Show Romaji");
			} else {
				// If not kanji in texA, make empty
				setElementText(textB, "");
			}
		} else {
			// if textA is empty or has hiragana/katakana
			setElementText(textB, romaji);
			if (isChecked(useKanji) && hasKanji(tuples[num])) {
				setElementValue(showRomajiKana, "Show Kana");
			} else {
				setElementValue(showRomajiKana, "Hide Romaji");
			}
		}
	}
}

// fuction for when the showRomajiKana button is pressed when orderKanaToEnglish is false
function showRomajiB() {
	if (stage == 1 || stage == 2) {
		if (getElement(textC).textContent == "") {
			// if textC is empty, show romaji
			setElementText(textC, getRomaji(tuples[num]));
			setElementValue(showRomajiKana, "Hide Romaji");
		} else {
			// if textC contains romaji, hide it
			setElementText(textC, "");
			setElementValue(showRomajiKana, "Show Romaji");
		}
	} else if (stage == 3) {
		var romaji = getRomaji(tuples[num]);
		if (getElement(textC).textContent == romaji) {
			setElementText(textC, getHiragana(tuples[num]));
			setElementValue(showRomajiKana, "Show Romaji");
		} else {
			setElementText(textC, getRomaji(tuples[num]));
			setElementValue(showRomajiKana, "Show Kana");
		}
	}
}