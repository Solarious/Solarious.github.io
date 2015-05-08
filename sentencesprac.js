function setElementText(id, text) {
	document.getElementById(id).textContent = text;
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

// Returns an array of the ids of all the checked checkboxes in the element/div with id=id
function getAllChecked(id) {
	
}

//------------------------------------------------------

var groups = {};
groups["Chapter 3: Likes"] = generateLikes;
groups["Chapter 4: Colours"] = generateCarColours;
groups["Chapter 5: Locations"] = generateLocation;

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

//------------------------------------------------------

function setup() {
	var nodeTextBoxes = document.getElementById("checkBoxes");
	var n = 0;
	var npg = 4;
	var nodeDivGroup;
	for (key in groups) {
		if (n%npg == 0) {
			nodeDivGroup = document.createElement("div");
			nodeDivGroup.className = "checkboxGroup";
		}
		var nodeInput = document.createElement("input");
		nodeInput.setAttribute("type", "checkbox");
		nodeInput.setAttribute("id", key);
		nodeDivGroup.appendChild(nodeInput);
		var nodeLabel = document.createElement("label");
		nodeLabel.setAttribute("for", key);
		nodeLabel.textContent = key;
		nodeDivGroup.appendChild(nodeLabel);
		nodeDivGroup.appendChild(document.createElement("br"));
		
		if (n%npg == npg-1) {
			nodeTextBoxes.appendChild(nodeDivGroup);
		}
		n++;
	}
	if (n%npg != 0) {
		nodeTextBoxes.appendChild(nodeDivGroup);
	}
}

var stage = 0;
var sentence;

function next() {
	if (stage == 0) {
		setElementText("textX", "");
		setElementText("textY", "");
		
		var selection = []
		for (key in groups) {
			if (document.getElementById(key).checked) {
				selection.push(key);
			}
		}
		
		if (selection.length == 0) {
			setElementText("textX", "Select at least one");
			setElementText("textY", "word group");
			return false;
		}
		
		var fun = groups[getRandom(selection)];
		sentence = fun();
		
		if (orderIsKanaToEnglish()) {
			setElementText("textX", sentence[0]);
		} else {
			setElementText("textX", sentence[1]);
		}
		
		stage = 1;
	} else {
		if (orderIsKanaToEnglish()) {
			setElementText("textY", sentence[1]);
		} else {
			setElementText("textY", sentence[0]);
		}
		
		stage = 0;
	}
}