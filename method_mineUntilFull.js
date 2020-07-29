/*
* Module code goes here. Use 'module.exports' to export things:
* module.exports.thing = 'a thing';
*
* You can import it from another modules like this:
* var mod = require('method_MineUntilFull');
* mod.thing == 'a thing'; // true
*/

var method_mineUntilFull = {
	run: function(creep, sourceTarget) {
	    console.log("entered mineUntilFull");
		
		// Find all sources in the room
		var sources = creep.room.find(FIND_SOURCES);
		// // Check if we're full
		// if(creep.store.getUsedCapacity() == creep.store.getCapacity()) {
		// 	creep.memory.storageFull = true;
		// } else if(creep.store.getUsedCapacity() == 0) {
		// 	creep.memory.storageFull = false;
		// }

		if(creep.memory.storageFull == false) {
			if(creep.harvest(sourceTarget) == ERR_NOT_IN_RANGE
				&& sourceTarget.energy > 0) {
					creep.moveTo(sourceTarget);
			}
		}
		console.log("exit mineUntilFull");
	}
}

module.exports = method_mineUntilFull;
