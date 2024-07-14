// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

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

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some Scrabble!\n");
   let userWord = input.question("Enter a word to score: ");
   
   return userWord;
};

let newPointStructure = transform(oldPointStructure);
newPointStructure[' '] = 0;

function simpleScorer(word = "") {
   let wordCased = word.toUpperCase();
	let wordScore = 0;
   let simplePointValue = 1;

   wordScore = wordCased.length * simplePointValue;
	
	return wordScore
};

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

	return wordScore
};

function scrabbleScorer(word = "") {
   let wordCased = word.toLowerCase();
   let wordScore = 0;
   for (let i = 0; i < wordCased.length; i++) {
      wordScore += newPointStructure[wordCased[i]];
   }
   return wordScore
};



//scoringAlgorithm Objects:
let simpleScoreObj = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer,
};

let vowelBonusScoreObj = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonents are 1 pt.",
   scorerFunction: vowelBonusScorer,
   //testing remove parentheses from vowelBonusScorer() property
};

let scrabbleScoreObj = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer,
};

const scoringAlgorithms = [simpleScoreObj, vowelBonusScoreObj, scrabbleScoreObj];

function scorerPrompt() {
   console.log("Which scoring algorithm would you like to use?\n");
   console.log(`0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}`)
   console.log(`1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}`)
   console.log(`2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}`);
   //TODO: Set up the above lines as a loop through the scoring algorithms array

   let userSelection = input.question("Enter 0, 1, or 2: ");
   let scorerSelection = {};
   
   if (userSelection === "0") {
      scorerSelection = scoringAlgorithms[0];
   } else if (userSelection === "1") {
      scorerSelection = scoringAlgorithms[1];
   } else if (userSelection === "2") {
      scorerSelection = scoringAlgorithms[2];
   } else {
      scorerSelection = scoringAlgorithms[-1];
      console.log("Please enter a valid option and try again.");
   }

   return scorerSelection
};

//Skeleton of inputValidation function, to refactor both prompt functions
/*
let inputValidation = function (prompt, isValid) {
   let userSelection = input.question(prompt);

   while (!isValid(userSelection)) {
      console.log("Invalid input. Please enter a valid option and try again.");
      userSelection = input.question(prompt);
   }

   return userSelection;
}

*/

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
   return transformedObj
};

function runProgram() {
   // console.log(vowelBonusScoreObj);
   let userWord = initialPrompt();
   let scorer = scorerPrompt();
   console.log(`Score for '${userWord}': ${scorer.scorerFunction(userWord)}`);
   //Follow up with choosing which algorithm
   //then run the scoring algorithm on the word and print that word
   
}

//Fixed error preventing anything from running, other small changes


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
