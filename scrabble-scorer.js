// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 
//Imports
const input = require("readline-sync");

//Variables & Data
const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

let newPointStructure = transform(oldPointStructure);
newPointStructure[' '] = 0;

let simpleScoreObj = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer,
};

let vowelBonusScoreObj = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonents are 1 pt.",
   scorerFunction: vowelBonusScorer,
};

let scrabbleScoreObj = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer,
};

const scoringAlgorithms = [simpleScoreObj, vowelBonusScoreObj, scrabbleScoreObj];

//## Functions ##

function initialPrompt() {
   console.log("Let's play some Scrabble!\n");
   let userWord = inputValidation("Enter a word to score: ", areLetters);
   
   return userWord;
}

function transform(object) {
   let oldObject = object;
   let transformedObj = {};
   for (key in oldObject) {
      for (i = 0; i < oldObject[key].length; i++) {
         let propertyArray = oldObject[key];
         let newKey = propertyArray[i].toLowerCase();
         let pointValue = Number(key);
         transformedObj[newKey] = pointValue;
      }
   }

   return transformedObj;
}

function simpleScorer(word = "") {
   let wordCased = word.toUpperCase();
	let wordScore = 0;
   let simplePointValue = 1;

   wordScore = wordCased.length * simplePointValue;
	
	return wordScore;
}

function vowelBonusScorer(word = "") {
   let wordCased = word.toUpperCase();
   let wordScore = 0;
   let vowelValue = 3;
   let consonentValue = 1;
   let vowels = ["A","E","I","O","U"];
   
   for (let i = 0; i < wordCased.length; i++) {
      if (vowels.indexOf(wordCased[i]) === -1) {
         wordScore += consonentValue;
      } else if (vowels.indexOf(wordCased[i]) !== -1) {
         wordScore += vowelValue; 
      }
	}

	return wordScore;
}

function scrabbleScorer(word = "") {
   let wordCased = word.toLowerCase();
   let wordScore = 0;
   for (let i = 0; i < wordCased.length; i++) {
      wordScore += newPointStructure[wordCased[i]];
   }

   return wordScore;
}

function scorerPrompt() {
   console.log("Which scoring algorithm would you like to use?\n");
   //Loops and prints info about all objects in scoringAlgorithms array
   for (i = 0; i < scoringAlgorithms.length; i++) {
      console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
   }

   let userSelection = inputValidation("\nEnter 0, 1, or 2: ", isValidSelectionNum);
   let scorerSelection = {};
   
   if (userSelection === "0") {
      scorerSelection = scoringAlgorithms[0];
   } else if (userSelection === "1") {
      scorerSelection = scoringAlgorithms[1];
   } else if (userSelection === "2") {
      scorerSelection = scoringAlgorithms[2];
   } 

   return scorerSelection;
}

//Input Validation Function + anonymouse function variable validators

function inputValidation(prompt, isValid) {
   let userInput = input.question(prompt);

   while (!isValid(userInput)) {
      let delimiterStr = "+".repeat(60);
      console.log(`\n${delimiterStr}\nInvalid input. Please enter a valid option and try again.\n${delimiterStr}`);
      userInput = input.question(prompt);
   }

   return userInput;
}

function isLetter(char) {
   return char.toUpperCase() != char.toLowerCase(); //For latin alphabets, returns true for letters, and false for symbols/numbers.
}

let areLetters = function(word) {
   for (i = 0; i < word.length; i++) {
      if (isLetter(word[i]) !== true && word[i] !== ' ') {
         return false;
      }
   }

   return true;
};

let isValidSelectionNum = function(selectNum) {
   if (selectNum === "0" || selectNum === "1" || selectNum === "2") {
      return true;
   }

   return false;
};

let isYesNo = function(char) {
   if (char === "Y" || char === "N" || char === "y" || char === "n") {
      return true;
   }

   return false;
};

//Main Function to Run Program with Prompt to Run Again

function runProgram() {
   let userWord = initialPrompt();
   let scorer = scorerPrompt();
   console.log(`\nScore for '${userWord}': ${scorer.scorerFunction(userWord)}`);
   
   let reRun = 0;
   while (reRun === 0) {
      let response = inputValidation("\nWould you like to score another word? Y/N: ", isYesNo);
      if (response === "Y" || response === "y") {
         runProgram();
      } else if (response === "N" || response === "n") {
         reRun++;
      }
      break;
   }

}

//This isn't used in the final working code, kept for safety.
/*
function oldScrabbleScorer(word = "") {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }
*/


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
