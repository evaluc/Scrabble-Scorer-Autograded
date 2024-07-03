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

function oldScrabbleScorer(word) {
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
   console.log("Let's play some scrabble!");
   let userWord = input.question("Enter a word to score: ");

   console.log(vowelBonusScorer(userWord));
};

let newPointStructure;

function simpleScorer(word){
   word = word.toUpperCase();
	let letterPoints = "";
 for (let i = 0; i < word.length; i++) {
   let simplePointValue = 1;		
	letterPoints += `Points for '${word[i]}': ${simplePointValue}\n`
	  }
	return letterPoints;
};

function vowelBonusScorer(word) {
   word = word.toUpperCase();
	let letterPoints = "";
 for (let i = 0; i < word.length; i++) {
   let vowels = ["A","E","I","O","U"];
   let vowelBonusPointValue;
   //The syntax/logic here isn't working, vowels aren't counted as 3
   if (word[i].indexOf(vowels) > -1) {
      vowelBonusPointValue = 3;
   } else {
      vowelBonusPointValue = 1;
   }
	letterPoints += `Points for '${word[i]}': ${vowelBonusPointValue}\n`
	  }
	return letterPoints;
};

let scrabbleScorer;

const scoringAlgorithms = [];

function scorerPrompt() {}

function transform() {};

function runProgram() {
   initialPrompt();
   
}

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
