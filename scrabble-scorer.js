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
   console.log("Let's play some scrabble!");
   let userWord = input.question("Enter a word to score: ");
   //Need to return userWord?
   console.log(vowelBonusScorer(userWord));
};

let newPointStructure = transform(oldPointStructure);
//Take note of this declared variable, it's an object

function simpleScorer(word = "") {
   let wordCased = word.toUpperCase();
	let wordScore = 0;
   let simplePointValue = 1;

   wordScore = wordCased.length * simplePointValue;
	
	return wordScore
};

//simplified simpleScorer function

function vowelBonusScorer(word = "") {
   wordCased = word.toUpperCase();
	let letterPoints = "";
 for (let i = 0; i < word.length; i++) {
   let vowels = ["A","E","I","O","U"];
   let vowelBonusPointValue;
   //The syntax/logic here isn't working, vowels aren't counted as 3
   if (wordCased[i].indexOf(vowels) > -1) {
      vowelBonusPointValue = 3;
   } else {
      vowelBonusPointValue = 1;
   }
	letterPoints += `Points for '${wordCased[i]}': ${vowelBonusPointValue}\n`
	  }
	return letterPoints;
};

let scrabbleScorer;
//Take note of above declared variable


//scoringAlgorithm Objects:
let simpleScoreObj = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer(),
};

let vowelBonusScoreObj = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonents are 1 pt.",
   scorerFunction: vowelBonusScorer(),
};

let scrabbleScoreObj = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: oldScrabbleScorer(),
};

const scoringAlgorithms = [simpleScoreObj, vowelBonusScoreObj, scrabbleScoreObj];

function scorerPrompt() {
   console.log("Which scoring algorithm would you like to use?");
   console.log(); //insert object literal here accessing the object properties
   let scoreSelection = input.question("Enter 0, 1, or 2: ");
   //fill out here to prompt scorer choice, runs after initialPrompt

   return //scoring object
};

function transform() {};

function runProgram() {
   // console.log(vowelBonusScoreObj);
   initialPrompt();
   //scorerPrompt();
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
