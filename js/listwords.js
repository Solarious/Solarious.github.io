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

function getRomaji(wordGroup) {
	if (wordGroup[1] === "") {
		return hiraganaToRomaji(wordGroup[0]);
	} else {
		return wordGroup[1];
	}
}

function createWordsTable() {
	var tableNode = document.createElement("table");
	document.getElementById("wordList").appendChild(tableNode);
	var rowLabelsNode = document.createElement("tr");
	tableNode.appendChild(rowLabelsNode);
	var headerNodes = [];
	for (var i = 0; i < 4; i++) {
		headerNodes[i] = document.createElement("th");
		rowLabelsNode.appendChild(headerNodes[i]);
	}
	headerNodes[0].textContent = "Group";
	headerNodes[1].textContent = "Kanji/Hiragana/Katakana";
	headerNodes[2].textContent = "Romaji";
	headerNodes[3].textContent = "Meaning";
	
	var alt = true;
	for (key in words) {
		alt = !alt;
		for (var i = 0; i < words[key].length; i++) {
			var rowNode = document.createElement("tr");
			if (alt) {
				rowNode.className = "alt";
			}
			tableNode.appendChild(rowNode);
			var tdNodes = [];
			for (var j = 0; j < 4; j++) {
				tdNodes[j] = document.createElement("td");
				rowNode.appendChild(tdNodes[j]);
			}
			
			tdNodes[0].textContent = key;
			if (words[key][i].length > 3) {
				tdNodes[1].textContent = words[key][i][3] + " (" + words[key][i][0] + ")";
			} else {
				tdNodes[1].textContent = words[key][i][0];
			}
			tdNodes[2].textContent = getRomaji(words[key][i]);
			tdNodes[3].textContent = words[key][i][2];
		}
	}
}