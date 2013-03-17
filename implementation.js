var newGame = require('./index.js')

var generator = require('hrandom')()

var playGame = function(method, tries) {
	var wins = 0
	for (var i = 0; i < tries; ++i) {
		if (method())
			++wins
	}
	return {
		wins: wins,
		losses: tries - wins,
		percentage: wins / tries
	}
}

var switchDoors = function() {
	return newGame()(generator.nextInt(3)).switchDoors()
}

var switchMaybe = function() {
	var game_state = newGame()(generator.nextInt(3))
	return generator.nextBoolean() ? game_state.switchDoors() : game_state.dontSwitch()
}

var dontSwitch = function() {
	return newGame()(generator.nextInt(3)).dontSwitch()
}

var inspect = require('util').inspect

console.log("Switching doors: " + inspect(playGame(switchDoors, 10000)))
console.log("Switch half the time: " + inspect(playGame(switchMaybe, 10000)))
console.log("Never switch: " + inspect(playGame(dontSwitch, 10000)))