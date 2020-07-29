/*
* Module code goes here. Use 'module.exports' to export things:
* module.exports.thing = 'a thing';
*
* You can import it from another modules like this:
* var mod = require('method_deliverToSpawn');
* mod.thing == 'a thing'; // true
*/

var method_deliverToSpawn = {
	run: function(creep) {
	    console.log("entered deliverToSpawn");
		var spawnTarget = creep.room.find(FIND_MY_SPAWNS);

		if(creep.transfer(spawnTarget[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			creep.moveTo(spawnTarget[0]);
		}
		console.log("exit deliverToExtension");
	}
}

module.exports = method_deliverToSpawn;
