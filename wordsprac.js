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

var tuples;
var num; // part of tuples we are up to
var stage; // true is textB has text in it, false if empty
var numCorrect;
var numTotal;
var checkBoxesAdded = false;
var wordMeaningsOnly = false;
var reversed = false;

function setup() {
	num = -1;
	stage = 0;
	numCorrect = 0;
	numTotal = 0;
	if (!reversed) {
		wordMeaningsOnly = document.getElementById("wmoCheckbox").checked;
		document.getElementById("userInput").disabled = wordMeaningsOnly;
	}
	setElementText("textX", " ");
	setElementText("textY", " ");
	document.getElementById("textY").style.color = "#000000";
	setElementText("textZ", " ");
	setElementText("numCorrect", "");
	var nodeSub = document.getElementById("submitButton");
	nodeSub.value = "Start";
	
	if (!checkBoxesAdded) {
		checkBoxesAdded = true;
		
		//TODO: make parts sorted by chapter
		var parts = [];
		for (part in words) {
			parts.push(part);
		}
		// note: property in object operator exits
		
		//TODO: sort parts if needed.
		var nodeTextBoxes = document.getElementById("checkBoxes");
		var iter = true;
		var n = 0;
		var npg = 4;
		var nodeDivGroup;
		for (key in parts) {
			if (n%npg == 0) {
				nodeDivGroup = document.createElement("div");
				nodeDivGroup.className = "checkboxGroup";
			}
			var nodeInput = document.createElement("input");
			nodeInput.setAttribute("type", "checkbox");
			nodeInput.setAttribute("id", parts[key]);
			/*if (iter) {
				iter = false;
				nodeInput.setAttribute("checked", true);
			}*/
			//nodeTextBoxes.appendChild(nodeInput);
			nodeDivGroup.appendChild(nodeInput);
			var nodeLabel = document.createElement("label");
			nodeLabel.setAttribute("for", parts[key]);
			nodeLabel.textContent = parts[key];
			//nodeTextBoxes.appendChild(nodeLabel);
			nodeDivGroup.appendChild(nodeLabel);
			//nodeTextBoxes.appendChild(document.createElement("br"));
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
}

function start() {
	tuples = [];
	for (i in words) {
		if (document.getElementById(i).checked) {
			for (j in words[i]) {
				tuples.push([words[i][j][0], words[i][j][1], words[i][j][2]]);
			}
		}
	}
	if (tuples.length == 0) {
		setElementText("textX", "Select at least one");
		setElementText("textY", "word group");
		return false;
	}
	tuples = shuffle(tuples);
	num = 0;
	stage = 1;
	numCorrect = 0;
	numTotal = 0;
	if (!reversed) {
		wordMeaningsOnly = document.getElementById("wmoCheckbox").checked;
		document.getElementById("userInput").disabled = wordMeaningsOnly;
		setElementText("textX", tuples[num][0]);
	} else {
		setElementText("textX", tuples[num][2]);
	}	
	setElementText("textY", " ");
	document.getElementById("textY").style.color = "#000000"
	var nodeSub = document.getElementById("submitButton");
	if (reversed || document.getElementById("wmoCheckbox").checked) {
		nodeSub.value = "Reveal";
	} else {
		nodeSub.value = "Enter";
	}
}

function next() {
	if (stage == 0) {
		start();
	} else if (stage == 1) {
		stage = 2;
		var nodeY = document.getElementById("textY");
		var nodeSub = document.getElementById("submitButton");
		if (reversed) {
			nodeY.textContent = tuples[num][0];
		} else {
			nodeY.textContent = tuples[num][1];
		}
		if (reversed || document.getElementById("wmoCheckbox").checked) {
			nodeSub.value = "Reveal";
		} else {
			nodeSub.value = "Meaning";
		}
		if (!reversed && !document.getElementById("wmoCheckbox").checked) {
			var nodeUserInput = document.getElementById("userInput")
			if (nodeUserInput.value.replace(/\s+/g, '') == tuples[num][1].replace(/\s+/g, '')) {
				nodeY.style.color = "#00FF00";
				numCorrect++;
			} else {
				nodeY.style.color = "#FF0000";
			}
			numTotal++;
			var text = "" + numCorrect + " out of " + numTotal + " correct";
			setElementText("numCorrect", text);
		}
	} else if (stage == 2) {
		stage = 3;
		var nodeZ = document.getElementById("textZ");
		if (reversed) {
			setElementText("textZ", tuples[num][1]);
		} else {
			setElementText("textZ", tuples[num][2]);
		}
		var nodeSub = document.getElementById("submitButton");
		nodeSub.value = "Next";
		
	} else {
		stage = 1;
		num++;
		if (num >= tuples.length) {
			setElementText("textX", "Complete");
			setElementText("textY", " ");
			setElementText("textZ", " ");
			stage = 3;
		} else {
			if (reversed) {
				setElementText("textX", tuples[num][2]);
			} else {
				setElementText("textX", tuples[num][0]);
			}
			setElementText("textY", " ");
			setElementText("textZ", " ");
			var nodeSub = document.getElementById("submitButton");
			if (reversed || document.getElementById("wmoCheckbox").checked) {
				nodeSub.value = "Reveal";
			} else {
				nodeSub.value = "Enter";
			}
			if (!reversed) {
				var nodeUserInput = document.getElementById("userInput")
				nodeUserInput.value = "";
			}
		}
	}
}