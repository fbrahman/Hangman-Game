//Object definition for games and their associated properties
function game(gameName, gameConsole, gameSound, gameBackground, gameHistory){

	this.gName=gameName;
	this.gConsole=gameConsole;
	this.gHistory=gameHistory;
	this.gSound=gameSound;
	this.gBackground=gameBackground;
	//property of the constructor/object and not of the instance. Counts instances of the constructor/object.
	game.instances++;
}

//Initializing the counter
game.instances = 0;

//Object association for consoles will be related back to game object
function systems(systemsName, systemsBackground, systemsSound){
	this.sName=systemsName;
	this.sbackground=systemsBackground;
	this.sSound=systemsSound;
	//property of the constructor/object and not of the instance. Counts instances of the constructor/object.
	systems.instances++;
}

//Initializing the counter
systems.instances=0;

//Defining instances of games that will make up the word bank
var game1 = new game("Streets of Rage II", "SEGA");
var game2 = new game("Sonic the Hedgehog II", "SEGA");
var game3 = new game("Super Mario Bros", "NES");
var game4 = new game("Duck Hunt", "NES");
var game5 = new game("Donkey Kong Country", "SNES");
var game6 = new game("Street Fighter II", "SNES");
var game7 = new game("Contra", "NES");
var game8 = new game("Pokemon", "GBOY");
var game9 = new game("Tetris", "GBOY");


//Defining instances of systems that will relate back to games
var system1 = new systems("SEGA");
var system2 = new systems("NES");
var system3 = new systems("SNES");
var system4 = new systems("GBOY");

//Setting system backgrounds
system1.sbackground= [
	 "url(assets/systems/sega/background/SEGA1.png)"
	,"url(assets/systems/sega/background/SEGA2.png)"
	,"url(assets/systems/sega/background/SEGA3.jpg)"
	,"url(assets/systems/sega/background/SEGA4.jpg)"
	,"url(assets/systems/sega/background/SEGA5.png)"
	,"url(assets/systems/sega/background/SEGA6.gif)"
];

system2.sbackground= [
	 "url(assets/systems/nes/background/NES1.jpg)"
	,"url(assets/systems/nes/background/NES2.jpg)"
	,"url(assets/systems/nes/background/NES3.png)"
	,"url(assets/systems/nes/background/NES4.jpg)"
	,"url(assets/systems/nes/background/NES5.jpg)"	
];

system3.sbackground= [
	 "url(assets/systems/snes/background/SNES1.jpeg)"
	,"url(assets/systems/snes/background/SNES2.jpg)"
	,"url(assets/systems/snes/background/SNES3.png)"
	,"url(assets/systems/snes/background/SNES4.jpg)"
	,"url(assets/systems/snes/background/SNES5.jpg)"
	,"url(assets/systems/snes/background/SNES6.jpg)"
	,"url(assets/systems/snes/background/SNES7.jpg)"
	,"url(assets/systems/snes/background/SNES8.jpg)"
	,"url(assets/systems/snes/background/SNES9.png)"
];

system4.sbackground=[
	 "url(assets/systems/gameboy/background/GBOY1.jpg)"
	,"url(assets/systems/gameboy/background/GBOY2.jpg)"
	,"url(assets/systems/gameboy/background/GBOY3.jpg)"
	,"url(assets/systems/gameboy/background/GBOY4.jpg)"
	,"url(assets/systems/gameboy/background/GBOY5.jpg)"
	]

//game background can systems background 
//game sound can be systems sound "SEGA" or can be intro to game music
	// music can be played at the start of the round as a hint or as a winning feature not sure which

//Word bank of game names for guessing purposes
var wordArray = [];

//Game instance that is picked randomly and the related system.
var currentGame = " ";
var currentSystem = " ";

//Populates word bank will always equal to the number of instances of game there are.
for (i=1; i<=game.instances; i++){
	var gameVar = "game" + i;
	// console.log(window[gameVar]);
	wordArray.push(window[gameVar].gName);
};

//Word choice index
var wordChoiceIndex = "";
//choose random game from word bank for guessing
function wordChoice(){
	wordChoiceIndex = Math.floor(Math.random()*wordArray.length); 
	return wordArray[wordChoiceIndex].toUpperCase();
	};
//Assigning random word through function to variable guessing word. Currently only happens at page load.
var	guessingWord = wordChoice();

//Setting 'current' variables to current game and system
function findCurrentPick() {
	var currentGameName = wordArray[wordChoiceIndex];
	//console.log("This is the variable ", currentGameName)
	for(i = 1; i<=game.instances; i++){
		var gameVar = "game" + i;
		if (window[gameVar].gName === currentGameName){
			//Assigning current game stored into global variable currentGame.
			currentGame = window[gameVar];

			for(i = 1; i<=systems.instances; i++){
				var systemVar = "system" + i;
				if (currentGame.gConsole === window[systemVar].sName){
					//console.log(currentGame.gConsole, window[systemVar].sName);
					
					//Assign current system into global variable current system;
					currentSystem = window[systemVar];
					
					return currentSystem.sbackground;
				}
				else {
					console.log("false");

				}
			}
		}
	}
};

//Setting the theme of the game
function setupTheme(){
	findCurrentPick();
	
	var cGameVar = currentGame;
	var cSystemVar = currentSystem;
	var sBackgroundVar = " ";

	//choosing random background of the game board to system of game
	sBackgroundVar = cSystemVar.sbackground[Math.floor(Math.random()*cSystemVar.sbackground.length)];
	//setting background to the chosen background
	document.body.style.backgroundImage = sBackgroundVar;

};

// Array to hold current state of the game board
var currentGameBoard = [];
//Populate game space with underscore represent each letter of word and spaces where necessary
function setGameBoard(){
	for (i=0; i<guessingWord.length; i++){
		if (guessingWord.charAt(i) !== " "){
			currentGameBoard.push("_");
			// document.getElementById("wordToGuess").innerHTML += "_ "
		}
		else{
			// document.getElementById("wordToGuess").innerHTML+= "&nbsp&nbsp";
			currentGameBoard.push("&nbsp");
		}
	}
	//outputs the game board with "_" for each letter and spaces for inbetween 
	document.getElementById("wordToGuess").innerHTML=currentGameBoard.join("");
};

//Global variable to capture userGuess
var userGuess = " ";
//Capture Userinput from keyboard
document.onkeypress = function(keypress){
	userGuess = keypress.key;
	// console.log(userGuess);
	userGuess = userGuess.toUpperCase();
	console.log(userGuess);
	console.log(hpBar.value);
	var letters = /^[A-Za-z]+$/;
	if (!WinLose(hpBar)){
		if (userGuess.match(letters)){
			userInputCheck(userGuess);
			// console.log("Hello this is from inside the loop!")
		} 
		else{
			return;
		}
	}
	else{
		return;
	} 
};

//Variable to count the number of correct and incorrect guesses.
var correctGuess = 0;
var incorrectGuess = 0;
// Array to hold all incorrect guesses.
var incorrectLetterArray = [];

//Function to check what the user typed against guessing word.
function userInputCheck (x){
	if (incorrectLetterArray.indexOf(x) === -1){
		if (guessingWord.indexOf(x) === -1){
				incorrectGuess++;
				hpUpdate();
				incorrectLetterArray.push(x);
				document.getElementById("incorrectLetter").innerHTML = incorrectLetterArray.join(" ");
				WinLosePopUp(hpBar);
		}
		else{
			for (i=0; i<guessingWord.length; i++){
				if (guessingWord.charAt(i) === x){
					correctGuess++;
					currentGameBoard[i] = x;
				}
			}
			document.getElementById("wordToGuess").innerHTML=currentGameBoard.join("");
			WinLosePopUp(hpBar);
		}
	}
	else{
		return;
	}
};

//Health bar update
function hpUpdate (){
	var hp = document.getElementById("hpBar")
	hp.value = (100 - (incorrectGuess*10));
};

// Checks to see if the game if over
function WinLose(hpts){
	if(currentGameBoard.indexOf("_") === -1 || hpts.value === 0){
		return true;
	}
	else {
		return false;
	}
};

function WinLosePopUp(hpts){
	if(currentGameBoard.indexOf("_")===-1){
		document.getElementsByClassName("flexBodyGame")[0].classList.toggle("invisible");
		document.getElementsByClassName("win")[0].classList.toggle("invisible");
		document.getElementById("winWord").innerHTML = guessingWord;
	}
	else if (hpts.value ===0){
		document.getElementsByClassName("flexBodyGame")[0].classList.toggle("invisible");
		document.getElementsByClassName("lose")[0].classList.toggle("invisible");
	};
};

// Initialize on function
function initialize (){
	//Initialize global variables
	guessingWord = wordChoice();
	currentGameBoard=[];

	incorrectLetterArray=[];
	correctGuess = 0;
	incorrectGuess = 0;
	hpUpdate();

	document.getElementById("incorrectLetter").innerHTML = incorrectLetterArray.join("");

	setupTheme();
	setGameBoard();

	if (!document.getElementsByClassName("startUp")[0].classList.contains("invisible")){
		document.getElementsByClassName("startUp")[0].classList.toggle("invisible");
		document.getElementsByClassName("flexBodyGame")[0].classList.toggle("invisible");
	}
	else if(!document.getElementsByClassName("win")[0].classList.contains("invisible")){
		document.getElementsByClassName("flexBodyGame")[0].classList.toggle("invisible");
		document.getElementsByClassName("win")[0].classList.toggle("invisible");
	}
	else if(!document.getElementsByClassName("lose")[0].classList.contains("invisible")){
		document.getElementsByClassName("flexBodyGame")[0].classList.toggle("invisible");
		document.getElementsByClassName("lose")[0].classList.toggle("invisible");
	}
};



// function to update the the incorrect letter array and the current game board with the correct letters (moved to the user input check function)
// function gameBoardUpdate(x){
// 	if (guessingWord.indexOf(x)===-1){
// 		incorrectLetterArray.push(x);
// 		document.getElementById("incorrectLetter").innerHTML = incorrectLetterArray.join(" ");
// 	}
// 	else {
// 		for (i=0; i<guessingWord.length; i++){
// 			if(guessingWord.charAt(i) === x){
// 				currentGameBoard[i] = x;
// 			}
// 		}
// 	document.getElementById("wordToGuess").innerHTML=currentGameBoard.join(" ");	
// 	}
// }

//New array to hold each letter in an array.
// var guessingWordArray = [];

// for (i=0; i<0; i++){

// }

// Testing randomization of array.
// var objResults = {} 
// 	for(var i = 0; i < 1000000; i++){ 
// 		var randomElement = testArray[Math.floor(Math.random()*testArray.length)] 
// 		if (objResults[randomElement]){ 
// 			objResults[randomElement]++ 
// 		}
// 		else{ 
// 			objResults[randomElement] = 1 } } console.log(objResults)


// var audio = new Audio('audio_file.mp3');
// audio.play();