/*
* Module code goes here. Use 'module.exports' to export things:
* module.exports.thing = 'a thing';
*
* You can import it from another modules like this:
* var mod = require('method_runRoles');
* mod.thing == 'a thing'; // true
*/

// Define all of our roles. Note that if a creep has no tasks for its defined role, it will assume the role of the type of creep under it in this list.
// If there is no role on the line directly under a role, then it is a stand-alone role. 
var roleSupplier = require('roleSupplier');
var roleHarvester = require('roleHarvester');
var roleUpgrader = require('roleUpgrader');
var roleBuilder = require('roleBuilder');

var roleSoldierMelee = require('roleSoldierMelee');

var roleSoldierRanged = require('roleSoldierRanged');

var roleTower = require('roleTower');

var setStorageFlagFull = require('method_setStorageFullFlag');

var method_runRoles = {
	run: function() {
	    console.log("entered runRoles");
	    
	    // Find all our towers
	    var towers = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});

		// For all of our creeps...
		for(var name in Game.creeps) {
			// ...get the creep, set if they're ready to work...
			var creep = Game.creeps[name];
			setStorageFlagFull.run(creep);

			// ... and assign their role based on their memory.
			if(creep.memory.role == 'Harvester') {
				roleHarvester.run(creep);
			}

			if(creep.memory.role == 'Upgrader') {
				roleUpgrader.run(creep);
			}
			
			if(creep.memory.role == 'Builder') {
			    roleBuilder.run(creep);
			}
			
			if(creep.memory.role == 'SoldierMelee') {
			    roleSoldierMelee.run(creep);
			}
			
			if(creep.memory.role == 'SoldierRanged') {
			    roleSoldierRanged.run(creep);
			}
			
			if(creep.memory.role == 'Supplier') {
			    roleSupplier.run(creep);
			}
			
		}
		
		for(var i = 0; i < towers.length; i++) {
		  //  console.log("Energy of tower: " + towers[i].energy);
		    roleTower.run(towers[i]);
		}
		
		console.log("exit runRoles");
	}
}

module.exports = method_runRoles;