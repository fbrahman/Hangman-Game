//Object definition for games and their associated properties
function game (gameName, gameHistory, gameSound, gameBackground, gameConsole){

	this.gName=gameName;
	this.gHistory=gameHistory;
	this.gSound=gameSound;
	this.gBackground=gameBackground;
	this.gConsole=gameConsole;
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
var game1 = new game("Streets of Rage", "Rage History", "Rage sound", "Rage background", "SEGA");
var game2 = new game("Sonic the Hedgehog", "Sonic History", "Sonic sound", "Sonic background", "SEGA");


//Defining instances of systems that will relate back to games
var system1 = new systems("SEGA", "SEGA background", "SEGA Sound");
var system2 = new systems("NES");
var system3 = new systems("Atari 2600");
var system4 = new systems("Game Boy");

//game background can systems background 
//game sound can be systems sound "SEGA" or can be intro to game music
	// music can be played at the start of the round as a hint or as a winning feature not sure which

//Word bank of game names for guessing purposes
var wordArray = [];

//Populates word bank will always equal to the number of instances of game there are.
for (i=1; i<=game.instances; i++){
	var gamevar = "game" + i;
	//console.log(window[gamevar]);
	wordArray.push(window[gamevar].gName);
}
//choose random game from word bank for guessing
function wordChoice(){
		var guessingWord = wordArray[Math.floor(Math.random()*wordArray.length)];
		return guessingWord;
	};

// Testing randomization of array.
// var objResults = {} 
// 	for(var i = 0; i < 1000000; i++){ 
// 		var randomElement = testArray[Math.floor(Math.random()*testArray.length)] 
// 		if (objResults[randomElement]){ 
// 			objResults[randomElement]++ 
// 		}
// 		else{ 
// 			objResults[randomElement] = 1 } } console.log(objResults)
