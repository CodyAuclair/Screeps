/*
* Module code goes here. Use 'module.exports' to export things:
* module.exports.thing = 'a thing';
*
* You can import it from another modules like this:
* var mod = require('roleHarvester');
* mod.thing == 'a thing'; // true
*/

/*
------------------------------------------------------------------------------------------------------------------------------
    Harvesters are responsible for providing energy to Spawns, Extensions, and Storages. If all of these structures are full,
    then a Harvester will assume the role of a BUILDER.
    
    Workflow of HARVESTER:
        MINE source
        TRANSFER energy to any passed-by EXTENSIONS that can take it.
        PROVIDE energy to SPAWN
        DELIVER energy to STORAGE
        REPEAT as needed.
        
        Become a BUILDER if there are structures that need to be built
        Become an UPGRADER
------------------------------------------------------------------------------------------------------------------------------
*/

var mineUntilFull = require('method_mineUntilFull');
var deliverToSpawn = require('method_deliverToSpawn');
var deliverToExtension = require('method_deliverToExtension');
var deliverToStorage = require('method_deliverToStorage');
var deliverToTower = require('method_deliverToTower');
var setStorageFullFlag = require('method_setStorageFullFlag');

var utility = require('utils');

var roleBuilder = require('roleBuilder');
var roleUpgrader = require('roleUpgrader');

var roleHarvester = {
	run: function(creep) {
	    console.log("entered roleHarvester");

	    var sources = creep.room.find(FIND_SOURCES);
	    // console.log(sources[0] + "   " + sources[1]);
	    var extension = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity} } );
	    var tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_TOWER) && structure.energy < .4*structure.energyCapacity} } );
	    var storageTarget = creep.room.storage;
	    // console.log("storageTarget: " + storageTarget);
	    
	    // console.log("Room has " + extensions.length + " extensions available");
		
	    if(creep.memory.storageFull == false) {
	        var sourceToMine = parseInt(creep.name.charAt(creep.name.length - 1), 10) % sources.length;
            if(sources[sourceToMine].energy > 0) {
                var driveByExtension = creep.pos.findInRange(FIND_STRUCTURES, 1, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity}});
                if(driveByExtension != null) {
                    creep.transfer(driveByExtension[0], RESOURCE_ENERGY);
                }
                mineUntilFull.run(creep, sources[sourceToMine]);
            } else {
                var driveByExtension = creep.pos.findInRange(FIND_STRUCTURES, 1, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity}});
                if(driveByExtension != null) {
                    creep.transfer(driveByExtension[0], RESOURCE_ENERGY);
                }
                mineUntilFull.run(creep, sources[(sourceToMine + 1) % sources.length]);
            }
		} else {
			/* if(extension != null) {
				deliverToExtension.run(creep, extension);
			} else if(tower != null) {
			    deliverToTower.run(creep, tower);
			}
			
			else */ if(Game.spawns['Spawn1'].store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
				deliverToSpawn.run(creep);
			}
			
			else if(storageTarget != null && storageTarget.store.getUsedCapacity(RESOURCE_ENERGY) < storageTarget.store.getCapacity(RESOURCE_ENERGY)) {
			    deliverToStorage.run(creep, storageTarget);
			} 
			
			else if(creep.room.find(FIND_CONSTRUCTION_SITES) != null) {
			    roleBuilder.run(creep);
			}
			
			else {
			    roleUpgrader.run(creep);
			}
		}
		console.log("exit roleHarvester");
	}
}

module.exports = roleHarvester;
