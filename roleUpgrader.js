/*
* Module code goes here. Use 'module.exports' to export things:
* module.exports.thing = 'a thing';
*
* You can import it from another modules like this:
* var mod = require('roleUpgrader');
* mod.thing == 'a thing'; // true
*/

/*
------------------------------------------------------------------------------------------------------------------------------
    Upgraders are responsible for providing energy to the Room Controller. They will ALWAYS perform this task and ONLY this
    task.
    
    Workflow of UPGRADER:
        MINE source
        UPGRADE Room Controller
        Repeat
------------------------------------------------------------------------------------------------------------------------------
*/

var mineUntilFull = require('method_mineUntilFull');

var roleUpgrader = {
	run: function(creep) {
	    console.log("entered roleUpgrader");

        var sources = creep.room.find(FIND_SOURCES);
		var controllerTarget = creep.room.controller;
		
		if(creep.memory.storageFull == false) {
	        var sourceToMine = parseInt(creep.name.charAt(creep.name.length - 1), 10) % sources.length;
            if(sources[sourceToMine].energy > 0) {
                mineUntilFull.run(creep, sources[sourceToMine]);
            } else {
                mineUntilFull.run(creep, sources[(sourceToMine + 1) % sources.length]);
            }
		} else {
			if(creep.upgradeController(controllerTarget) == ERR_NOT_IN_RANGE) {
				creep.moveTo(controllerTarget);
			}
		}
		console.log("exit roleUpgrader");
	}
}

module.exports = roleUpgrader;