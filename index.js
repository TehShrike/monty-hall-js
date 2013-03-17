var generator = require('hrandom')()

var number_of_doors = 3

var pickDifferentDoor = function(door1, door2) {
	var pick
	do {
		// TODO: come up with a less stupid-looking way of picking the other door
		pick = generator.nextInt(number_of_doors)
	} while (pick === door1 || pick === door2)
	return pick
}

module.exports = function newGame() {
	var carIsBehindDoor = generator.nextInt(number_of_doors)

	return function pickDoor(playersPick) {
		var game_state = {}
		
		game_state.makeFinalChoice = function(finalChoice) {
			game_state.won = finalChoice === carIsBehindDoor
			delete game_state.makeFinalChoice
			return game_state.won
		}

		game_state.switchDoors = function() {
			return game_state.makeFinalChoice(pickDifferentDoor(playersPick, game_state.openedDoor))
		}

		game_state.dontSwitch = function() {
			return game_state.makeFinalChoice(playersPick)
		}

		game_state.openedDoor = pickDifferentDoor(carIsBehindDoor, playersPick)

		return game_state
	}
}